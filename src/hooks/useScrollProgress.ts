"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Returns a 0→1 scroll progress value for a given element.
 * 0 = element just entered viewport, 1 = element has left viewport.
 */
export function useScrollProgress(
  options?: {
    start?: string;
    end?: string;
  }
) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: options?.start ?? "top bottom",
      end: options?.end ?? "bottom top",
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [options?.start, options?.end]);

  return { ref, progress };
}
