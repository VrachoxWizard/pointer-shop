import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, wishlist, toggleWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const galleryRectRef = useRef<DOMRect | null>(null);

  // Scroll lock effect
  useEffect(() => {
    if (quickViewProduct) {
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
    }
    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, [quickViewProduct]);

  // Reset indices/quantities when product changes
  useEffect(() => {
    setQuantity(1);
    setSelectedImageIndex(0);
  }, [quickViewProduct]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsZoomed(true);
    galleryRectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomPos({ x: 50, y: 50 });
    galleryRectRef.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!galleryRectRef.current) {
      galleryRectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const { left, top, width, height } = galleryRectRef.current;
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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
            {/* Gallery Zoom Hint */}
            <div className="gallery-zoom-badge">
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>🔍</span> Pređite mišem za zumiranje
            </div>
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
                    border: index === selectedImageIndex ? '2px solid var(--color-accent)' : '1px solid var(--color-neutral-border)',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    background: 'white',
                    padding: '2px',
                    cursor: 'pointer',
                    boxShadow: index === selectedImageIndex ? 'var(--shadow-sm)' : 'none',
                    transition: 'all var(--transition-fast)'
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
          
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-neutral-muted)', fontWeight: 800, letterSpacing: '0.07em', marginBottom: '4px', display: 'block' }}>
            {quickViewProduct.brand}
          </span>
          
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-neutral-dark)', lineHeight: '1.25', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
            {quickViewProduct.name}
          </h2>

          {/* Social Proof Star Rating */}
          <div className="premium-rating-container">
            <div className="premium-stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ fontSize: '14px' }}>★</span>
              ))}
            </div>
            <span className="premium-rating-text">4.8 (42 recenzije)</span>
          </div>

          {/* Price details */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-primary)' }}>
                €{quickViewProduct.price.toFixed(2)}
              </span>
              {hasSale && (
                <span style={{ fontSize: '15px', color: 'var(--color-neutral-muted)', textDecoration: 'line-through' }}>
                  €{quickViewProduct.originalPrice?.toFixed(2)}
                </span>
              )}
            </div>
            
            {quickViewProduct.stockStatus === 'instock' ? (
              <span className="badge-premium-status instock" style={{ marginLeft: 'auto' }}>Dostupno</span>
            ) : (
              <span className="badge-premium-status outofstock" style={{ marginLeft: 'auto' }}>Po narudžbi</span>
            )}
          </div>

          <p style={{ fontSize: '14px', color: 'var(--color-neutral-slate)', lineHeight: '1.6', marginBottom: '20px' }}>
            {quickViewProduct.description}
          </p>

          {/* Specs details grid */}
          <div className="specs-premium-grid">
            {Object.entries(quickViewProduct.specifications).slice(0, 4).map(([key, value]) => (
              <div key={key} className="spec-premium-card">
                <span className="spec-premium-label">{key}</span>
                <span className="spec-premium-value">{value}</span>
              </div>
            ))}
          </div>

          {quickViewProduct.specNotice && (
            <p style={{ fontSize: '12px', color: 'red', fontWeight: 500, marginBottom: '16px' }}>{quickViewProduct.specNotice}</p>
          )}

          {/* Add-to-cart Controls */}
          {quickViewProduct.stockStatus !== 'outofstock' && (
            <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
              
              {/* Quantity Selector */}
              <div className="qty-stepper-premium">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Smanji količinu"
                >
                  -
                </button>
                <div className="qty-val">
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
                className="btn-cart-premium"
                style={{ flexGrow: 1 }}
              >
                {isAdding ? (
                  'Dodavanje...'
                ) : (
                  <>
                    <ShoppingBag size={18} /> Dodaj u košaricu
                  </>
                )}
              </button>

              {/* Favorite */}
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                aria-label="Popis želja"
                className={`btn-wishlist-premium ${isFavorited ? 'favorited' : ''}`}
              >
                <Heart size={20} fill={isFavorited ? 'var(--color-accent)' : 'none'} stroke={isFavorited ? 'var(--color-accent)' : 'currentColor'} />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

