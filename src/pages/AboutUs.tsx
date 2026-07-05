import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <div className="container" style={{ padding: '40px 20px 80px', maxWidth: '800px' }}>
      
      {/* React 19 Native Document Metadata */}
      <title>POINTER | O Nama</title>
      <meta name="description" content="Saznajte više o lovačkoj trgovini POINTER." />

      <h1 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '30px', borderBottom: '2px solid var(--color-primary)', paddingBottom: '12px' }}>
        O Nama
      </h1>

      <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: '1.8' }}>
        <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-primary)' }}>
          Dobrodošli u lovačku trgovinu POINTER - Vaše glavno odredište za lovačko oružje, streljivo i vrhunsku outdoor opremu u Hrvatskoj.
        </p>

        <p>
          Osnovani smo s vizijom da pružimo lovačkoj i streljačkoj zajednici opremu najviše svjetske klase, uz stručno savjetovanje i pouzdanu tehničku podršku. U našoj trgovini u Zagrebu, kao i putem interneta, nudimo široki spektar dugog i kratkog oružja renomiranih svjetskih marki, visokokvalitetno sačmeno i karabinsko streljivo, te opremu koja jamči maksimalnu sigurnost.
        </p>

        <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', marginTop: '10px', fontWeight: 700 }}>Naša Misija</h3>
        <p>
          Promicanje etičkog i odgovornog lova, podrška sportskom streljaštvu i opskrba naših kupaca proizvodima na koje se mogu osloniti u najzahtjevnijim situacijama. Kao ekskluzivni zastupnici i partneri brandova kao što su Leupold, HS Produkt, Mauser, RWS i drugi, jamčimo autentičnost i vrhunsku kvalitetu svakog artikla.
        </p>

        <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', marginTop: '10px', fontWeight: 700 }}>Zašto odabrati POINTER?</h3>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li><strong>Stručno osoblje:</strong> Naš tim čine iskusni lovci i licencirani oružari koji razumiju Vaše potrebe.</li>
          <li><strong>Premium brandovi:</strong> Nudimo samo opremu koja je prošla stroge testove pouzdanosti.</li>
          <li><strong>Kompletna usluga:</strong> Od prodaje, preko montaže i upucavanja optika, do redovnog servisa i čišćenja oružja.</li>
          <li><strong>Sigurnost i legalnost:</strong> Pomažemo Vam u rješavanju zakonske dokumentacije prilikom kupnje.</li>
        </ul>
      </div>

    </div>
  );
};
