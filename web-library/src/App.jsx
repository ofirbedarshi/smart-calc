import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [value, setValue] = useState('<p>Start editing...</p>');
  const [showTableControls, setShowTableControls] = useState(false);
  const editorRef = useRef(null);
  const savedContentRef = useRef(null); // In-memory storage for saved content

  const isContentEmpty = !value || value.replace(/<(.|\n)*?>/g, '').trim() === '';

  // Listen for selection changes to show/hide table controls
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handleNodeChange = () => {
      const node = editor.selection ? editor.selection.getNode() : null;
      setShowTableControls(node && node.closest && node.closest('table'));
    };

    editor.on('NodeChange', handleNodeChange);
    return () => {
      editor.off('NodeChange', handleNodeChange);
    };
  }, [editorRef.current]);

  // Table actions
  const insertTable = () => {
    const editor = editorRef.current;
    if (editor) {
      editor.execCommand('mceInsertContent', false, '<table border="1"><tbody><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>');
    }
  };
  const addRow = () => editorRef.current && editorRef.current.execCommand('mceTableInsertRowAfter');
  const addCol = () => editorRef.current && editorRef.current.execCommand('mceTableInsertColAfter');
  const delRow = () => editorRef.current && editorRef.current.execCommand('mceTableDeleteRow');
  const delCol = () => editorRef.current && editorRef.current.execCommand('mceTableDeleteCol');
  const delTable = () => editorRef.current && editorRef.current.execCommand('mceTableDelete');
  const mergeDown = () => editorRef.current && editorRef.current.execCommand('mceTableMergeCells', false, { direction: 'down' });
  const mergeLeft = () => editorRef.current && editorRef.current.execCommand('mceTableMergeCells', false, { direction: 'left' });

  return (
    <div>
      <h1>hello worlddd react web</h1>
      <div style={{ maxWidth: 600, margin: '40px auto' }}>
        {/* Save/Load Buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button onClick={() => { savedContentRef.current = value; }}>שמור</button>
          <button onClick={() => { if (savedContentRef.current) setValue(savedContentRef.current); }}>טען</button>
        </div>
        <Editor
          value={value}
          onEditorChange={(content) => setValue(content)}
          onInit={(evt, editor) => (editorRef.current = editor)}
          tinymceScriptSrc={'/tinymce/tinymce.min.js'}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'lists', 'table', 'advlist', 'checklist'
            ],
            toolbar:
              'undo redo | blocks | bold underline | bullist numlist checklist | insert2x2table insertCheckbox insertAccordion',
            branding: false,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px; color: #000; direction: rtl; }',
            directionality: 'rtl',
            mobile: {
              theme: 'silver'
            },
            setup: (editor) => {
              editor.ui.registry.addButton('insert2x2table', {
                text: 'טבלה 2x2',
                tooltip: 'הוסף טבלת 2x2',
                onAction: insertTable,
              });
              // Add custom checkbox button
              editor.ui.registry.addButton('insertCheckbox', {
                text: 'צ׳קבוקס',
                tooltip: 'הוסף צ׳קבוקס',
                onAction: () => {
                  editor.insertContent('<input type="checkbox" class="mce-checkbox" />');
                },
              });
              // Listen for clicks on checkboxes and update content
              editor.on('click', (e) => {
                if (e.target && e.target.classList.contains('mce-checkbox')) {
                  // Toggle checked state
                  e.target.checked = !e.target.checked;
                  // Update the editor content to reflect the change
                  // (TinyMCE does not auto-update for input state changes)
                  const newContent = editor.getContent();
                  editor.setContent(newContent);
                }
              });
              // Add custom accordion button
              editor.ui.registry.addButton('insertAccordion', {
                text: 'אקורדיון',
                tooltip: 'הוסף אקורדיון',
                onAction: () => {
                  editor.insertContent(`
<details style="
    width: 100%;
    max-width: 600px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    padding: 1.5rem;
    margin: 1rem 0;
    transition: all 0.3s ease;
    position: relative;" open>
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
                  `);
                },
              });
            },
            // table_toolbar: false,
            // contextmenu: false,
          }}
        />
      </div>
      {/* Custom Table Controls */}
      {showTableControls && (
        <div style={{ maxWidth: 600, margin: '20px auto', display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={addRow}>הוסף שורה</button>
          <button onClick={addCol}>הוסף עמודה</button>
          <button onClick={delRow}>מחק שורה</button>
          <button onClick={delCol}>מחק עמודה</button>
          <button onClick={delTable}>מחק טבלה</button>
          <button onClick={mergeDown}>מזג למטה</button>
          <button onClick={mergeLeft}>מזג שמאלה</button>
        </div>
      )}
      {!isContentEmpty && (
        <div
          style={{ maxWidth: 600, margin: '40px auto', padding: 16, border: '1px solid #eee', borderRadius: 8, background: '#fafafa', color: '#000', direction: 'rtl' }}
          onClick={e => {
            if (e.target && e.target.type === 'checkbox') {
              e.preventDefault(); // Prevent browser from toggling visually
              // Toggle the checked attribute in the HTML string
              const container = document.createElement('div');
              container.innerHTML = value;
              // Find the corresponding checkbox in the HTML
              const checkboxes = container.querySelectorAll('input[type="checkbox"]');
              // Find index of clicked checkbox
              const allCheckboxes = Array.from(document.querySelectorAll('.preview-area input[type="checkbox"]'));
              const idx = allCheckboxes.indexOf(e.target);
              if (idx !== -1 && checkboxes[idx]) {
                // Toggle checked attribute in HTML
                if (checkboxes[idx].hasAttribute('checked')) {
                  checkboxes[idx].removeAttribute('checked');
                } else {
                  checkboxes[idx].setAttribute('checked', 'checked');
                }
                // Update value and saved content
                const newHtml = container.innerHTML;
                setValue(newHtml);
                savedContentRef.current = newHtml;
              }
            }
          }}
          className="preview-area"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      )}
      <div style={{ maxWidth: 600, margin: '40px auto', padding: 16, border: '1px solid #eee', borderRadius: 8, background: '#f5f5f5', color: '#222', fontFamily: 'monospace', fontSize: 14, direction: 'rtl' }}>
        <strong>Content JSON (to save):</strong>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', direction: 'ltr' }}>{JSON.stringify({ content: value }, null, 2)}</pre>
      </div>
      {/* <style>{`
        .tox-tinymce-aux,
        .tox .tox-pop--table {
          display: none !important;
        }
      `}</style> */}
    </div>
  );
}

export default App;
