import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="product-card-wrap" style={{ pointerEvents: 'none' }}>
      {/* Image Shape */}
      <div 
        className="shimmer-bg" 
        style={{ 
          height: '200px', 
          borderRadius: 'var(--radius-sm)', 
          marginBottom: '16px',
          width: '100%' 
        }} 
      />
      
      {/* Info Shapes */}
      <div className="card-info-section" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Brand */}
        <div className="shimmer-bg" style={{ height: '12px', width: '35%', borderRadius: '4px' }} />
        {/* Title */}
        <div className="shimmer-bg" style={{ height: '16px', width: '90%', borderRadius: '4px' }} />
        <div className="shimmer-bg" style={{ height: '16px', width: '60%', borderRadius: '4px', marginBottom: '8px' }} />
        
        {/* Price */}
        <div className="shimmer-bg" style={{ height: '22px', width: '45%', borderRadius: '4px', marginTop: 'auto' }} />
      </div>

      {/* Button Shape */}
      <div className="card-action-container" style={{ marginTop: '16px' }}>
        <div className="shimmer-bg" style={{ height: '40px', width: '100%', borderRadius: 'var(--radius-sm)' }} />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
