import React, { useActionState, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, ShoppingBag, ArrowRight, CreditCard, ShieldCheck } from 'lucide-react';

interface CartPageProps {
  onNavigate: (route: string) => void;
}

interface OrderResult {
  success: boolean;
  orderId?: string;
  error?: string;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useShop();
  
  // Checkout form completion state
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('cod');

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const freeShippingLimit = 150;
  const shippingCost = subtotal >= freeShippingLimit ? 0 : 7.00;
  const total = subtotal + shippingCost;

  // React 19 Action to submit order details
  const submitOrderAction = async (_prevState: OrderResult | null, formData: FormData): Promise<OrderResult> => {
    // Validate inputs
    const fullName = formData.get('fullName') as string;
    const address = formData.get('address') as string;
    const phone = formData.get('phone') as string;

    if (!fullName || !address || !phone) {
      return { success: false, error: 'Molimo ispunite sva obavezna polja (Ime, Adresa, Telefon).' };
    }

    // Simulate payment gateway delay
    await new Promise((res) => setTimeout(res, 2000));

    const generatedOrderId = `PO-${Math.floor(100000 + Math.random() * 900000)}`;
    
    setOrderId(generatedOrderId);
    setOrderComplete(true);
    clearCart();

    return { success: true, orderId: generatedOrderId };
  };

  const [formState, formAction, isPending] = useActionState(submitOrderAction, null);

