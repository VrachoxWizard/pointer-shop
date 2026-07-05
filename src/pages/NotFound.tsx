import React from 'react';

interface NotFoundProps {
  onNavigate: (route: string) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
  return (
    <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
      
      {/* React 19 Native Document Metadata */}
      <title>POINTER | Stranica Nije Pronađena</title>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h1 style={{ fontSize: '72px', color: 'var(--color-primary)', fontWeight: 800 }}>404</h1>
        <h2 style={{ fontSize: '24px', color: 'var(--color-text-main)', fontWeight: 700 }}>Stranica nije pronađena</h2>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '480px', fontSize: '15px', lineHeight: '1.6' }}>
          Tražena stranica ili proizvod ne postoji ili je uklonjen. Molimo Vas da se vratite na početnu stranicu ili pretražite katalog.
        </p>
        <button onClick={() => onNavigate('home')} className="btn-primary" style={{ marginTop: '16px' }}>
          Povratak na Početnu
        </button>
      </div>
    </div>
  );
};
