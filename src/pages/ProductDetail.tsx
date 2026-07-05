import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowLeft, Shield, Truck, Calendar } from 'lucide-react';

interface ProductDetailProps {
  productId: string;
  onNavigate: (route: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onNavigate }) => {
  const { products, addToCart, wishlist, toggleWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const product = products.find(p => p.id === productId) || products[0];

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Proizvod nije pronađen.</h2>
        <button onClick={() => onNavigate('shop')} className="btn-primary" style={{ marginTop: '20px' }}>Povratak u trgovinu</button>
      </div>
    );
  }

  const isFavorited = wishlist.includes(product.id);
  const hasSale = product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(product.id, quantity);
    setIsAdding(false);
  };

  // Find related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      
      {/* React 19 Native Document Metadata */}
      <title>{`POINTER | ${product.name}`}</title>
      <meta name="description" content={product.description} />

      {/* Back Button */}
      <button 
        onClick={() => onNavigate('shop')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--color-primary)',
          fontWeight: 'bold',
          fontSize: '14px',
          marginBottom: '32px'
        }}
        onMouseEnter={(e)=>e.currentTarget.style.color='var(--color-accent)'}
        onMouseLeave={(e)=>e.currentTarget.style.color='var(--color-primary)'}
      >
        <ArrowLeft size={16}/> Povratak u Katalog
      </button>

      {/* Main Details Grid */}
      <div style={{ display: 'flex', gap: '50px', marginBottom: '60px' }} className="product-detail-layout">
        
        {/* Left Column: Gallery */}
        <div style={{ width: '50%' }} className="detail-gallery-col">
          <div 
            style={{ 
              backgroundColor: 'white', 
              border: '1px solid var(--color-border)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '40px 24px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '420px', 
              marginBottom: '20px' 
            }}
          >
            <img 
              src={product.images[selectedImageIndex]} 
              alt={product.name} 
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            />
          </div>

          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  style={{
                    width: '80px',
                    height: '80px',
                    border: index === selectedImageIndex ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    background: 'white',
                    padding: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Info Details */}
        <div style={{ width: '50%' }} className="detail-info-col">
          <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 800, letterSpacing: '0.07em', display: 'block', marginBottom: '8px' }}>
            {product.brand}
          </span>
          <h1 style={{ fontSize: '32px', color: 'var(--color-text-main)', lineHeight: '1.2', marginBottom: '16px' }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary)' }}>
                €{product.price.toFixed(2)}
              </span>
              {hasSale && (
                <span style={{ fontSize: '16px', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                  €{product.originalPrice?.toFixed(2)}
                </span>
              )}
            </div>
            
            <div style={{ marginLeft: 'auto', fontSize: '13px', color: 'var(--color-text-muted)' }}>
              SKU: <strong style={{ color: 'var(--color-text-main)' }}>{product.sku}</strong>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
            {product.description}
          </p>

          {/* Add-to-Cart area */}
          {product.stockStatus !== 'outofstock' ? (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
              {/* Qty Selector */}
              <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', height: '48px', backgroundColor: 'white' }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '40px', height: '100%', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  -
                </button>
                <div style={{ width: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 600 }}>
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '40px', height: '100%', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  +
                </button>
              </div>

              {/* Add Button */}
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="btn-primary"
                style={{ flexGrow: 1, height: '48px' }}
              >
                {isAdding ? 'Dodavanje u košaricu...' : 'Dodaj u košaricu'}
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  height: '48px',
                  width: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  background: 'white'
                }}
              >
                <Heart size={22} fill={isFavorited ? 'var(--color-accent)' : 'none'} stroke={isFavorited ? 'var(--color-accent)' : 'currentColor'} />
              </button>
            </div>
          ) : (
            <div style={{ padding: '16px', backgroundColor: '#FDECEA', color: '#B71C1C', borderRadius: 'var(--radius-md)', fontWeight: 600, marginBottom: '32px', fontSize: '14px' }}>
              Trenutno nedostupno na skladištu.
            </div>
          )}

          {/* Lovačke Ponude USP */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '24px', fontSize: '13px', color: 'var(--color-text-main)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Truck size={18} style={{ color: 'var(--color-accent)' }} />
              <span>Besplatna dostava iznad 150 € (Dostava unutar 3-5 radnih dana)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Shield size={18} style={{ color: 'var(--color-accent)' }} />
              <span>100% Sigurna kupnja s jamstvom povrata novca unutar 14 dana</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={18} style={{ color: 'var(--color-accent)' }} />
              <span>Preuzimanje moguće u trgovini (Koledinečka 1a, Zagreb)</span>
            </div>
          </div>

        </div>

      </div>

      {/* Detailed Specifications and Details Section */}
      <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '40px', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '20px' }}>TEHNIČKI DETALJI</h2>
        
        <div className="specs-table" style={{ maxWidth: '600px' }}>
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="specs-row">
              <span className="specs-label">{key}</span>
              <span className="specs-value">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '40px' }}>
          <h2 style={{ fontSize: '22px', color: 'var(--color-primary)', marginBottom: '24px' }}>SLIČNI PROIZVODI</h2>
          <div className="grid-cols-4">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Local responsive details */}
      <style>{`
        @media (max-width: 768px) {
          .product-detail-layout {
            flex-direction: column !important;
            gap: 30px !important;
          }
          .detail-gallery-col, .detail-info-col {
            width: 100% !important;
          }
        }
      `}</style>

    </div>
  );
};
