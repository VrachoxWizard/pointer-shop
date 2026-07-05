import React, { useActionState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface FormResult {
  success: boolean;
  message: string;
}

export const Contact: React.FC = () => {

  // React 19 Action to handle contact form submit
  const handleContactSubmit = async (_prevState: FormResult | null, formData: FormData): Promise<FormResult> => {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Simulate database lag for spinner demonstration
    await new Promise((res) => setTimeout(res, 1500));

    if (!name || !email || !message) {
      return { success: false, message: 'Sva polja su obavezna.' };
    }

    if (!email.includes('@')) {
      return { success: false, message: 'Molimo unesite ispravan e-mail.' };
    }

    return { 
      success: true, 
      message: 'Hvala Vam na poruci! Javit ćemo Vam se u najkraćem mogućem roku.' 
    };
  };

  const [formState, formAction, isPending] = useActionState(handleContactSubmit, null);

  return (
    <div className="container animate-fade-in" style={{ padding: '0 20px 80px', marginTop: '20px' }}>
      
      {/* React 19 Native Document Metadata */}
      <title>POINTER | Kontaktirajte Nas</title>
      <meta name="description" content="Kontakt podaci, lokacija i obrazac za slanje poruka trgovini POINTER." />

      {/* Hero Header Area */}
      <div className="page-hero">
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '16px' }}>
          Kontaktirajte Nas
        </h1>
        <p style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto', color: 'var(--color-neutral-border)', opacity: 0.9 }}>
          Tu smo za sva vaša pitanja. Bilo da se radi o upitu za asortiman, narudžbu ili stručan savjet – naš tim Vam stoji na raspolaganju.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '40px' }} className="contact-layout">
        
        {/* Left Column: Contact info & Hours */}
        <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '20px' }} className="contact-info-col">
          
          <div className="contact-info-card">
            <div className="contact-icon-wrapper">
              <MapPin size={22} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '15px', color: 'var(--color-primary)', marginBottom: '4px' }}>Lokacija</strong>
              <span style={{ fontSize: '14px', color: 'var(--color-neutral-muted)', lineHeight: 1.5, display: 'block' }}>Koledinečka ulica 1a,<br/>10000 Zagreb, Hrvatska</span>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon-wrapper">
              <Phone size={22} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '15px', color: 'var(--color-primary)', marginBottom: '4px' }}>Telefon</strong>
              <a href="tel:+38512920400" style={{ fontSize: '14px', color: 'var(--color-neutral-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-neutral-muted)'}>
                +385 (0)1 2920 400
              </a>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon-wrapper">
              <Mail size={22} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '15px', color: 'var(--color-primary)', marginBottom: '4px' }}>E-mail</strong>
              <a href="mailto:info@pointershop.net" style={{ fontSize: '14px', color: 'var(--color-neutral-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-neutral-muted)'}>
                info@pointershop.net
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="glassmorphism" style={{ borderRadius: 'var(--radius-md)', padding: '24px', marginTop: '12px' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px', marginBottom: '16px' }}>
              <Clock size={18} color="var(--color-accent)" /> Radno Vrijeme
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-neutral-muted)' }}>Ponedjeljak - Petak</span>
                <span style={{ fontWeight: 600, color: 'var(--color-neutral-dark)' }}>08:00 - 20:00 h</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-neutral-muted)' }}>Subota</span>
                <span style={{ fontWeight: 600, color: 'var(--color-neutral-dark)' }}>08:00 - 14:00 h</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px dashed var(--glass-border)' }}>
                <span style={{ color: 'var(--color-neutral-muted)' }}>Nedjelja i Blagdani</span>
                <span style={{ fontWeight: 700, color: '#D32F2F', letterSpacing: '0.05em' }}>ZATVORENO</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div style={{ width: '60%' }} className="contact-form-col">
          <div className="glassmorphism" style={{ borderRadius: 'var(--radius-lg)', padding: '40px' }}>
            <h2 style={{ fontSize: '24px', color: 'var(--color-primary)', marginBottom: '8px' }}>Pošaljite nam upit</h2>
            <p style={{ fontSize: '14px', color: 'var(--color-neutral-muted)', marginBottom: '32px' }}>
              Napišite svoje pitanje ili komentar i odgovorit ćemo Vam u najkraćem mogućem roku.
            </p>

            <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-neutral-slate)' }}>Vaše Ime i Prezime *</label>
                <input type="text" name="name" required placeholder="Ivan Horvat" className="input-field" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-neutral-slate)' }}>Vaša E-mail adresa *</label>
                <input type="email" name="email" required placeholder="ivan@example.com" className="input-field" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-neutral-slate)' }}>Vaša Poruka *</label>
                <textarea name="message" required rows={6} placeholder="Ovdje upišite svoje pitanje..." className="input-field" style={{ resize: 'vertical' }}></textarea>
              </div>

              {formState && (
                <div className={`form-feedback ${formState.success ? 'success' : 'error'}`}>
                  {formState.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  {formState.message}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isPending}
                className="btn-primary"
                style={{ width: '100%', height: '52px', marginTop: '10px', fontSize: '15px' }}
              >
                {isPending ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="spinner" style={{ width: '16px', height: '16px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                    Slanje poruke...
                  </span>
                ) : (
                  <React.Fragment>
                    Pošalji Poruku <Send size={18}/>
                  </React.Fragment>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Map Integration */}
      <div className="map-container animate-slide-up">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2780.89662058564!2d16.037803876616016!3d45.813350210065094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d7ad818d0af5%3A0x6a2c2c0bf7a6fc24!2sKoledine%C4%8Dka%20ul.%201a%2C%2010000%2C%20Zagreb!5e0!3m2!1sen!2shr!4v1714421151609!5m2!1sen!2shr" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Pointer Shop Map Location"
        ></iframe>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .contact-layout {
            flex-direction: column !important;
          }
          .contact-info-col, .contact-form-col {
            width: 100% !important;
          }
          .page-hero {
            padding: 40px 20px;
          }
        }
      `}</style>

    </div>
  );
};

