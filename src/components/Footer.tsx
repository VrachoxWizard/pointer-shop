import React, { useActionState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

interface FormState {
  success: boolean;
  message: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  
  // React 19 Action handler for newsletter signup
  const subscribeAction = async (_prevState: FormState | null, formData: FormData): Promise<FormState> => {
    const email = formData.get('email') as string;
    
    // Simulate API request delay
    await new Promise((res) => setTimeout(res, 1200));

    if (!email || !email.includes('@')) {
      return {
        success: false,
        message: 'Molimo unesite valjanu e-mail adresu.',
      };
    }

    return {
      success: true,
      message: 'Hvala Vam na prijavi! Uspješno ste se pretplatili na naš newsletter.',
    };
  };

  const [formState, formAction, isPending] = useActionState(subscribeAction, null);

  return (
    <footer className="footer-classic footer-classic-container">
      <div className="container">
        
        {/* Footer Top Grid */}
        <div className="grid-cols-4" style={{ marginBottom: '40px' }}>
          
          {/* About Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 className="footer-logo-title">POINTER TRGOVINA</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.7' }}>
              Specijalizirana trgovina oružjem, streljivom, optikom i vrhunskom lovačkom opremom. Vaš pouzdani partner za sigurnost i uspješan lov.
            </p>
            <div className="footer-payment-tags">
              {/* Payment brand badges */}
              <span>VISA</span>
              <span>MC</span>
              <span>MAESTRO</span>
              <span>KEKS</span>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ color: 'white', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Korisne Poveznice</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => onNavigate('home')}>Početna</button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')}>Katalog Proizvoda</button>
              </li>
              <li>
                <button onClick={() => onNavigate('about-us')}>O Nama</button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')}>Kontaktirajte Nas</button>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ color: 'white', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Informacije</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => onNavigate('privacy-policy')}>Pravila Privatnosti</button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')}>Uvjeti Korištenja</button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')}>Dostava i Povrati</button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Subscription */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ color: 'white', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pretplatite Se</h4>
            <p style={{ fontSize: '13px', lineHeight: '1.6' }}>Prijavite se na naš newsletter i saznajte prvi o akcijama i novom streljivu.</p>
            
            <form action={formAction} className="footer-form-wrapper">
              <div style={{ display: 'flex', position: 'relative' }}>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Vaša e-mail adresa..." 
                  required
                  className="footer-email-input"
                  style={{
                    width: '100%',
                    padding: '10px 40px 10px 12px',
                    borderRadius: '4px',
                    border: '1px solid #3A3E33',
                    backgroundColor: '#23271D',
                    color: 'white',
                    outline: 'none',
                    fontSize: '13px'
                  }}
                />
                <button 
                  type="submit" 
                  disabled={isPending}
                  style={{
                    position: 'absolute',
                    right: '4px',
                    top: '4px',
                    bottom: '4px',
                    backgroundColor: 'var(--color-accent)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    width: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  {isPending ? (
                    <span className="spinner" style={{ width: '12px', height: '12px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }}></span>
                  ) : (
                    <Send size={14} />
                  )}
                </button>
              </div>

              {formState && (
                <p style={{ 
                  fontSize: '12px', 
                  color: formState.success ? '#82C582' : '#E57373',
                  fontWeight: 500,
                  marginTop: '4px'
                }}>
                  {formState.message}
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Footer Middle (Address Details) */}
        <div 
          className="footer-address-bar"
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '24px', 
            padding: '24px 0', 
            borderTop: '1px solid #2E3227', 
            borderBottom: '1px solid #2E3227', 
            fontSize: '13px', 
            justifyContent: 'center' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={16} style={{ color: 'var(--color-accent)' }} />
            <span>Koledinečka ulica 1a, 10000 Zagreb, Hrvatska</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={16} style={{ color: 'var(--color-accent)' }} />
            <span>+385 (0)1 2920 400</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={16} style={{ color: 'var(--color-accent)' }} />
            <span>info@pointershop.net</span>
          </div>
        </div>

        {/* Footer Bottom (Copyrights) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0 0', fontSize: '12px' }}>
          <p className="footer-bottom-text">© {new Date().getFullYear()} POINTER Trgovina d.o.o. Sva prava pridržana.</p>
          <p className="footer-bottom-text">Izrada: Antigravity React Migration App</p>
        </div>

      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </footer>
  );
};
