import React from 'react';
import { Target, Users, ShieldCheck, Wrench, FileCheck } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

export const AboutUs: React.FC = () => {
  return (
    <div className="container animate-fade-in" style={{ padding: '0 20px 80px', marginTop: '20px' }}>
      
      {/* React 19 Native Document Metadata */}
      <title>POINTER | O Nama</title>
      <meta name="description" content="Saznajte više o lovačkoj trgovini POINTER. Vaše glavno odredište za lovačko oružje, streljivo i opremu." />

      {/* Reusable PageHeader with Breadcrumbs */}
      <PageHeader 
        title="O Nama" 
        subtitle="Saznajte tko smo i zašto smo prvi izbor za lovce i strijelce diljem Hrvatske."
        breadcrumbs={[{ label: 'O nama' }]}
      />

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Brand Introduction */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <p style={{ 
            fontSize: 'clamp(20px, 3vw, 24px)', 
            fontWeight: 300, 
            lineHeight: 1.6, 
            color: 'var(--color-primary)',
            marginBottom: '24px'
          }}>
            <strong style={{ fontWeight: 700, color: 'var(--color-accent)' }}>Dobrodošli u POINTER</strong> — Vaše glavno odredište za lovačko oružje, streljivo i vrhunsku outdoor opremu u Hrvatskoj.
          </p>
          <p style={{ fontSize: '16px', color: 'var(--color-neutral-muted)', lineHeight: 1.8, maxWidth: '750px', margin: '0 auto' }}>
            Osnovani smo s vizijom da pružimo lovačkoj i streljačkoj zajednici opremu najviše svjetske klase, uz stručno savjetovanje i pouzdanu tehničku podršku. U našoj trgovini u Zagrebu, kao i putem interneta, nudimo široki spektar dugog i kratkog oružja renomiranih svjetskih marki, visokokvalitetno sačmeno i karabinsko streljivo, te opremu koja jamči maksimalnu sigurnost.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="glassmorphism" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', marginBottom: '60px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: 'var(--color-accent)', padding: '12px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(242, 110, 0, 0.4)' }}>
              <Target size={28} />
            </div>
            <h2 style={{ fontSize: '28px', color: 'var(--color-primary)', margin: 0 }}>Naša Misija</h2>
          </div>
          <p style={{ fontSize: '17px', color: 'var(--color-neutral-dark)', lineHeight: 1.8, fontWeight: 500 }}>
            Promicanje etičkog i odgovornog lova, podrška sportskom streljaštvu i opskrba naših kupaca proizvodima na koje se mogu osloniti u najzahtjevnijim situacijama. Kao ekskluzivni zastupnici i partneri brandova kao što su <strong style={{ color: 'var(--color-accent)' }}>Leupold, HS Produkt, Mauser, RWS</strong> i drugi, jamčimo autentičnost i vrhunsku kvalitetu svakog artikla.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', color: 'var(--color-primary)', textAlign: 'center', marginBottom: '40px' }}>
            Zašto odabrati <span className="text-gradient-copper">POINTER?</span>
          </h2>
          
          <div className="grid-cols-2">
            
            <div className="contact-info-card" style={{ padding: '32px', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
              <div className="contact-icon-wrapper" style={{ width: '56px', height: '56px' }}>
                <Users size={26} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', marginBottom: '12px' }}>Stručno Osoblje</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-neutral-muted)', lineHeight: 1.6 }}>Naš tim čine iskusni lovci i licencirani oružari koji u potpunosti razumiju Vaše potrebe na terenu.</p>
              </div>
            </div>

            <div className="contact-info-card" style={{ padding: '32px', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
              <div className="contact-icon-wrapper" style={{ width: '56px', height: '56px' }}>
                <ShieldCheck size={26} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', marginBottom: '12px' }}>Premium Brandovi</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-neutral-muted)', lineHeight: 1.6 }}>Nudimo isključivo opremu koja je prošla stroge međunarodne testove kvalitete i pouzdanosti.</p>
              </div>
            </div>

            <div className="contact-info-card" style={{ padding: '32px', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
              <div className="contact-icon-wrapper" style={{ width: '56px', height: '56px' }}>
                <Wrench size={26} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', marginBottom: '12px' }}>Kompletna Usluga</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-neutral-muted)', lineHeight: 1.6 }}>Od prodaje i savjetovanja, preko profesionalne montaže i upucavanja optika, do redovnog servisa.</p>
              </div>
            </div>

            <div className="contact-info-card" style={{ padding: '32px', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
              <div className="contact-icon-wrapper" style={{ width: '56px', height: '56px' }}>
                <FileCheck size={26} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', marginBottom: '12px' }}>Sigurnost i Legalnost</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-neutral-muted)', lineHeight: 1.6 }}>Vodimo Vas i pomažemo u rješavanju cjelokupne zakonske dokumentacije prilikom kupnje oružja.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
