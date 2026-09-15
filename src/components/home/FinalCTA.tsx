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
    <section className="py-32 md:py-48 px-6 md:px-12 lg:px-16 bg-[#000c22] relative overflow-hidden text-center">
      {/* Expansive Ambient Field */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-[#F5C400]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#001840] border border-[rgba(255,253,240,0.12)] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#F5C400] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400]">
            The Conversion Engine
          </span>
        </motion.div>

        {/* Major Visual Release Headline with Masked Line Reveal */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#FFFDF0] tracking-tight leading-[0.95] mb-8">
          <MaskedLine delay={0.05}>
            <span>Ready to make your</span>
          </MaskedLine>
          <MaskedLine delay={0.18}>
            <span>creators <span className="text-[#F5C400]">sell?</span></span>
          </MaskedLine>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-lg md:text-xl text-[#cbd5e1] max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
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
              className="text-base px-8 py-4 shadow-xl shadow-[#F5C400]/20 group"
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
              className="text-base px-8 py-4 border-[rgba(255,253,240,0.18)] hover:border-[#FFFDF0]"
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
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-8 border-t border-[rgba(255,253,240,0.08)] text-xs font-mono text-[#798fae]"
        >
          {trustPoints.map((point) => (
            <span key={point} className="px-3 py-1.5 rounded-full bg-[#001840]/40 border border-white/5">
              {point}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
