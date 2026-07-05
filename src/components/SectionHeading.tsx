import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SectionHeadingProps {
  /** Small uppercase kicker rendered above the title */
  eyebrow?: string;
  title: string;
  /** Optional icon rendered before the title text */
  icon?: React.ReactNode;
  /** Right-aligned action link (e.g. "Pregledaj Sve") */
  actionLabel?: string;
  onAction?: () => void;
  centered?: boolean;
}

/**
 * Shared section header — keeps eyebrow/title/action rhythm identical
 * across all home page (and future) sections.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  icon,
  actionLabel,
  onAction,
  centered = false,
}) => (
  <div className={`section-heading${centered ? ' centered' : ''}`}>
    <div className="section-heading-text">
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="section-title">
        {icon}
        {title}
      </h2>
    </div>
    {actionLabel && (
      <button type="button" className="section-action" onClick={onAction}>
        {actionLabel} <ArrowRight size={14} aria-hidden="true" />
      </button>
    )}
  </div>
);
