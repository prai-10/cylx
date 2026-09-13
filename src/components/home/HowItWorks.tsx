'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export const HowItWorks: React.FC = () => {
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
      tagline: 'Run as paid ads through the creator\'s own account.',
      description: 'We connect the creator\'s authorized Meta or TikTok profile directly into your performance ad account. The ad deploys natively with the creator\'s handle at the top, bypassing ad fatigue.',
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
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-[#000818] border-b border-[rgba(255,253,240,0.06)] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header & Core Philosophy */}
        <div className="max-w-4xl mb-20 md:mb-28">
          <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-4">
            The Whitelisting Engine
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#FFFDF0] leading-[1.02] mb-8">
            A one-off post doesn&apos;t sell. A whitelisted ad, run on data, does.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#cbd5e1] leading-relaxed font-normal">
            Instead of paying for a single influencer post, we run the creator&apos;s own organic content as a paid ad through their handle — it reads as a genuine recommendation, not a brand ad, so it earns trust immediately. From there, performance data decides which clips get scaled.
          </p>
        </div>

        {/* The 3 Sequential Narrative Stages (No Boxed Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 relative mb-20">
          {/* Continuous trajectory guide line (Desktop) */}
          <div className="hidden lg:block absolute top-14 left-0 right-0 h-[1px] bg-gradient-to-r from-[#F5C400]/40 via-[rgba(255,253,240,0.15)] to-[#F5C400]/40 z-0" />

          {steps.map((step, idx) => (
            <div key={step.num} className="relative z-10 flex flex-col justify-between group">
              <div>
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#001840] border border-[rgba(255,253,240,0.15)] group-hover:border-[#F5C400] transition-colors flex items-center justify-center text-sm font-mono font-black text-[#F5C400]">
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
                <span>Pipeline Node</span>
                <span className="text-[#FFFDF0] font-bold">Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Bottom Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#001840]/60 border border-[rgba(255,253,240,0.08)] flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          <div>
            <h4 className="text-xl font-bold text-[#FFFDF0]">
              Ready to see how whitelisting fits your ad account?
            </h4>
            <p className="text-xs text-[#cbd5e1]/80 mt-1">
              We audit your category competitors and creator roster during a 30-minute growth call.
            </p>
          </div>
          <Button href="/contact" variant="primary" size="md">
            Book a growth call →
          </Button>
        </div>
      </div>
    </section>
  );
};