  // Success screen
  if (orderComplete) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '600px' }}>
        
        {/* React 19 Native Document Metadata */}
        <title>POINTER | Narudžba Uspješna</title>

        <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '40px 30px', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#E1EBE2', color: '#2F5935', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={36} />
            </div>
          </div>
          <h2 style={{ fontSize: '24px', color: 'var(--color-primary)', marginBottom: '12px' }}>Narudžba zaprimljena!</h2>
          <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
            Hvala Vam na kupovini u našoj trgovini. Vaša narudžba pod brojem <strong>{orderId}</strong> je uspješno obrađena i proslijeđena skladištu. Poslali smo detalje potvrde na Vaš e-mail.
          </p>
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', textAlign: 'left', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Status narudžbe:</span>
              <span style={{ fontWeight: 'bold', color: '#2F5935' }}>U obradi (Dostava u tijeku)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Procijenjeno vrijeme dostave:</span>
              <span style={{ fontWeight: 'bold' }}>3-5 radnih dana</span>
            </div>
          </div>
          <button onClick={() => onNavigate('home')} className="btn-primary" style={{ width: '100%' }}>
            Povratak na Naslovnicu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      
      {/* React 19 Native Document Metadata */}
      <title>POINTER | Košarica</title>
      <meta name="description" content="Pregled košarice i dovršetak narudžbe." />

      <h1 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '30px', borderBottom: '2px solid var(--color-primary)', paddingBottom: '12px' }}>
        Vaša Košarica
      </h1>

      {cart.length === 0 ? (
        <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '60px 20px', textAlign: 'center' }}>
          <ShoppingBag size={48} style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }} />
          <p style={{ fontSize: '16px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>Vaša košarica je trenutno prazna.</p>
          <button onClick={() => onNavigate('shop')} className="btn-primary">
            Kreni u Trgovinu
          </button>
        </div>
      ) : (
        /* Cart Page Layout Split Grid */
        <div style={{ display: 'flex', gap: '40px' }} className="cart-layout">
          
          {/* Left Column: Cart List */}
          <div style={{ flexGrow: 1 }} className="cart-list-col">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map(item => (
                <div 
                  key={item.product.id}
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                  }}
                >
                  <div style={{ width: '80px', height: '80px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={item.product.images[0]} alt={item.product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ fontSize: '15px', color: 'var(--color-text-main)', cursor: 'pointer' }} onClick={() => onNavigate(`product/${item.product.id}`)}>
                      {item.product.name}
                    </h3>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Cijena: €{item.product.price.toFixed(2)}</span>
                  </div>

                  {/* Quantity adjustment */}
                  <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      style={{ width: '28px', height: '32px', border: 'none', background: 'white', cursor: 'pointer' }}
                    >
                      -
                    </button>
                    <div style={{ width: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600 }}>
                      {item.quantity}
                    </div>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      style={{ width: '28px', height: '32px', border: 'none', background: 'white', cursor: 'pointer' }}
                    >
                      +
                    </button>
                  </div>

                  {/* Row Total */}
                  <div style={{ minWidth: '80px', textAlign: 'right', fontWeight: 'bold', fontSize: '15px', color: 'var(--color-text-main)' }}>
                    €{(item.product.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Remove */}
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    style={{ background: 'none', border: 'none', color: '#E57373', cursor: 'pointer', padding: '6px' }}
                    onMouseEnter={(e)=>e.currentTarget.style.color='#D32F2F'}
                    onMouseLeave={(e)=>e.currentTarget.style.color='#E57373'}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Simulated Checkout Form */}
            <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '30px', marginTop: '30px' }}>
              <h2 style={{ fontSize: '18px', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '20px', fontWeight: 700 }}>
                Podaci za Dostavu i Plaćanje
              </h2>

              <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '16px' }} className="form-row">
                  <div style={{ flexGrow: 1 }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Ime i Prezime *</label>
                    <input type="text" name="fullName" required placeholder="Ivan Horvat" className="input-field" />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>E-mail Adresa *</label>
                    <input type="email" name="email" required placeholder="ivan.horvat@example.com" className="input-field" />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Adresa Dostave *</label>
                  <input type="text" name="address" required placeholder="Koledinečka ulica 1a" className="input-field" style={{ marginBottom: '8px' }} />
                  <div style={{ display: 'flex', gap: '16px' }} className="form-row">
                    <input type="text" name="city" required placeholder="Zagreb" className="input-field" />
                    <input type="text" name="zip" required placeholder="10000" className="input-field" />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Broj Telefona *</label>
                  <input type="tel" name="phone" required placeholder="+385 91 123 4567" className="input-field" />
                </div>

                {/* Simulated Payment Gateway Option */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Način plaćanja</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer', backgroundColor: selectedPayment === 'cod' ? 'var(--color-bg-site)' : 'white' }}>
                      <input type="radio" name="paymentMethod" value="cod" checked={selectedPayment === 'cod'} onChange={() => setSelectedPayment('cod')} style={{ accentColor: 'var(--color-primary)' }} />
                      <div style={{ fontSize: '14px' }}>
                        <strong>Plaćanje pouzećem (gotovinom pri preuzimanju)</strong>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Platite gotovinom kada Vam dostavna služba preda paket.</div>
                      </div>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer', backgroundColor: selectedPayment === 'card' ? 'var(--color-bg-site)' : 'white' }}>
                      <input type="radio" name="paymentMethod" value="card" checked={selectedPayment === 'card'} onChange={() => setSelectedPayment('card')} style={{ accentColor: 'var(--color-primary)' }} />
                      <div style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CreditCard size={18} />
                        <div>
                          <strong>Kreditna kartica (Simulirani Gateway)</strong>
                          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Plaćanje Visa, Mastercard ili Maestro karticama.</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {selectedPayment === 'card' && (
                  <div className="animate-fade-in" style={{ backgroundColor: 'var(--color-bg-site)', border: '1px solid var(--color-border)', padding: '20px', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-primary)' }}>Podaci o Kartici (Simulacija)</div>
                    <input type="text" placeholder="Broj kartice (xxxx xxxx xxxx xxxx)" className="input-field" />
                    <div style={{ display: 'flex', gap: '16px' }} className="form-row">
                      <input type="text" placeholder="Valjanost (MM/GG)" className="input-field" />
                      <input type="text" placeholder="CVC" className="input-field" />
                    </div>
                  </div>
                )}

                {formState && !formState.success && (
                  <p style={{ color: '#E57373', fontSize: '13px', fontWeight: 600 }}>{formState.error}</p>
                )}

                <button 
                  type="submit" 
                  disabled={isPending}
                  className="btn-primary" 
                  style={{ width: '100%', height: '48px', marginTop: '10px' }}
                >
                  {isPending ? 'Simuliram naplatu i procesiram...' : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                      Dovrši Kupnju <ArrowRight size={18}/>
                    </span>
                  )}
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Checkout Summary Box */}
          <div style={{ width: '320px', flexShrink: 0 }} className="cart-summary-col">
            <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '24px', position: 'sticky', top: '100px' }}>
              <h2 style={{ fontSize: '18px', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '20px', fontWeight: 700 }}>
                Pregled Narudžbe
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Međuzbroj:</span>
                  <span style={{ fontWeight: 600 }}>€{subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Dostava:</span>
                  <span>{shippingCost === 0 ? 'BESPLATNO' : `€${shippingCost.toFixed(2)}`}</span>
                </div>
                
                {shippingCost > 0 && (
                  <div style={{ fontSize: '11px', color: 'var(--color-accent)', fontWeight: 600, backgroundColor: '#FAF2EC', padding: '6px 10px', borderRadius: '4px' }}>
                    Dodajte još €{(freeShippingLimit - subtotal).toFixed(2)} za besplatnu dostavu!
                  </div>
                )}
              </div>

              <div style={{ borderTop: '2px solid var(--color-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '24px' }}>
                <span>UKUPNO:</span>
                <span>€{total.toFixed(2)}</span>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span>* U zbroj je uključen PDV (25%)</span>
                <span>* Za plaćanje karticom nema dodatnih naknada</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Embedded CSS Resets for cart */}
      <style>{`
        @media (max-width: 900px) {
          .cart-layout {
            flex-direction: column !important;
          }
          .cart-summary-col {
            width: 100% !important;
          }
        }
        @media (max-width: 580px) {
          .form-row {
            flex-direction: column !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};
