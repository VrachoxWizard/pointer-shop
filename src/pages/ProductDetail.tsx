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
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'delivery'>('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

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
          background: 'white',
          border: '1px solid var(--color-neutral-border)',
          borderRadius: 'var(--radius-full)',
          padding: '8px 16px',
          cursor: 'pointer',
          color: 'var(--color-neutral-dark)',
          fontWeight: '700',
          fontSize: '13px',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all var(--transition-fast)'
        }}
        onMouseEnter={(e)=>{
          e.currentTarget.style.borderColor='var(--color-accent)';
          e.currentTarget.style.color='var(--color-accent)';
          const svg = e.currentTarget.querySelector('svg');
          if (svg) svg.style.transform = 'translateX(-4px)';
        }}
        onMouseLeave={(e)=>{
          e.currentTarget.style.borderColor='var(--color-neutral-border)';
          e.currentTarget.style.color='var(--color-neutral-dark)';
          const svg = e.currentTarget.querySelector('svg');
          if (svg) svg.style.transform = 'translateX(0)';
        }}
      >
        <ArrowLeft size={14} style={{ transition: 'transform var(--transition-fast)' }} /> Povratak u Katalog
      </button>

      {/* Main Details Grid */}
      <div className="product-detail-flex product-detail-layout">
        
        {/* Left Column: Gallery */}
        <div className="detail-gallery-container detail-gallery-col">
          <div 
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => { setIsZoomed(false); setZoomPos({ x: 50, y: 50 }); }}
            onMouseMove={handleMouseMove}
            style={{ 
              backgroundColor: 'white', 
              border: '1px solid var(--color-border)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '40px 24px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '420px', 
              marginBottom: '20px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'zoom-in',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <img 
              src={product.images[selectedImageIndex]} 
              alt={product.name} 
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

          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  style={{
                    width: '80px',
                    height: '80px',
                    border: index === selectedImageIndex ? '2px solid var(--color-accent)' : '1px solid var(--color-neutral-border)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    background: 'white',
                    padding: '4px',
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

        {/* Right Column: Info Details */}
        <div className="detail-info-container detail-info-col">
          <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-neutral-muted)', fontWeight: 800, letterSpacing: '0.07em', display: 'block', marginBottom: '6px' }}>
            {product.brand}
          </span>
          
          <h1 style={{ fontSize: '32px', color: 'var(--color-neutral-dark)', lineHeight: '1.2', marginBottom: '8px', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
            {product.name}
          </h1>

          {/* Social Proof Rating */}
          <div className="premium-rating-container">
            <div className="premium-stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ fontSize: '14px' }}>★</span>
              ))}
            </div>
            <span className="premium-rating-text">4.8 (42 recenzije)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-primary)' }}>
                €{product.price.toFixed(2)}
              </span>
              {hasSale && (
                <span style={{ fontSize: '16px', color: 'var(--color-neutral-muted)', textDecoration: 'line-through' }}>
                  €{product.originalPrice?.toFixed(2)}
                </span>
              )}
            </div>
            
            {product.stockStatus === 'instock' ? (
              <span className="badge-premium-status instock" style={{ marginLeft: '12px' }}>Dostupno</span>
            ) : (
              <span className="badge-premium-status outofstock" style={{ marginLeft: '12px' }}>Nedostupno</span>
            )}
            
            <div style={{ marginLeft: 'auto', fontSize: '13px', color: 'var(--color-neutral-muted)' }}>
              SKU: <strong style={{ color: 'var(--color-neutral-dark)' }}>{product.sku}</strong>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: 'var(--color-neutral-slate)', lineHeight: '1.7', marginBottom: '24px' }}>
            {product.description}
          </p>

          {/* Add-to-cart area */}
          {product.stockStatus !== 'outofstock' ? (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
              {/* Qty Selector */}
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

              {/* Add Button */}
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="btn-cart-premium"
                style={{ flexGrow: 1 }}
              >
                {isAdding ? 'Dodavanje...' : 'Dodaj u košaricu'}
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Dodaj u listu želja"
                className={`btn-wishlist-premium ${isFavorited ? 'favorited' : ''}`}
              >
                <Heart size={22} fill={isFavorited ? 'var(--color-accent)' : 'none'} stroke={isFavorited ? 'var(--color-accent)' : 'currentColor'} />
              </button>
            </div>
          ) : (
            <div className="badge-premium-status outofstock" style={{ display: 'flex', padding: '16px', width: '100%', borderRadius: 'var(--radius-md)', fontWeight: 700, marginBottom: '32px', fontSize: '14px', justifyContent: 'center' }}>
              Trenutno nedostupno na skladištu
            </div>
          )}

          {/* Lovačke Ponude USP */}
          <div className="usp-grid-premium">
            <div className="usp-card-item">
              <div className="usp-card-icon-wrap">
                <Truck size={18} />
              </div>
              <div className="usp-card-content">
                <span className="usp-card-title">Brza i besplatna dostava</span>
                <span className="usp-card-desc">Besplatno za sve narudžbe iznad 150 € (Dostava unutar 3-5 radnih dana)</span>
              </div>
            </div>
            <div className="usp-card-item">
              <div className="usp-card-icon-wrap">
                <Shield size={18} />
              </div>
              <div className="usp-card-content">
                <span className="usp-card-title">100% Sigurna kupnja</span>
                <span className="usp-card-desc">Jamstvo povrata novca unutar 14 dana i sigurna naplata</span>
              </div>
            </div>
            <div className="usp-card-item">
              <div className="usp-card-icon-wrap">
                <Calendar size={18} />
              </div>
              <div className="usp-card-content">
                <span className="usp-card-title">Osobno preuzimanje</span>
                <span className="usp-card-desc">Preuzmite narudžbu osobno u našoj trgovini (Koledinečka 1a, Zagreb)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Detailed Specifications and Switchable Tabs Section */}
      <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '40px', marginBottom: '60px' }}>
        
        {/* Tab triggers */}
        <div className="tabs-container-premium">
          <button 
            className={`tab-btn-premium ${activeTab === 'description' ? 'active' : ''}`} 
            onClick={() => setActiveTab('description')}
          >
            OPIS PROIZVODA
          </button>
          <button 
            className={`tab-btn-premium ${activeTab === 'specifications' ? 'active' : ''}`} 
            onClick={() => setActiveTab('specifications')}
          >
            TEHNIČKE SPECIFIKACIJE
          </button>
          <button 
            className={`tab-btn-premium ${activeTab === 'delivery' ? 'active' : ''}`} 
            onClick={() => setActiveTab('delivery')}
          >
            DOSTAVA I POVRAT
          </button>
        </div>

        {/* Tab panels */}
        {activeTab === 'description' && (
          <div className="tab-panel-premium">
            <p style={{ fontSize: '15px', color: 'var(--color-neutral-slate)', lineHeight: '1.85', marginBottom: '16px' }}>
              {product.description}
            </p>
            <p style={{ fontSize: '14px', color: 'var(--color-neutral-muted)', lineHeight: '1.7' }}>
              Ovaj vrhunski proizvod dio je našeg pažljivo odabranog lovačkog i streljačkog asortimana. Testiran u zahtjevnim uvjetima i prilagođen profesionalcima i entuzijastima koji traže vrhunsku kvalitetu, ergonomiju i neprikosnovenu pouzdanost.
            </p>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="tab-panel-premium">
            <div className="specs-premium-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="spec-premium-card" style={{ padding: '16px 20px' }}>
                  <span className="spec-premium-label" style={{ fontSize: '11px' }}>{key}</span>
                  <span className="spec-premium-value" style={{ fontSize: '15px' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="tab-panel-premium">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div style={{ backgroundColor: '#F8F9F5', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-border)' }}>
                <strong style={{ color: 'var(--color-primary)', display: 'block', fontSize: '16px', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>Brza Dostava</strong>
                <p style={{ fontSize: '13.5px', color: 'var(--color-neutral-slate)', lineHeight: '1.7' }}>
                  Besplatna dostava za sve narudžbe iznad 150 € unutar cijele Hrvatske. Za narudžbe manje vrijednosti dostava se naplaćuje 7,00 €. Isporuka se vrši u roku od 3-5 radnih dana putem ovlaštene kurirske službe.
                </p>
              </div>
              <div style={{ backgroundColor: '#F8F9F5', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-border)' }}>
                <strong style={{ color: 'var(--color-primary)', display: 'block', fontSize: '16px', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>Jamstvo Povrata i Kvalitete</strong>
                <p style={{ fontSize: '13.5px', color: 'var(--color-neutral-slate)', lineHeight: '1.7' }}>
                  Kupujte bez rizika s našim 14-dnevnim pravom na jednostrani raskid ugovora. Ako niste potpuno zadovoljni proizvodom, vratite ga u originalnoj ambalaži za puni povrat novca. Jamstvo na sve tehničke komponente iznosi 24 mjeseca.
                </p>
              </div>
            </div>
          </div>
        )}

      </section>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '48px', marginTop: '48px' }}>
          <div style={{ marginBottom: '28px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 800, letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>
              Možda će vam se svidjeti
            </span>
            <h2 style={{ fontSize: '26px', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
              Slični Proizvodi
            </h2>
          </div>
          <div className="grid-cols-4">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}



    </div>
  );
};
