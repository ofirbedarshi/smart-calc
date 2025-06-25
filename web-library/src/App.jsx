import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [value, setValue] = useState('<p>Start editing...</p>');
  const [showTableControls, setShowTableControls] = useState(false);
  const editorRef = useRef(null);

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
        <Editor
          value={value}
          onEditorChange={(content) => setValue(content)}
          onInit={(evt, editor) => (editorRef.current = editor)}
          tinymceScriptSrc={'/tinymce/tinymce.min.js'}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'lists', 'table', 'advlist'
            ],
            toolbar:
              'undo redo | blocks | bold underline | bullist numlist | insert2x2table',
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
        <div style={{ maxWidth: 600, margin: '40px auto', padding: 16, border: '1px solid #eee', borderRadius: 8, background: '#fafafa', color: '#000', direction: 'rtl' }}>
          <div style={{ color: '#000', direction: 'rtl' }} dangerouslySetInnerHTML={{ __html: value }} />
        </div>
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
