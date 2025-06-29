import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';

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
  <div style="margin-top: 1rem; color: #333; line-height: 1.6;">
    <p>הוסף תוכן כאן</p>
  </div>
</details>
`;
const TABLE_2X2_HTML = '<table border="1"><tbody><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>';
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

export default function Editor({ content, onChange, readOnly = false }) {
  const editorRef = useRef(null);

  if (readOnly) {
    // Remove 'open' from all <details> tags for read mode
    const safeContent = stripDetailsOpen(content);
    return (
      <div style={{ maxWidth: 600, margin: '40px auto' }}>
        <div
          style={{ minHeight: 300, background: '#fafafa', border: '1px solid #eee', borderRadius: 8, padding: 16, color: '#222', direction: 'rtl', textAlign: 'right', marginTop: 24 }}
          dangerouslySetInnerHTML={{ __html: safeContent }}
        />
      </div>
    );
  }

  // Build TinyMCE init config for edit mode
  const editorInit = {
    ...{
      height: 300,
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
      <div style={{ maxWidth: 600, margin: '40px auto' }}>
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