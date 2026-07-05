import React from 'react';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumbs }) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Render breadcrumbs if provided */}
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
      
      {/* Shared Page Hero Header layout */}
      <div className="page-hero">
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: subtitle ? '10px' : '0' }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14.5px', maxWidth: '600px', margin: '0 auto' }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
