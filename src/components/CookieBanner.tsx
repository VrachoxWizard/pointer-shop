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
    setIsOpen(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('pointer_cookie_consent', 'rejected_all');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="cookie-banner-wrapper animate-slide-up"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        maxWidth: '420px',
        width: 'calc(100% - 48px)',
        backgroundColor: '#161913',
        color: '#D0D0D0',
        padding: '24px',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        border: '1px solid #2B3022',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 style={{ color: 'white', fontSize: '16px', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
          Dobrodošli na Pointer trgovinu
        </h3>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#B3B8AD' }}>
          Koristimo kolačiće za poboljšanje vašeg iskustva pregledavanja, posluživanje prilagođenih oglasa ili sadržaja i analizu našeg prometa. Klikom na "Prihvaćam sve" pristajete na našu upotrebu kolačića.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button 
          onClick={handleRejectAll}
          style={{
            flex: 1,
            padding: '8px 12px',
            backgroundColor: 'transparent',
            color: '#B3B8AD',
            border: '1px solid #3E4535',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'white'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#B3B8AD'; e.currentTarget.style.borderColor = '#3E4535'; }}
        >
          ODBACI SVE
        </button>
        <button 
          onClick={handleAcceptAll}
          style={{
            flex: 1.5,
            padding: '8px 12px',
            backgroundColor: 'var(--color-accent)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'center',
            boxShadow: '0 2px 6px rgba(255, 125, 4, 0.2)',
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}
        >
          PRIHVAĆAM SVE
        </button>
      </div>
    </div>
  );
};
