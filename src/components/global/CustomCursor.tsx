'use client';

import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined') return;
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    setIsTouch(false);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Direct immediate positioning for dot (ZERO lag)
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // High-responsiveness loop for outer ring (0.35 lerp for crisp follow without sluggish lag)
    const render = () => {
      ringX += (mouseX - ringX) * 0.35;
      ringY += (mouseY - ringY) * 0.35;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]');
      if (cursorAttr) {
        const type = cursorAttr.getAttribute('data-cursor');
        setCursorText(type ? type.toUpperCase() : null);
        setIsHovered(true);
        return;
      }

      const interactive = target.closest('a, button, input, textarea, select, [role="button"]');
      if (interactive) {
        setIsHovered(true);
        setCursorText(null);
      } else {
        setIsHovered(false);
        setCursorText(null);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#F5C400] will-change-transform"
      />

      {/* Responsive outer ring / badge */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full transition-all duration-150 will-change-transform ${
          cursorText
            ? '-ml-8 -mt-8 w-16 h-16 bg-[#F5C400] text-[#000c22] font-mono text-[10px] font-black tracking-widest'
            : isHovered
            ? '-ml-5 -mt-5 w-10 h-10 border border-[#F5C400]/80 bg-[#F5C400]/10 backdrop-blur-[2px]'
            : '-ml-3 -mt-3 w-6 h-6 border border-[#FFFDF0]/40'
        }`}
      >
        {cursorText && <span>{cursorText}</span>}
      </div>
    </div>
  );
};
