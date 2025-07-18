import React, { useState } from 'react';
import { spectroEquiListHtml } from '../../../app/screens/webview/pages/spectroEquiListHtml';
import Editor from '../editor/Editor';
 

export default function Playground() {
  const [value, setValue] = useState(spectroEquiListHtml);

  return (
    <div>
      <div style={{ width: '100%', margin: '40px auto' }}>
        {/* Save button */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button onClick={() => console.log(value)}>הדפס לקונסול</button>
        </div>
        {/* Editor always visible */}
        <Editor
          content={value}
          onChange={setValue}
        />
        {/* Read-only preview always visible and live */}
        <Editor
          content={value}
          readOnly
        />
      </div>
    </div>
  );
} 