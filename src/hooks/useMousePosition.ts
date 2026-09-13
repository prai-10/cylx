"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { lerp } from "@/lib/utils";

interface MousePosition {
  /** Smoothed X: -1 (left) to 1 (right) */
  x: number;
  /** Smoothed Y: -1 (bottom) to 1 (top) — Three.js convention */
  y: number;
  /** Raw (un-smoothed) normalized values */
  raw: { x: number; y: number };
}

/**
 * Tracks normalized mouse position with lerped smoothing.
 * Returns values in [-1, 1] range suitable for Three.js.
 */
export function useMousePosition(smoothFactor = 0.08): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    raw: { x: 0, y: 0 },
  });

  const rawRef = useRef({ x: 0, y: 0 });
  const smoothedRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    rawRef.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -((e.clientY / window.innerHeight) * 2 - 1),
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const tick = () => {
      smoothedRef.current.x = lerp(
        smoothedRef.current.x,
        rawRef.current.x,
        smoothFactor
      );
      smoothedRef.current.y = lerp(
        smoothedRef.current.y,
        rawRef.current.y,
        smoothFactor
      );

      setPosition({
        x: smoothedRef.current.x,
        y: smoothedRef.current.y,
        raw: { ...rawRef.current },
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [smoothFactor, handleMouseMove]);

  return position;
}
