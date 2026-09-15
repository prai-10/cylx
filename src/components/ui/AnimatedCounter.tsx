'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1.6,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReduced = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<string>(prefersReduced ? value : '0');

  useEffect(() => {
    if (!isInView || prefersReduced) {
      if (prefersReduced) setDisplayValue(value);
      return;
    }

    // Match prefix, numeric portion (including decimals), and suffix
    // Examples: '50+' -> prefix '', num 50, suffix '+'
    // '₹40Cr+' -> prefix '₹', num 40, suffix 'Cr+'
    // '3.4x' -> prefix '', num 3.4, suffix 'x'
    const match = value.match(/^([^\d.]*)([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || '';
    const hasDecimals = match[2].includes('.');
    const decimalPlaces = hasDecimals ? (match[2].split('.')[1]?.length || 1) : 0;

    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = targetNum * easeProgress;

      const formatted = hasDecimals
        ? currentVal.toFixed(decimalPlaces)
        : Math.round(currentVal).toString();

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(value);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [isInView, value, duration, prefersReduced]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
};
