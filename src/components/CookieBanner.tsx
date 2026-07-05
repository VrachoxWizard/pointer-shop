import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem('pointer_cookie_consent');
    if (!consent) {
      // Show the banner with a slight delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('pointer_cookie_consent', 'accepted_all');
    // Dispatch custom event to notify PromoPopup or other components
    window.dispatchEvent(new Event('cookie_consent_changed'));
    setIsOpen(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('pointer_cookie_consent', 'rejected_all');
    window.dispatchEvent(new Event('cookie_consent_changed'));
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-inner">
        <div className="cookie-banner-text">
          <h3 style={{ marginBottom: '6px' }}>
            Dobrodošli na Pointer trgovinu
          </h3>
          <p>
            Koristimo kolačiće za poboljšanje vašeg iskustva pregledavanja, posluživanje prilagođenih oglasa ili sadržaja i analizu našeg prometa. Klikom na "Prihvaćam sve" pristajete na našu upotrebu kolačića.
          </p>
        </div>

        <div className="cookie-banner-actions">
          <button 
            onClick={handleRejectAll}
            className="cookie-decline-btn"
          >
            ODBACI SVE
          </button>
          <button 
            onClick={handleAcceptAll}
            className="cookie-accept-btn"
          >
            PRIHVAĆAM SVE
          </button>
        </div>
      </div>
    </div>
  );
};

