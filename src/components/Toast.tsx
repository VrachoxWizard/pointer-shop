import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Check } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-alert">
          {/* Product Thumbnail */}
          {toast.image ? (
            <img src={toast.image} alt="" className="toast-thumb" />
          ) : (
            <div 
              style={{ 
                width: '40px', 
                height: '40px', 
                backgroundColor: 'var(--color-primary-light)', 
                color: 'white', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0 
              }}
            >
              <Check size={18} />
            </div>
          )}

          {/* Toast Message details */}
          <div className="toast-content">
            <div className="toast-title">{toast.title}</div>
            <div className="toast-msg">{toast.message}</div>
          </div>

          {/* Close button */}
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-neutral-muted)',
              cursor: 'pointer',
              display: 'flex',
              padding: '4px',
              transition: 'color var(--transition-fast)'
            }}
            onMouseEnter={(e)=>e.currentTarget.style.color='var(--color-neutral-dark)'}
            onMouseLeave={(e)=>e.currentTarget.style.color='var(--color-neutral-muted)'}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
