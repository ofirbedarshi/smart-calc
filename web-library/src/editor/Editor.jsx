import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef, useState } from 'react';

// --- Constants ---
const ACCORDION_HTML = `
<details open style="
    max-width: 600px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    padding: 1.5rem;
    margin: 1rem 0;
    transition: all 0.3s ease;
    position: relative;">
  <summary style="
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;
      list-style: none;
      outline: none;
      display: flex;
      justify-content: space-between;
      align-items: center;"
      onclick="this.querySelector('.arrow').style.transform = this.parentElement.open ? 'rotate(90deg)' : 'none';"
  >
    כותרת
    <span class="arrow" style="display: inline-block; transition: transform 0.3s ease; font-size: 1.2rem;">▸</span>
  </summary>
  <div style="margin-top: 1rem; color: #333; line-height: 1.6;overflow-x: auto; max-width: 100%; direction: rtl;">
    <p>הוסף תוכן כאן</p>
  </div>
</details>
<p>&nbsp;</p>
`;
const TABLE_2X2_HTML = '<table border="1"><tbody><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p>&nbsp;</p>';
const CHECKBOX_HTML = '<input type="checkbox" class="mce-checkbox" />';

// --- TinyMCE Button Callbacks ---
function handleInsertTable(editor) {
  editor.execCommand('mceInsertContent', false, TABLE_2X2_HTML);
}
function handleInsertCheckbox(editor) {
  editor.insertContent(CHECKBOX_HTML);
}
function handleInsertAccordion(editor) {
  editor.insertContent(ACCORDION_HTML);
}
function handleRemoveAccordion(editor) {
  if (!editor) return;
  const node = editor.selection ? editor.selection.getNode() : null;
  if (!node) return;
  let detailsNode = node;
  while (detailsNode && detailsNode.nodeName && detailsNode.nodeName.toLowerCase() !== 'details') {
    detailsNode = detailsNode.parentNode;
  }
  if (detailsNode && detailsNode.nodeName && detailsNode.nodeName.toLowerCase() === 'details') {
    detailsNode.parentNode.removeChild(detailsNode);
    const newContent = editor.getContent();
    editor.setContent(newContent);
  }
}
function handleCheckboxClick(editor, e) {
  if (e.target && e.target.classList.contains('mce-checkbox')) {
    e.target.checked = !e.target.checked;
    const newContent = editor.getContent();
    editor.setContent(newContent);
  }
}
function setupTinyMCE(editor) {
  editor.ui.registry.addButton('insert2x2table', {
    text: 'טבלה 2x2',
    tooltip: 'הוסף טבלת 2x2',
    onAction: () => handleInsertTable(editor),
  });
  editor.ui.registry.addButton('insertCheckbox', {
    text: 'צ׳קבוקס',
    tooltip: 'הוסף צ׳קבוקס',
    onAction: () => handleInsertCheckbox(editor),
  });
  editor.ui.registry.addButton('insertAccordion', {
    text: 'אקורדיון',
    tooltip: 'הוסף אקורדיון',
    onAction: () => handleInsertAccordion(editor),
  });
  editor.ui.registry.addButton('removeAccordion', {
    text: 'מחק אקורדיון',
    tooltip: 'מחק את האקורדיון הקרוב',
    onAction: () => handleRemoveAccordion(editor),
    onSetup: (buttonApi) => {
      const onNodeChange = () => {
        const node = editor.selection ? editor.selection.getNode() : null;
        let detailsNode = node;
        while (detailsNode && detailsNode.nodeName && detailsNode.nodeName.toLowerCase() !== 'details') {
          detailsNode = detailsNode.parentNode;
        }
        if (detailsNode && detailsNode.nodeName && detailsNode.nodeName.toLowerCase() === 'details') {
          buttonApi.setEnabled(true);
        } else {
          buttonApi.setEnabled(false);
        }
      };
      editor.on('NodeChange', onNodeChange);
      onNodeChange();
      return () => {
        editor.off('NodeChange', onNodeChange);
      };
    },
  });
  editor.on('click', (e) => handleCheckboxClick(editor, e));
}

