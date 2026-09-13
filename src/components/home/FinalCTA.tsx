'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 lg:px-16 bg-[#000c22] relative overflow-hidden text-center">
      {/* Expansive Ambient Field */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#F5C400]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-8">
          The Conversion Engine
        </span>

        {/* Major Visual Release Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#FFFDF0] tracking-tight leading-[0.95] mb-10">
          Ready to make your creators <span className="text-[#F5C400]">sell?</span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-[#cbd5e1] max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
          Book a direct growth call with our team. We will audit your current creative performance and outline a whitelisted creator roadmap.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <Button href="/contact" variant="primary" size="lg" className="text-base px-8 py-4 shadow-xl shadow-[#F5C400]/15">
            Start a project →
          </Button>
          <Button href="/portfolio" variant="outline" size="lg" className="text-base px-8 py-4 border-[rgba(255,253,240,0.15)] hover:border-[#FFFDF0]">
            View Recent Work
          </Button>
        </div>
      </div>
    </section>
  );
};
