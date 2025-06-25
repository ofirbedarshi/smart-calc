import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useState } from 'react';

function App() {
  const [value, setValue] = useState('<p>Start editing...</p>');
  const editorRef = useRef(null);

  // Helper to check if content is empty (ignores whitespace and empty tags)
  const isContentEmpty = !value || value.replace(/<(.|\n)*?>/g, '').trim() === '';

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
              'undo redo | blocks | bold underline | bullist numlist | table | insert2x2table',
            branding: false,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px; color: #000; direction: rtl; }',
            directionality: 'rtl',
            mobile: {
              theme: 'silver'
            },
            setup: (editor) => {
              editor.ui.registry.addButton('insert2x2table', {
                text: '2x2 Table',
                tooltip: 'Insert 2x2 Table',
                onAction: () => {
                  editor.execCommand('mceInsertContent', false, '<table border="1"><tbody><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>');
                },
              });
            },
          }}
        />
      </div>
      {!isContentEmpty && (
        <div style={{ maxWidth: 600, margin: '40px auto', marginTop: 40, padding: 16, border: '1px solid #eee', borderRadius: 8, background: '#fafafa', color: '#000', direction: 'rtl' }}>
          <div style={{ color: '#000', direction: 'rtl' }} dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      )}
      {/* JSON representation of the content */}
      <div style={{ maxWidth: 600, margin: '40px auto', marginTop: 24, padding: 16, border: '1px solid #eee', borderRadius: 8, background: '#f5f5f5', color: '#222', fontFamily: 'monospace', fontSize: 14, direction: 'rtl' }}>
        <strong>Content JSON (to save):</strong>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', direction: 'ltr' }}>{JSON.stringify({ content: value }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
