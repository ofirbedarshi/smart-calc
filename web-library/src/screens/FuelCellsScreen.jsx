import React, { useEffect, useRef, useState } from 'react';
import Editor from '../editor/Editor';

export default function FuelCellsScreen() {
  const [content, setContent] = useState('Loading...');
  const contentRef = useRef(content);
  // Only keep logs in state for debugging, not shown in UI
  const [logs, setLogs] = useState('');
  contentRef.current = content;

  useEffect(() => {
    function appendLog(msg) {
      setLogs((prev) => prev + '\n' + msg);
    }
    function handleDocumentMessage(event) {
      appendLog('[document] handleMessage: ' + event.data);
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && data.type === 'SET_CONTENT' && typeof data.html === 'string') {
          appendLog('[document] SET_CONTENT');
          setContent(data.html);
        }
      } catch (e) {
        // Optionally keep error logs for debugging
        appendLog('[document] Error parsing message: ' + e);
      }
    }
    if (document && document.addEventListener) {
      document.addEventListener('message', handleDocumentMessage);
    }
    // Signal to React Native that the webapp is ready
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'READY' }));
    }
    return () => {
      if (document && document.removeEventListener) {
        document.removeEventListener('message', handleDocumentMessage);
      }
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <Editor content={content} onChange={setContent} readOnly />
    </div>
  );
} 