import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function App() {
  const [value, setValue] = useState('');
  return (
    <div>
      <h1>hello worlddd react web</h1>
      <div style={{ maxWidth: 600, margin: '40px auto' }}>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
    </div>
  );
}

export default App;