function stripDetailsOpen(html) {
  // Remove 'open' attribute from all <details ...> tags, regardless of attribute order
  return html.replace(/(<details\b[^>]*?)\sopen(=(["'])?open\3)?/gi, '$1');
}

export default function Editor({ content, onChange, readOnly = false, onSave }) {
  const editorRef = useRef(null);
  const [logs, setLogs] = useState([]);
  // Derived state: HTML with accordions closed, set only once per mount/remount
  const [safeContent, setSafeContent] = useState(content);

  function log(msg) {
    setLogs(prev => [...prev, msg]);
  }

  function handleReadOnlyCheckboxClick(e) {
    log('Checkbox click event');
    if (e.target && e.target.classList.contains('mce-checkbox')) {
      // log('Clicked a .mce-checkbox');
      // Clone the DOM to manipulate
      const wrapper = document.createElement('div');
      wrapper.innerHTML = e.currentTarget.innerHTML;
      // Find all checkboxes in the real DOM
      const realCheckboxes = Array.from(e.currentTarget.querySelectorAll('.mce-checkbox'));
      // Find all checkboxes in the cloned DOM
      const checkboxes = wrapper.querySelectorAll('.mce-checkbox');
      log(`Found ${checkboxes.length} checkboxes in cloned DOM`);
      // Find the index of the clicked checkbox in the real DOM
      const clickedIndex = realCheckboxes.findIndex(cb => cb === e.target);
      log(`Clicked index: ${clickedIndex}`);
      if (clickedIndex !== -1) {
        // Toggle the checked attribute in the HTML
        const cb = checkboxes[clickedIndex];
        log(`Checkbox before: checked=${cb.hasAttribute('checked')}`);
        if (cb.hasAttribute('checked')) {
          cb.removeAttribute('checked');
        } else {
          cb.setAttribute('checked', 'true');
        }
        log(`Checkbox after: checked=${cb.hasAttribute('checked')}`);
        // Update the HTML and call onChange
        onChange && onChange(wrapper.innerHTML);
        setSafeContent(wrapper.innerHTML)
        log('Called onChange with updated HTML');
        // Call onSave if provided, pass the new HTML
        if (onSave) {
          log('Calling onSave after checkbox change');
          onSave(wrapper.innerHTML, true); // silent save
        }
      } else {
        log('Clicked checkbox not found in cloned DOM');
      }
    }
  }
  

  // Only close <details> on mount (or remount) and set safeContent
  useEffect(() => {
    if (readOnly) {
      setSafeContent(stripDetailsOpen(content));
    } else {
      setSafeContent(content);
    }
    // eslint-disable-next-line
  }, []);

  if (readOnly) {
    // Check if there is at least one checkbox in the content
    const hasCheckbox = /<input[^>]+type=["']checkbox["'][^>]*>/i.test(safeContent);

    // Handler to clear all checkboxes
    const handleClearCheckboxes = () => {
      // Parse the HTML, uncheck all checkboxes
      const wrapper = document.createElement('div');
      wrapper.innerHTML = safeContent;
      const checkboxes = wrapper.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(cb => { cb.checked = false; cb.removeAttribute('checked'); });
      // Use only the inner HTML of the original content, not the wrapper div
      const newHtml = wrapper.innerHTML;
      onChange && onChange(newHtml);
      setSafeContent(newHtml)
      onSave && onSave(newHtml, true); // silent save
    };
    return (
      <div style={{ width: '100%', margin: '40px auto' }}>
        {/* Show button only if there is at least one checkbox */}
        {hasCheckbox && (
          <button
            onClick={handleClearCheckboxes}
            style={{
              marginBottom: 12,
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: '#f0f0f0',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            נקה סימונים
          </button>
        )}
        <div
          ref={editorRef}
          style={{ minHeight: 300, background: '#fafafa', border: '1px solid #eee', borderRadius: 8, padding: 16, color: '#222', direction: 'rtl', textAlign: 'right', marginTop: 24 }}
          dangerouslySetInnerHTML={{ __html: safeContent }}
          onClick={handleReadOnlyCheckboxClick}
        />
      </div>
    );
  }

  // Build TinyMCE init config for edit mode
  const editorInit = {
    ...{
      height: 600,
    },
    menubar: false,
    plugins: [
      'lists', 'table', 'advlist', 'checklist'
    ],
    toolbar:
      'undo redo | blocks | bold underline | bullist numlist checklist | insert2x2table insertCheckbox insertAccordion removeAccordion',
    branding: false,
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px; color: #000; direction: rtl; }',
    directionality: 'rtl',
    mobile: {
      theme: 'silver'
    },
    setup: setupTinyMCE,
    readonly: 0,
  };

  return (
    <div>
      <div style={{ width: '100%', margin: '40px auto' }}>
        <TinyMCEEditor
          value={content}
          onEditorChange={onChange}
          onInit={(evt, editor) => (editorRef.current = editor)}
          tinymceScriptSrc={'./tinymce/tinymce.min.js'}
          init={editorInit}
        />
      </div>
    </div>
  );
} 