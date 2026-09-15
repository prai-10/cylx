'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const PerformanceProof: React.FC = () => {
  const prefersReduced = useReducedMotion();

  const metrics = [
    {
      num: '50+',
      label: 'brands scaled',
      detail: 'Consumer, e-commerce & high-growth brands accelerated.',
      tag: 'Scale Telemetry',
      index: '01',
    },
    {
      num: '₹40Cr+',
      label: 'ad spend managed',
      detail: 'Deployed across Meta, Google & TikTok growth campaigns.',
      tag: 'Verified Capital',
      index: '02',
    },
    {
      num: '3.4x',
      label: 'avg ROAS lift',
      detail: 'Driven by creator handle whitelisting vs generic brand ads.',
      tag: 'Performance Alpha',
      index: '03',
    },
    {
      num: '200+',
      label: 'creators in network',
      detail: 'Pre-vetted, category-matched & whitelisting-authorized.',
      tag: 'Creator Bench',
      index: '04',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="w-full bg-white border-y border-[#0017B2]/10 py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        {/* Section Header Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0017B2]/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0017B2]" />
              <span className="text-xs font-mono tracking-widest uppercase text-[#0017B2] font-bold">
                01 / Performance Verification
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#000000] tracking-tight">
              Evidence, not subjective opinions.
            </h2>
          </div>

          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F1F5F9] border border-[#0017B2]/15 text-xs font-mono text-[#334155] shrink-0 self-start sm:self-end">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Audited Telemetry · Meta &amp; Google</span>
          </div>
        </div>

        {/* Editorial Hairline Spatial Metric Blocks */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#0017B2]/10"
        >
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`flex flex-col justify-between group transition-all duration-300 ${
                idx > 0 ? 'sm:pl-8 pt-8 sm:pt-0' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#64748B] mb-4">
                  <span className="font-semibold">{item.index}</span>
                  <span className="text-[#0017B2] text-[11px] px-2 py-0.5 rounded bg-[#4A8FE7]/15 border border-[#0017B2]/20 font-bold">
                    {item.tag}
                  </span>
                </div>

                <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#000000] group-hover:text-[#0017B2] transition-colors font-mono tracking-tighter leading-none mb-3">
                  <AnimatedCounter value={item.num} duration={1.8} />
                </div>

                <div className="text-sm font-bold uppercase tracking-wider text-[#000000] mb-3">
                  {item.label}
                </div>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed font-normal pt-4 border-t border-[#0017B2]/10">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
