import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const PromoPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem('pointer_promo_shown');
    if (shown) return;

    const startPromoTimer = () => {
      // Show promotional modal after 3 seconds once cookie banner is resolved
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return timer;
    };

    const hasCookieConsent = localStorage.getItem('pointer_cookie_consent');
    let timerId: ReturnType<typeof setTimeout> | undefined;

    if (hasCookieConsent) {
      timerId = startPromoTimer();
    } else {
      // Wait for cookie banner resolution event
      const handleConsentChanged = () => {
        timerId = startPromoTimer();
      };
      window.addEventListener('cookie_consent_changed', handleConsentChanged);
      return () => {
        if (timerId) clearTimeout(timerId);
        window.removeEventListener('cookie_consent_changed', handleConsentChanged);
      };
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  const handleClose = () => {
    localStorage.setItem('pointer_promo_shown', 'yes');
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
    }
    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="promo-overlay animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="promo-box animate-popup-fade">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="promo-close-btn"
          aria-label="Zatvori promociju"
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
    </div>
  );
};

