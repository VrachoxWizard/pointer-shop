import React, { useState } from 'react';
import { Product } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, openQuickView } = useShop();
  const [hovered, setHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const isFavorited = wishlist.includes(product.id);
  const hasSale = product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    await addToCart(product.id, 1);
    setIsAdding(false);
  };

  // Double-image resolution
  const primaryImage = product.images[0];
  const hoverImage = product.images.length > 1 ? product.images[1] : product.images[0];

  return (
    <div 
      className="product-card animate-fade-in"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        padding: '16px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: hovered ? 'translateY(-4px)' : 'none'
      }}
    >
      {/* Badges Overlay */}
      <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {product.isNew && (
          <span className="badge badge-new">Novo</span>
        )}
        {hasSale && (
          <span className="badge badge-sale">Akcija</span>
        )}
        {product.stockStatus === 'onbackorder' && (
          <span className="badge badge-backorder">Po narudžbi</span>
        )}
      </div>

      {/* Wishlist Overlay Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
          transition: 'var(--transition-fast)'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; e.currentTarget.style.transform = 'none'; }}
      >
        <Heart 
          size={18} 
          fill={isFavorited ? 'var(--color-accent)' : 'none'} 
          stroke={isFavorited ? 'var(--color-accent)' : 'var(--color-primary)'} 
        />
      </button>

      {/* Image Gallery Wrap */}
      <div 
        style={{ 
          height: '200px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '16px',
          cursor: 'pointer'
        }}
        onClick={() => openQuickView(product)}
      >
        <img 
          src={hovered ? hoverImage : primaryImage} 
          alt={product.name}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            transition: 'transform var(--transition-slow)',
            transform: hovered ? 'scale(1.05)' : 'none'
          }}
        />
        
        {/* Quick View Hover Button */}
        {hovered && (
          <div 
            className="animate-fade-in"
            style={{
              position: 'absolute',
              bottom: '8px',
              backgroundColor: 'rgba(67, 73, 34, 0.95)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Eye size={14} /> Brzi Pregled
          </div>
        )}
      </div>

      {/* Info Info Section */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>
          {product.brand}
        </span>
        
        <h3 
          onClick={() => openQuickView(product)}
          style={{ 
            fontSize: '15px', 
            fontWeight: 600, 
            color: 'var(--color-text-main)', 
            cursor: 'pointer',
            height: '44px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.4'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-main)'}
        >
          {product.name}
        </h3>

        {/* Pricing Info */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: 'auto' }}>
          <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)' }}>
            €{product.price.toFixed(2)}
          </span>
          {hasSale && (
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
              €{product.originalPrice?.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Footer Add-To-Cart Action */}
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <button
          onClick={handleAddToCart}
          className="btn-primary"
          style={{ 
            width: '100%', 
            padding: '10px 16px', 
            fontSize: '13px',
            backgroundColor: product.stockStatus === 'outofstock' ? 'var(--color-border)' : 'var(--color-accent)',
            boxShadow: product.stockStatus === 'outofstock' ? 'none' : '0 4px 10px rgba(255, 125, 4, 0.2)'
          }}
          disabled={isAdding || product.stockStatus === 'outofstock'}
        >
          {product.stockStatus === 'outofstock' ? (
            'Nije dostupno'
          ) : isAdding ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="spinner" style={{ width: '12px', height: '12px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
              Dodavanje...
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShoppingCart size={15} /> Dodaj u košaricu
            </span>
          )}
        </button>
      </div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
