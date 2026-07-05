import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, openQuickView } = useShop();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !rectRef.current) return;
    const { left, top, width, height } = rectRef.current;
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    
    const rotateX = y * -6;
    const rotateY = x * 6;
    
    requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
        cardRef.current.style.zIndex = '2';
      }
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rectRef.current = null;
    requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        cardRef.current.style.zIndex = '1';
      }
    });
  };

  const isFavorited = wishlist.includes(product.id);
  const hasSale = product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    await addToCart(product.id, 1);
    setIsAdding(false);
  };

  const primaryImage = product.images[0];
  const hoverImage = product.images.length > 1 ? product.images[1] : product.images[0];

  return (
    <div 
      ref={cardRef}
      className="product-card-wrap animate-fade-in"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Badges Overlay */}
      <div className="card-badges-container">
        {product.isNew && (
          <span className="badge badge-new animated-badge">Novo</span>
        )}
        {hasSale && (
          <span className="badge badge-sale animated-badge">Akcija</span>
        )}
        {product.stockStatus === 'onbackorder' && (
          <span className="badge badge-backorder animated-badge">Po narudžbi</span>
        )}
      </div>

      {/* Wishlist Overlay Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label={isFavorited ? "Ukloni iz popisa želja" : "Dodaj u popis želja"}
        className="card-wishlist-btn"
      >
        <Heart 
          size={18} 
          fill={isFavorited ? 'var(--color-accent)' : 'none'} 
          stroke={isFavorited ? 'var(--color-accent)' : 'var(--color-primary)'} 
        />
      </button>

      {/* Image Gallery Wrap */}
      <div 
        className="card-image-gallery-wrapper"
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <img 
          src={hovered ? hoverImage : primaryImage} 
          alt={product.name}
          loading="lazy"
        />
        
        {/* Quick View Hover Button */}
        {hovered && (
          <button 
            type="button"
            className="card-quick-view-btn animate-fade-in"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigating to detail page
              openQuickView(product);
            }}
          >
            <Eye size={14} /> Brzi Pregled
          </button>
        )}
      </div>

      {/* Info Section */}
      <div className="card-info-section">
        <span className="card-brand-label">
          {product.brand}
        </span>
        
        <h3 
          onClick={() => navigate(`/product/${product.id}`)}
          className="card-title-heading"
          style={{ cursor: 'pointer' }}
        >
          {product.name}
        </h3>

        {/* Pricing Info */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: 'auto' }}>
          <span className="card-price-display">
            €{product.price.toFixed(2)}
          </span>
          {hasSale && (
            <span className="card-price-original">
              €{product.originalPrice?.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Footer Add-To-Cart Action */}
      <div className="card-action-container">
        <button
          onClick={handleAddToCart}
          className="card-add-to-cart-btn"
          disabled={isAdding || product.stockStatus === 'outofstock'}
        >
          {product.stockStatus === 'outofstock' ? (
            'Nije dostupno'
          ) : isAdding ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="spinner" style={{ width: '12px', height: '12px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }}></span>
              Dodavanje...
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShoppingCart size={15} /> Dodaj u košaricu
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
