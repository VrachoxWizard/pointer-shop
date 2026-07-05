import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}) => {
  return (
    <div className="no-results-panel animate-fade-in" style={{ padding: '60px 20px', maxWidth: '500px', margin: '40px auto' }}>
      <div 
        style={{ 
          color: 'var(--color-neutral-muted)', 
          marginBottom: '18px', 
          display: 'flex', 
          justifyContent: 'center',
          opacity: 0.8
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--color-neutral-dark)' }}>
        {title}
      </h3>
      <p style={{ fontSize: '13.5px', color: 'var(--color-neutral-muted)', lineHeight: '1.6', marginBottom: actionLabel ? '24px' : '0' }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn-secondary" style={{ fontSize: '13px', padding: '10px 20px' }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
