"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WORDS_LINE_1 = ["ATTENTION", "IS", "A", "CURRENCY."];
const WORDS_LINE_2 = ["WE", "HELP", "YOU", "EARN", "IT."];

export default function AttentionCurrency() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll(".ac-word");
      if (!words || words.length === 0) return;

      // Pin the section and reveal words on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: containerRef.current,
          scrub: 0.8,
        },
      });

      // Stagger each word from dim to bright
      words.forEach((word, i) => {
        tl.to(
          word,
          {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          i * 0.12
        );
      });

      // Hold at full brightness briefly
      tl.to({}, { duration: 0.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-bg)]"
      style={{ height: "300vh" }}
    >
      <div
        ref={containerRef}
        className="h-screen w-full flex items-center justify-center"
      >
        <div className="text-heading-1 text-center max-w-[60ch] px-6 md:px-10 select-none">
          {/* Line 1 */}
          <div className="mb-2 md:mb-4 flex flex-wrap justify-center gap-x-[0.35em]">
            {WORDS_LINE_1.map((word, i) => (
              <span
                key={`l1-${i}`}
                className="ac-word"
                style={{ opacity: prefersReduced ? 1 : 0.1 }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Line 2 */}
          <div className="flex flex-wrap justify-center gap-x-[0.35em]">
            {WORDS_LINE_2.map((word, i) => (
              <span
                key={`l2-${i}`}
                className="ac-word text-[#f8d613]"
                style={{ opacity: prefersReduced ? 1 : 0.1 }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Supporting philosophy copy */}
          <p
            className="ac-word text-sm md:text-base text-[#9aaecf] max-w-xl mx-auto mt-8 font-normal tracking-normal leading-relaxed"
            style={{ opacity: prefersReduced ? 1 : 0.1 }}
          >
            In a saturated feed, indifference is fatal. We combine internet-native culture, viral algorithmic mechanics, and cinematic craft to turn fragmented micro-moments into lasting cultural equity.
          </p>
        </div>
      </div>
    </section>
  );
}
