'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const HowItWorks: React.FC = () => {
  const prefersReduced = useReducedMotion();

  const steps = [
    {
      num: '01',
      stage: 'ORGANIC CREATION',
      title: 'Creator posts organically',
      tagline: 'Real content, real handle, real trust.',
      description: 'The creator tests content directly with their genuine community. Viewers respond to authentic lifestyle usage, candid routines, or unfiltered breakdowns without corporate agency polish.',
    },
    {
      num: '02',
      stage: 'WHITELISTING RIGHTS',
      title: 'We whitelist top clips',
      tagline: "Run as paid ads through the creator's own account.",
      description: 'We connect the creator’s authorized Meta or TikTok profile directly into your performance ad account. The ad deploys natively with the creator’s handle at the top, bypassing ad fatigue.',
    },
    {
      num: '03',
      stage: 'DATA-DRIVEN SCALE',
      title: 'Data decides the scale',
      tagline: 'Spend follows conversion rate, not opinion.',
      description: 'We monitor first-hour CPA, ROAS, and retention signals rigorously. When a whitelisted creative variation proves unit profitability, we scale daily ad budget behind it without hesitation.',
    },
  ];

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-[#000818] border-b border-[rgba(255,253,240,0.08)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header & Core Philosophy */}
        <div className="max-w-4xl mb-20 md:mb-24">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5C400]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400]">
              03 / The Whitelisting Engine
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#FFFDF0] leading-[1.02] mb-8">
            A one-off post doesn&apos;t sell. A whitelisted ad, run on data, does.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#cbd5e1] leading-relaxed font-normal">
            Instead of paying for a single influencer post, we run the creator&apos;s own organic content as a paid ad through their handle — it reads as a genuine recommendation, not a brand ad, so it earns trust immediately. From there, performance data decides which clips get scaled.
          </p>
        </div>

        {/* The 3 Sequential Narrative Stages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-14 relative mb-20">
          {/* Continuous trajectory guide line (Desktop) */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-[1px] bg-gradient-to-r from-[#F5C400]/50 via-[rgba(255,253,240,0.2)] to-[#F5C400]/50 z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col justify-between group"
            >
              <div>
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-full bg-[#001840] border border-[rgba(255,253,240,0.15)] group-hover:border-[#F5C400] transition-colors flex items-center justify-center text-sm font-mono font-black text-[#F5C400] shadow-lg shadow-[#001840]/60">
                    {step.num}
                  </div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#798fae]">
                    Stage 0{idx + 1} · {step.stage}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#FFFDF0] tracking-tight mb-3 group-hover:text-[#F5C400] transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm font-semibold text-[#F5C400] mb-4">
                  &ldquo;{step.tagline}&rdquo;
                </p>

                <p className="text-sm text-[#cbd5e1]/80 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[rgba(255,253,240,0.06)] flex items-center justify-between text-xs font-mono text-[#798fae]">
                <span>Pipeline Stage</span>
                <span className="text-[#FFFDF0] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Validated Node
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Bottom Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#001840]/50 border border-[rgba(255,253,240,0.1)] flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xl">
          <div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#FFFDF0]">
              Ready to see how whitelisting fits your ad account?
            </h4>
            <p className="text-sm text-[#cbd5e1]/80 mt-1">
              We audit your category competitors and creator roster during a 30-minute growth call.
            </p>
          </div>
          <Button href="/contact" variant="primary" size="md" className="shrink-0 shadow-lg shadow-[#F5C400]/15">
            Book a growth call →
          </Button>
        </div>
      </div>
    </section>
  );
};
