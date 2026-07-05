import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Check } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, wishlist, toggleWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  if (!quickViewProduct) return null;

  const isFavorited = wishlist.includes(quickViewProduct.id);
  const hasSale = quickViewProduct.originalPrice && quickViewProduct.originalPrice > quickViewProduct.price;

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(quickViewProduct.id, quantity);
    setIsAdding(false);
    closeQuickView();
  };

  return (
    <div 
      className="modal-overlay animate-fade-in"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 500,
        padding: '20px'
      }}
      onClick={(e) => { if (e.target === e.currentTarget) closeQuickView(); }}
    >
      <div 
        className="modal-box animate-slide-up"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          width: '100%',
          maxWidth: '850px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          maxHeight: '90vh',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={closeQuickView}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(250, 249, 246, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='white'}
          onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='rgba(250, 249, 246, 0.9)'}
        >
          <X size={20} />
        </button>

        {/* Left: Gallery Column */}
        <div style={{ width: '50%', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', backgroundColor: '#FDFCFA', padding: '40px 24px 24px' }}>
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', marginBottom: '20px' }}>
            <img 
              src={quickViewProduct.images[selectedImageIndex]} 
              alt={quickViewProduct.name} 
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            />
          </div>

          {quickViewProduct.images.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {quickViewProduct.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  style={{
                    width: '60px',
                    height: '60px',
                    border: index === selectedImageIndex ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    background: 'white',
                    padding: '2px',
                    cursor: 'pointer'
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info Column */}
        <div style={{ width: '50%', padding: '40px 32px 32px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '4px' }}>
            {quickViewProduct.brand}
          </span>
          
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-main)', lineHeight: '1.3', marginBottom: '12px' }}>
            {quickViewProduct.name}
          </h2>

          {/* Price details */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary)' }}>
              €{quickViewProduct.price.toFixed(2)}
            </span>
            {hasSale && (
              <span style={{ fontSize: '15px', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                €{quickViewProduct.originalPrice?.toFixed(2)}
              </span>
            )}
            
            {quickViewProduct.stockStatus === 'instock' ? (
              <span style={{ fontSize: '12px', color: '#2F5935', backgroundColor: '#E1EBE2', padding: '3px 8px', borderRadius: '4px', marginLeft: 'auto', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}><Check size={12}/> Dostupno</span>
            ) : (
              <span style={{ fontSize: '12px', color: '#5D5230', backgroundColor: '#E2D3A1', padding: '3px 8px', borderRadius: '4px', marginLeft: 'auto', fontWeight: 600 }}>Po narudžbi</span>
            )}
          </div>

          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
            {quickViewProduct.description}
          </p>

          {/* Spec details grid */}
          <div style={{ backgroundColor: 'var(--color-bg-site)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '24px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-main)', marginBottom: '8px', fontWeight: 700 }}>Specifikacije</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
              {Object.entries(quickViewProduct.specifications).slice(0, 4).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>{key}:</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {quickViewProduct.specNotice && (
            <p style={{ fontSize: '12px', color: 'red', fontWeight: 500, marginBottom: '16px' }}>{quickViewProduct.specNotice}</p>
          )}

          {/* Add-to-cart Controls */}
          {quickViewProduct.stockStatus !== 'outofstock' && (
            <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
              
              {/* Quantity Selector */}
              <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', height: '44px' }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '36px', height: '100%', background: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  -
                </button>
                <div style={{ width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600 }}>
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '36px', height: '100%', background: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  +
                </button>
              </div>

              {/* Add button */}
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="btn-primary"
                style={{ flexGrow: 1, height: '44px' }}
              >
                {isAdding ? (
                  'Dodavanje...'
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShoppingBag size={18} /> Dodaj u košaricu
                  </span>
                )}
              </button>

              {/* Favorite */}
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  height: '44px',
                  width: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  background: 'white',
                  color: 'var(--color-primary)'
                }}
              >
                <Heart size={20} fill={isFavorited ? 'var(--color-accent)' : 'none'} stroke={isFavorited ? 'var(--color-accent)' : 'currentColor'} />
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Embedded responsive stylesheet */}
      <style>{`
        @media (max-width: 768px) {
          .modal-box {
            flex-direction: column !important;
            max-height: 95vh !important;
            overflow-y: auto !important;
          }
          .modal-box > div {
            width: 100% !important;
          }
          .modal-box > div:first-child {
            padding: 30px 16px 16px !important;
            height: auto !important;
            border-right: none !important;
            border-bottom: 1px solid var(--color-border) !important;
          }
          .modal-box > div:last-child {
            padding: 24px 20px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};
