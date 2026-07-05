import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container" style={{ padding: '40px 20px 80px', maxWidth: '800px' }}>
      
      {/* React 19 Native Document Metadata */}
      <title>POINTER | Pravila Privatnosti</title>
      <meta name="description" content="Pravila privatnosti i zaštita osobnih podataka." />

      <h1 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '30px', borderBottom: '2px solid var(--color-primary)', paddingBottom: '12px' }}>
        Pravila Privatnosti
      </h1>

      <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: '1.8' }}>
        <p style={{ fontWeight: 'bold' }}>
          Ova pravila privatnosti objašnjavaju kako lovačka trgovina POINTER prikuplja, obrađuje i štiti Vaše osobne podatke pri korištenju ove web stranice.
        </p>

        <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', fontWeight: 700 }}>1. Koje podatke prikupljamo?</h3>
        <p>
          Prilikom slanja upita putem kontakt obrasca ili izrade narudžbe u našoj simuliranoj košarici, možemo prikupljati sljedeće podatke: ime i prezime, adresa dostave, grad, poštanski broj, e-mail adresa, telefonski broj te informacije o odabranom načinu plaćanja.
        </p>

        <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', fontWeight: 700 }}>2. Svrha obrade podataka</h3>
        <p>
          Podatke prikupljamo isključivo radi:
        </p>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li>Obrade i dostave Vaših narudžbi.</li>
          <li>Odgovaranja na Vaša pitanja poslana putem kontakt obrasca.</li>
          <li>Slanja promotivnih obavijesti i newslettera (ukoliko ste dali pristanak).</li>
        </ul>

        <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', fontWeight: 700 }}>3. Sigurnost podataka</h3>
        <p>
          Poduzimamo tehničke i organizacijske mjere kako bismo osigurali visoku razinu sigurnosti Vaših podataka i spriječili neovlašteni pristup ili zlouporabu. Vaši podaci se pohranjuju povjerljivo i ne dijele se s trećim stranama u marketinške svrhe.
        </p>

        <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', fontWeight: 700 }}>4. Vaša prava</h3>
        <p>
          Imate pravo u bilo kojem trenutku zatražiti uvid u osobne podatke koje čuvamo o Vama, zatražiti ispravak netočnih podataka ili brisanje iz naših baza podataka slanjem e-maila na info@pointershop.net.
        </p>
      </div>

    </div>
  );
};
