'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { MaskedLine } from '@/components/ui/StaggerReveal';

export const FinalCTA: React.FC = () => {
  const trustPoints = [
    '⚡ 48h Sprint Readiness',
    '🔒 100% IP Whitelisting Rights',
    '🎯 Direct Founder & Media Buyer Access',
    '📈 Unit-Economics & CPA Governed',
  ];

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 lg:px-16 bg-white relative overflow-hidden text-center">
      {/* Expansive Ambient Field */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-[#4A8FE7]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F5F9] border border-[#0017B2]/15 mb-8 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#0017B2] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#0017B2] font-bold">
            The Conversion Engine
          </span>
        </motion.div>

        {/* Major Visual Release Headline with Masked Line Reveal */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#000000] tracking-tight leading-[0.95] mb-8">
          <MaskedLine delay={0.05}>
            <span>Ready to make your</span>
          </MaskedLine>
          <MaskedLine delay={0.18}>
            <span>creators <span className="text-[#0017B2]">sell?</span></span>
          </MaskedLine>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-lg md:text-xl text-[#334155] max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
        >
          Book a direct growth call with our team. We will audit your current creative performance, benchmark your competitors, and outline a whitelisted creator roadmap.
        </motion.p>

        {/* Magnetic Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-5 mb-14"
        >
          <MagneticButton distance={0.2}>
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="text-base px-8 py-4 shadow-lg shadow-[#FCD21D]/30 group"
            >
              <span>Book a growth call</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Button>
          </MagneticButton>

          <MagneticButton distance={0.15}>
            <Button
              href="/portfolio"
              variant="outline"
              size="lg"
              className="text-base px-8 py-4 border-[#0017B2]/20 hover:border-[#0017B2] text-[#000000]"
            >
              <span>View Recent Work</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-1">↗</span>
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Agency Trust Matrix */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-8 border-t border-[#0017B2]/10 text-xs font-mono text-[#64748B]"
        >
          {trustPoints.map((point) => (
            <span key={point} className="px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#0017B2]/10">
              {point}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
