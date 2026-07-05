import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  route?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px', 
        fontSize: '13px', 
        color: 'var(--color-neutral-muted)', 
        fontWeight: 500,
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}
    >
      <Link 
        to="/" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px', 
          color: 'inherit',
          transition: 'color var(--transition-fast)'
        }}
        className="hover-accent"
      >
        <Home size={14} />
        <span>Početna</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight size={14} style={{ opacity: 0.5, flexShrink: 0 }} />
            {isLast || !item.route ? (
              <span 
                style={{ 
                  color: 'var(--color-neutral-dark)', 
                  fontWeight: 600,
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  maxWidth: '200px'
                }}
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.route} 
                style={{ color: 'inherit', transition: 'color var(--transition-fast)' }}
                className="hover-accent"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
