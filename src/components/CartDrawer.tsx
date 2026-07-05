import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { isCartDrawerOpen, closeCartDrawer, cart, updateQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();

  // Scroll lock effect
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
    }
    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, [isCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleCheckoutClick = () => {
    closeCartDrawer();
    navigate('/cart');
  };

  return (
    <div 
      className="cart-drawer-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) closeCartDrawer(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div className="cart-drawer-panel">
        
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title">
            <ShoppingBag size={18} style={{ color: 'var(--color-accent)' }} />
            <h3 id="cart-drawer-title">Košarica</h3>
          </div>
          <button 
            onClick={closeCartDrawer}
            className="drawer-close-btn"
            aria-label="Zatvori košaricu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable list items */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="drawer-empty-msg">
              <ShoppingBag size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
              <p style={{ fontSize: '14px' }}>Vaša košarica je trenutno prazna.</p>
              <button 
                onClick={() => { closeCartDrawer(); navigate('/shop'); }} 
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
                className="drawer-cart-item"
              >
                <div className="drawer-item-thumbnail">
                  <img src={item.product.images[0]} alt="" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                
                <div className="drawer-item-details">
                  <div 
                    style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-dark)', cursor: 'pointer' }}
                    onClick={() => { closeCartDrawer(); navigate(`/product/${item.product.id}`); }}
                  >
                    {item.product.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-neutral-muted)' }}>€{item.product.price.toFixed(2)}</div>
                  
                  {/* Selector qty */}
                  <div className="drawer-item-qty-stepper">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      aria-label="Smanji količinu"
                    >
                      -
                    </button>
                    <div className="qty-val">
                      {item.quantity}
                    </div>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      aria-label="Povećaj količinu"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="drawer-item-price-actions">
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-neutral-dark)' }}>
                    €{(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label={`Ukloni ${item.product.name} iz košarice`}
                    style={{ background: 'none', border: 'none', color: 'var(--color-error-light)', cursor: 'pointer' }}
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
          <div className="drawer-footer">
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
                style={{ width: '100%', height: '46px' }}
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

