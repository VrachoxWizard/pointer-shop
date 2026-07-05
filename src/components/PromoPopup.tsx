import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const PromoPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem('pointer_promo_shown');
    if (!shown) {
      // Show promotional modal after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('pointer_promo_shown', 'yes');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="promo-overlay animate-fade-in"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div 
        className="promo-box animate-popup-fade"
        style={{
          position: 'relative',
          maxWidth: '650px',
          width: '100%',
          borderRadius: 'var(--radius-lg)',
          overflow: 'visible'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '-18px',
            right: '-18px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: '2px solid white',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 10000,
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#222222'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
        >
          <X size={20} />
        </button>

        {/* Promo Image */}
        <img 
          src="/images/2.png" 
          alt="Promotivna Ponuda" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 0 40px rgba(0,0,0,0.6)'
          }}
        />
      </div>
      
      <style>{`
        @keyframes popupFade {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-popup-fade {
          animation: popupFade 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
};
