import React, { useActionState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

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

    // Simulate database lag
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
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      
      {/* React 19 Native Document Metadata */}
      <title>POINTER | Kontaktirajte Nas</title>
      <meta name="description" content="Kontakt podaci, lokacija i obrazac za slanje poruka trgovini POINTER." />

      <h1 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '30px', borderBottom: '2px solid var(--color-primary)', paddingBottom: '12px' }}>
        Kontaktirajte Nas
      </h1>

      <div style={{ display: 'flex', gap: '50px' }} className="contact-layout">
        
        {/* Left Column: Contact info & Hours */}
        <div style={{ width: '40%' }} className="contact-info-col">
          <h2 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 700 }}>Pointer Shop</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={18} style={{ color: 'var(--color-accent)' }} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', color: 'var(--color-text-main)' }}>Lokacija</strong>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Koledinečka ulica 1a, 10000 Zagreb, Hrvatska</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={18} style={{ color: 'var(--color-accent)' }} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', color: 'var(--color-text-main)' }}>Telefon</strong>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>+385 (0)1 2920 400</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={18} style={{ color: 'var(--color-accent)' }} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', color: 'var(--color-text-main)' }}>E-mail</strong>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>info@pointershop.net</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '16px', fontWeight: 700 }}>
              <Clock size={16}/> Radno Vrijeme
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Ponedjeljak - Petak:</span>
                <span style={{ fontWeight: 600 }}>08:00 - 20:00 h</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Subota:</span>
                <span style={{ fontWeight: 600 }}>08:00 - 14:00 h</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Nedjelja i Blagdani:</span>
                <span style={{ fontWeight: 'bold', color: '#D32F2F' }}>ZATVORENO</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div style={{ width: '60%' }} className="contact-form-col">
          <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '30px' }}>
            <h2 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '8px', fontWeight: 700 }}>Pošaljite nam upit</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>Napišite svoje pitanje ili komentar i odgovorit ćemo Vam u najkraćem roku.</p>

            <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Vaše Ime i Prezime *</label>
                <input type="text" name="name" required placeholder="Ivan Horvat" className="input-field" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Vaša E-mail adresa *</label>
                <input type="email" name="email" required placeholder="ivan@example.com" className="input-field" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Vaša Poruka *</label>
                <textarea name="message" required rows={5} placeholder="Ovdje upišite svoje pitanje..." className="input-field" style={{ resize: 'vertical' }}></textarea>
              </div>

              {formState && (
                <p style={{ 
                  fontSize: '13px', 
                  color: formState.success ? '#2F5935' : '#D32F2F',
                  fontWeight: 600,
                  backgroundColor: formState.success ? '#E1EBE2' : '#FDECEA',
                  padding: '10px 14px',
                  borderRadius: '4px'
                }}>
                  {formState.message}
                </p>
              )}

              <button 
                type="submit" 
                disabled={isPending}
                className="btn-primary"
                style={{ width: '100%', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {isPending ? 'Slanje poruke...' : (
                  <React.Fragment>
                    Pošalji Poruku <Send size={15}/>
                  </React.Fragment>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-layout {
            flex-direction: column !important;
          }
          .contact-info-col, .contact-form-col {
            width: 100% !important;
          }
        }
      `}</style>

    </div>
  );
};
