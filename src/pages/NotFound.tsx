import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { Search } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px 80px', maxWidth: '800px' }}>
      
      {/* React 19 Native Document Metadata */}
      <title>POINTER | Stranica Nije Pronađena</title>

      <PageHeader 
        title="Pogrješka 404" 
        subtitle="Tražena stranica ili proizvod ne postoji."
        breadcrumbs={[{ label: '404' }]}
      />

      <div 
        className="glassmorphism" 
        style={{ 
          padding: '40px 30px', 
          borderRadius: 'var(--radius-lg)', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Background Image Graphic with overlay */}
        <div 
          style={{ 
            width: '100%', 
            height: '220px', 
            borderRadius: 'var(--radius-md)', 
            backgroundImage: 'url("/images/bg_404.jpg")', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)' }} />
          <h2 style={{ zIndex: 1, fontSize: '96px', fontWeight: 900, color: 'white', letterSpacing: '0.05em', textShadow: '0 4px 16px rgba(0,0,0,0.6)', margin: 0 }}>404</h2>
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-neutral-dark)', margin: 0 }}>Stranica nije pronađena</h3>
        <p style={{ color: 'var(--color-neutral-muted)', maxWidth: '520px', fontSize: '14.5px', lineHeight: '1.6', margin: 0 }}>
          Tražena stranica ne postoji. Možda je uklonjena ili je adresa privremeno promijenjena. Pokušajte pretražiti katalog u nastavku ili iskoristite brze poveznice.
        </p>

        {/* Quick Search form */}
        <form onSubmit={handleSearchSubmit} style={{ width: '100%', maxWidth: '440px', display: 'flex', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Pretraži ponudu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ width: '100%', paddingRight: '48px' }}
          />
          <button 
            type="submit" 
            style={{ 
              position: 'absolute', 
              right: '4px', 
              top: '4px', 
              bottom: '4px', 
              backgroundColor: 'var(--color-primary)', 
              border: 'none', 
              borderRadius: 'var(--radius-sm)', 
              width: '36px', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Search size={16} />
          </button>
        </form>

        {/* Popular links */}
        <div style={{ marginTop: '12px' }}>
          <span style={{ fontSize: '13px', color: 'var(--color-neutral-muted)', display: 'block', marginBottom: '12px', fontWeight: 600 }}>
            BRZE KATEGORIJE:
          </span>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button type="button" onClick={() => navigate('/shop?category=optika')} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>Optika</button>
            <button type="button" onClick={() => navigate('/shop?category=oruzje')} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>Oružje</button>
            <button type="button" onClick={() => navigate('/shop?category=streljivo')} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>Streljivo</button>
            <button type="button" onClick={() => navigate('/')} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>Početna</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
