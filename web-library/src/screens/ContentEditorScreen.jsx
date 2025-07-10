import React, { useEffect, useRef, useState } from 'react';
import AdminModeModal from '../components/AdminModeModal';
import Editor from '../editor/Editor';

export default function ContentEditorScreen() {
  const [content, setContent] = useState('Loading...');
  const [contentId, setContentId] = useState(null);
  const contentRef = useRef(content);
  // Only keep logs in state for debugging, not shown in UI
  const [logs, setLogs] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [allowEdit, setAllowEdit] = useState(false);
  const [editAccess, setEditAccess] = useState('Admin');
  contentRef.current = content;

  useEffect(() => {
    function appendLog(msg) {
      setLogs((prev) => prev + '\n' + msg);
    }
    function handleDocumentMessage(event) {
      // appendLog('[document] handleMessage: ' + event.data);
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && data.type === 'SET_CONTENT' && typeof data.html === 'string') {
          appendLog('[document] SET_CONTENT'+ data.id);
          if (data.id) {
            setContentId(data.id);
          }
          setContent(data.html);
          setAllowEdit(!!data.allowEdit);
          if (!!data.editAccess) {
            setEditAccess(data.editAccess);
          }
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

  const handleSave = (newHtml, silent = false) => {
    const htmlToSave = newHtml || content;
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'SAVE_CONTENT', html: htmlToSave, silent })
      );
    }
  };

  const handleAdminApproved = () => {
    setIsEditMode(true);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* Buttons above the editor */}
      {isEditMode && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: 16 }}>
          <button
            onClick={() => setIsEditMode(false)}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: '#f0f0f0',
              cursor: 'pointer',
            }}
          >
            תצוגה
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '8px 16px',
              border: '1px solid #4caf50',
              borderRadius: '4px',
              background: '#4caf50',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            שמור
          </button>
        </div>
      )}
      {/* Only render Editor if content exists */}
      {/* {logs} */}
      {content && content !== 'Loading...' && contentId && (
        <Editor
          key={contentId}
          content={content}
          onChange={setContent}
          readOnly={!isEditMode}
          onSave={handleSave}
        />
      )}
      {!isEditMode && allowEdit && (
        <button
          onClick={() => {
            if (editAccess === 'All') {
              setIsEditMode(true);
            } else {
              setShowAdminModal(true);
            }
          }}
          style={{
            marginTop: 16,
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
          }}
        >
          ערוך
        </button>
      )}
      <AdminModeModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onAdminApproved={handleAdminApproved}
      />
    </div>
  );
} 