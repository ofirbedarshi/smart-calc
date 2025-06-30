import React, { useState } from 'react';
import Modal from './Modal';

const AdminModeModal = ({ isOpen, onClose, onAdminApproved }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '0000') {
      setError('');
      setPassword('');
      onAdminApproved();
      onClose();
    } else {
      setError('סיסמה שגויה');
      setPassword('');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      title="מצב מנהל"
    >
      <form onSubmit={handleSubmit} style={{ textAlign: 'right' }}>
        <div style={{ marginBottom: '20px' }}>
          <label 
            htmlFor="admin-password"
            style={{
              display: 'block',
              marginBottom: '12px',
              fontWeight: 'bold',
              color: '#333',
              fontSize: '16px'
            }}
          >
            סיסמת מנהל:
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '18px',
              textAlign: 'center',
              direction: 'ltr',
              boxSizing: 'border-box',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
            autoFocus
          />
        </div>

        {error && (
          <div style={{
            color: '#d32f2f',
            fontSize: '16px',
            marginBottom: '20px',
            textAlign: 'center',
            padding: '8px',
            backgroundColor: '#ffebee',
            borderRadius: '6px',
            border: '1px solid #ffcdd2'
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={handleClose}
            style={{
              padding: '14px 24px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              background: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              minHeight: '48px',
            }}
          >
            ביטול
          </button>
          <button
            type="submit"
            style={{
              padding: '14px 24px',
              border: 'none',
              borderRadius: '8px',
              background: '#1976d2',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              minHeight: '48px',
            }}
          >
            אישור
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AdminModeModal; 