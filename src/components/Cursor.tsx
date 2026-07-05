import React, { useEffect, useState } from 'react';

export const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (isHidden) setIsHidden(false);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isHidden]);

  if (isHidden || window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isPointer ? '48px' : '32px',
          height: isPointer ? '48px' : '32px',
          border: '1px solid var(--color-primary)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: `translate(calc(${position.x}px - 50%), calc(${position.y}px - 50%))`,
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
          zIndex: 999999,
          mixBlendMode: 'difference',
          backgroundColor: isPointer ? 'rgba(250, 249, 246, 0.1)' : 'transparent',
          backdropFilter: isPointer ? 'blur(2px)' : 'none'
        }}
      />
      {/* Inner Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: 'var(--color-accent)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: `translate(calc(${position.x}px - 50%), calc(${position.y}px - 50%))`,
          zIndex: 999999,
          mixBlendMode: 'difference'
        }}
      />
    </>
  );
};
