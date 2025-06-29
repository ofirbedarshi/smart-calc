import React from 'react';

const Modal = ({ isOpen, onClose, title, children, className = '' }) => {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '16px',
        boxSizing: 'border-box',
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          maxWidth: '320px',
          width: '100%',
          maxHeight: '70vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          border: '1px solid #e0e0e0',
          direction: 'rtl',
        }}
        onClick={(e) => e.stopPropagation()}
        className={className}
      >
        {/* Header: Title (right), Close (left) */}
        {(title || onClose) && (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            gap: '8px',
          }}>
            {/* Title */}
            {title && (
              <h2 style={{ 
                margin: 0, 
                fontSize: '20px', 
                fontWeight: 'bold',
                textAlign: 'right',
                color: '#333',
                lineHeight: '1.3',
                flex: 1,
              }}>
                {title}
              </h2>
            )}
            {/* Close button */}
            {onClose && (
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  color: '#666',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  marginLeft: '8px',
                  marginRight: 0,
                  flexShrink: 0,
                }}
                aria-label="סגור"
              >
                ✕
              </button>
            )}
          </div>
        )}
        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal; 