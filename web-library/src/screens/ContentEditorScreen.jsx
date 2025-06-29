import React, { useEffect, useRef, useState } from 'react';
import AdminModeModal from '../components/AdminModeModal';
import Editor from '../editor/Editor';

export default function ContentEditorScreen() {
  const [content, setContent] = useState('Loading...');
  const contentRef = useRef(content);
  // Only keep logs in state for debugging, not shown in UI
  const [logs, setLogs] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
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

  const handleSave = () => {
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'SAVE_CONTENT', html: content })
      );
    }
  };

  const handleAdminApproved = () => {
    setIsEditMode(true);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ maxWidth: 600, margin: '24px auto 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          onClick={() => {
            if (isEditMode) {
              setIsEditMode(false);
            } else {
              setShowAdminModal(true);
            }
          }}
          style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: isEditMode ? '#f0f0f0' : 'white',
            cursor: 'pointer'
          }}
        >
          {isEditMode ? 'תצוגה' : 'ערוך'}
        </button>
        {isEditMode && (
          <button 
            onClick={handleSave}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              background: '#1976d2',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            שמור
          </button>
        )}
      </div>
      <Editor content={content} onChange={setContent} readOnly={!isEditMode} />
      
      <AdminModeModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onAdminApproved={handleAdminApproved}
      />
    </div>
  );
} 