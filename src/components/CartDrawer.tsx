import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (route: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const { isCartDrawerOpen, closeCartDrawer, cart, updateQuantity, removeFromCart } = useShop();

  if (!isCartDrawerOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleCheckoutClick = () => {
    closeCartDrawer();
    onNavigate('cart');
  };

  return (
    <div 
      className="cart-drawer-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) closeCartDrawer(); }}
    >
      <div className="cart-drawer-panel">
        
        {/* Drawer Header */}
        <div 
          style={{ 
            padding: '20px 24px', 
            borderBottom: '1px solid var(--color-neutral-border)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-bg-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={18} style={{ color: 'var(--color-accent)' }} />
            <h3 style={{ fontSize: '18px', color: 'var(--color-neutral-dark)' }}>Košarica</h3>
          </div>
          <button 
            onClick={closeCartDrawer}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-neutral-dark)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable list items */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '60px', color: 'var(--color-neutral-muted)' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
              <p style={{ fontSize: '14px' }}>Vaša košarica je trenutno prazna.</p>
              <button 
                onClick={() => { closeCartDrawer(); onNavigate('shop'); }} 
                className="btn-secondary" 
                style={{ marginTop: '16px', fontSize: '12px', padding: '8px 16px' }}
              >
                Kreni u kupnju
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.product.id}
                style={{ 
                  display: 'flex', 
                  gap: '12px', 
                  alignItems: 'center',
                  borderBottom: '1px solid var(--color-neutral-border)',
                  paddingBottom: '16px' 
                }}
              >
                <div style={{ width: '60px', height: '60px', border: '1px solid var(--color-neutral-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', padding: '4px', background: 'white', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={item.product.images[0]} alt="" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div 
                    style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-dark)', cursor: 'pointer' }}
                    onClick={() => { closeCartDrawer(); onNavigate(`product/${item.product.id}`); }}
                  >
                    {item.product.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-neutral-muted)' }}>€{item.product.price.toFixed(2)}</div>
                  
                  {/* Selector qty */}
                  <div style={{ display: 'flex', border: '1px solid var(--color-neutral-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', width: '80px', height: '24px', marginTop: '4px' }}>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      style={{ width: '24px', border: 'none', background: 'white', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold' }}
                    >
                      -
                    </button>
                    <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, backgroundColor: 'white' }}>
                      {item.quantity}
                    </div>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      style={{ width: '24px', border: 'none', background: 'white', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold' }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-neutral-dark)' }}>
                    €{(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    style={{ background: 'none', border: 'none', color: '#E57373', cursor: 'pointer' }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '24px', borderTop: '1px solid var(--color-neutral-border)', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'var(--color-bg-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px' }}>
              <span style={{ color: 'var(--color-neutral-muted)' }}>Međuzbroj:</span>
              <strong style={{ fontSize: '18px', color: 'var(--color-neutral-dark)' }}>€{subtotal.toFixed(2)}</strong>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={handleCheckoutClick}
                className="btn-primary btn-shimmer"
                style={{ width: '100%', height: '46px' }}
              >
                Idi na Naplatu <ArrowRight size={16} />
              </button>
              <button 
                onClick={closeCartDrawer}
                className="btn-secondary"
                style={{ width: '100%', height: '44px', border: '1px solid var(--color-neutral-border)' }}
              >
                Nastavi Kupovinu
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default CartDrawer;
