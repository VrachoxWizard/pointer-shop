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
              cursor: 'zoom-in'
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
        <div className="detail-info-container detail-info-col">
          <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-neutral-muted)', fontWeight: 800, letterSpacing: '0.07em', display: 'block', marginBottom: '8px' }}>
            {product.brand}
          </span>
          <h1 style={{ fontSize: '32px', color: 'var(--color-neutral-dark)', lineHeight: '1.2', marginBottom: '16px' }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary)' }}>
                €{product.price.toFixed(2)}
              </span>
              {hasSale && (
                <span style={{ fontSize: '16px', color: 'var(--color-neutral-muted)', textDecoration: 'line-through' }}>
                  €{product.originalPrice?.toFixed(2)}
                </span>
              )}
            </div>
            
            <div style={{ marginLeft: 'auto', fontSize: '13px', color: 'var(--color-neutral-muted)' }}>
              SKU: <strong style={{ color: 'var(--color-neutral-dark)' }}>{product.sku}</strong>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: 'var(--color-neutral-slate)', lineHeight: '1.7', marginBottom: '24px' }}>
            {product.description}
          </p>

          {/* Add-to-Cart area */}
          {product.stockStatus !== 'outofstock' ? (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
              {/* Qty Selector */}
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
                aria-label="Dodaj u listu želja"
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '24px', fontSize: '13px', color: 'var(--color-neutral-dark)' }}>
            <div className="usp-item-row">
              <Truck size={18} style={{ color: 'var(--color-accent)' }} />
              <span>Besplatna dostava iznad 150 € (Dostava unutar 3-5 radnih dana)</span>
            </div>
            <div className="usp-item-row">
              <Shield size={18} style={{ color: 'var(--color-accent)' }} />
              <span>100% Sigurna kupnja s jamstvom povrata novca unutar 14 dana</span>
            </div>
            <div className="usp-item-row">
              <Calendar size={18} style={{ color: 'var(--color-accent)' }} />
              <span>Preuzimanje moguće u trgovini (Koledinečka 1a, Zagreb)</span>
            </div>
          </div>

        </div>

      </div>

      {/* Detailed Specifications and Switchable Tabs Section */}
      <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '40px', marginBottom: '60px' }}>
        
        {/* Tab triggers */}
        <div className="tabs-navigation-strip">
          <button 
            className={`tab-trigger-btn ${activeTab === 'description' ? 'active' : ''}`} 
            onClick={() => setActiveTab('description')}
          >
            OPIS
          </button>
          <button 
            className={`tab-trigger-btn ${activeTab === 'specifications' ? 'active' : ''}`} 
            onClick={() => setActiveTab('specifications')}
          >
            SPECIFIKACIJE
          </button>
          <button 
            className={`tab-trigger-btn ${activeTab === 'delivery' ? 'active' : ''}`} 
            onClick={() => setActiveTab('delivery')}
          >
            DOSTAVA & JAMSTVO
          </button>
        </div>

        {/* Tab panels */}
        <div className={`tab-panel ${activeTab === 'description' ? 'active' : ''}`}>
          <p style={{ fontSize: '15px', color: 'var(--color-neutral-slate)', lineHeight: '1.8' }}>
            {product.description}
          </p>
          <p style={{ fontSize: '14px', marginTop: '16px', color: 'var(--color-neutral-muted)', lineHeight: '1.7' }}>
            Ovaj vrhunski proizvod dio je našeg pažljivo odabranog lovačkog i streljačkog asortimana. Testiran u zahtjevnim uvjetima i prilagođen profesionalcima i entuzijastima koji traže vrhunsku kvalitetu, ergonomiju i neprikosnovenu pouzdanost.
          </p>
        </div>

        <div className={`tab-panel ${activeTab === 'specifications' ? 'active' : ''}`}>
          <table className="specs-table-striped" style={{ maxWidth: '600px' }}>
            <tbody>
              {Object.entries(product.specifications).map(([key, value]) => (
                <tr key={key}>
                  <td className="specs-label" style={{ width: '40%', color: 'var(--color-neutral-muted)', fontWeight: 500 }}>{key}</td>
                  <td className="specs-value" style={{ width: '60%', fontWeight: 600, color: 'var(--color-neutral-dark)' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`tab-panel ${activeTab === 'delivery' ? 'active' : ''}`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', lineHeight: '1.8', color: 'var(--color-neutral-slate)' }}>
            <div>
              <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>Brza Dostava</strong>
              Besplatna dostava za sve narudžbe iznad 150 € unutar cijele Hrvatske. Za narudžbe manje vrijednosti dostava se naplaćuje 7,00 €. Isporuka se vrši u roku od 3-5 radnih dana putem ovlaštene kurirske službe.
            </div>
            <div>
              <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>Jamstvo Povrata i Kvalitete</strong>
              Kupujte bez rizika s našim 14-dnevnim pravom na jednostrani raskid ugovora. Ako niste potpuno zadovoljni proizvodom, vratite ga u originalnoj ambalaži za puni povrat novca. Jamstvo na sve tehničke komponente iznosi 24 mjeseca.
            </div>
          </div>
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
