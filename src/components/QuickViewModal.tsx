import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Check } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, wishlist, toggleWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

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
      className="modal-overlay-custom animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) closeQuickView(); }}
    >
      <div className="modal-inner-box animate-slide-up">
        {/* Close Button */}
        <button 
          onClick={closeQuickView}
          className="modal-close-btn"
          aria-label="Zatvori brzi pregled"
        >
          <X size={20} />
        </button>

        {/* Left: Gallery Column */}
        <div className="modal-gallery-col">
          <div 
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => { setIsZoomed(false); setZoomPos({ x: 50, y: 50 }); }}
            onMouseMove={handleMouseMove}
            style={{ 
              flexGrow: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '300px', 
              marginBottom: '20px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'zoom-in'
            }}
          >
            <img 
              src={quickViewProduct.images[selectedImageIndex]} 
              alt={quickViewProduct.name} 
              style={{ 
                maxHeight: '100%', 
                maxWidth: '100%', 
                objectFit: 'contain',
                transform: isZoomed ? 'scale(2.2)' : 'scale(1)',
                transformOrigin: isZoomed ? `${zoomPos.x}% ${zoomPos.y}%` : 'center',
                transition: isZoomed ? 'none' : 'transform 0.35s ease'
              }}
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
        <div className="modal-info-col">
          
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '4px' }}>
            {quickViewProduct.brand}
          </span>
          
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-neutral-dark)', lineHeight: '1.3', marginBottom: '12px' }}>
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
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-neutral-dark)', marginBottom: '8px', fontWeight: 700 }}>Specifikacije</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
              {Object.entries(quickViewProduct.specifications).slice(0, 4).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>{key}:</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-neutral-dark)' }}>{value}</span>
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
              <div className="detail-qty-wrapper">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Smanji količinu"
                >
                  -
                </button>
                <div className="qty-display">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Povećaj količinu"
                >
                  +
                </button>
              </div>

              {/* Add button */}
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="btn-primary"
                style={{ flexGrow: 1, height: '48px' }}
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
                aria-label="Popis želja"
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  height: '48px',
                  width: '48px',
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
          .modal-inner-box {
            flex-direction: column !important;
            max-height: 95vh !important;
            overflow-y: auto !important;
          }
          .modal-inner-box > div {
            width: 100% !important;
          }
          .modal-inner-box > div:first-child {
            padding: 30px 16px 16px !important;
            height: auto !important;
            border-right: none !important;
            border-bottom: 1px solid var(--color-border) !important;
          }
          .modal-inner-box > div:last-child {
            padding: 24px 20px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};
