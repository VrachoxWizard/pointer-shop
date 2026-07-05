import React, { useEffect, useState, useRef } from 'react';

export const Cursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      }
      // Reveal cursor on first move if hidden
      setIsHidden(false);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const tagName = target.tagName.toLowerCase();
      // Fast path tag/class check
      if (
        tagName === 'a' ||
        tagName === 'button' ||
        tagName === 'input' ||
        tagName === 'select' ||
        tagName === 'textarea' ||
        target.role === 'button' ||
        target.classList.contains('btn') ||
        target.classList.contains('clickable') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsPointer(true);
        return;
      }
      
      // Fallback only if tag check fails
      try {
        const computedCursor = window.getComputedStyle(target).cursor;
        if (computedCursor === 'pointer') {
          setIsPointer(true);
          return;
        }
      } catch (err) {
        // Fallback
      }
      setIsPointer(false);
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
  }, []);

  if (window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={outerRef}
        className="custom-cursor-outer"
        style={{
          width: isPointer ? '48px' : '32px',
          height: isPointer ? '48px' : '32px',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, opacity 0.25s ease',
          backgroundColor: isPointer ? 'rgba(250, 249, 246, 0.1)' : 'transparent',
          backdropFilter: isPointer ? 'blur(2px)' : 'none',
          opacity: isHidden ? 0 : 1
        }}
      />
      {/* Inner Dot */}
      <div
        ref={innerRef}
        className="custom-cursor-inner"
        style={{
          width: '6px',
          height: '6px',
          opacity: isHidden ? 0 : 1,
          transition: 'opacity 0.25s ease'
        }}
      />
    </>
  );
};
