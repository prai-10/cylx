'use client';

import React from 'react';

export const PerformanceProof: React.FC = () => {
  const metrics = [
    {
      num: '50+',
      label: 'brands scaled',
      detail: 'Consumer, e-commerce & high-growth brands',
      tag: 'Scale Telemetry',
    },
    {
      num: '₹40Cr+',
      label: 'ad spend managed',
      detail: 'Scaled across Meta & Google growth campaigns',
      tag: 'Verified Capital',
    },
    {
      num: '3.4x',
      label: 'avg ROAS lift',
      detail: 'Driven by creator handle whitelisting',
      tag: 'Performance Alpha',
    },
    {
      num: '200+',
      label: 'creators in network',
      detail: 'Category-matched & whitelisting-ready',
      tag: 'Creator Bench',
    },
  ];

  return (
    <section className="w-full bg-[#000818] border-y border-[rgba(255,253,240,0.06)] py-20 md:py-28 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[rgba(255,253,240,0.06)] pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-[#F5C400] block mb-2">
              Performance Verification
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#FFFDF0] tracking-tight">
              Evidence, not subjective opinions.
            </h2>
          </div>
          <span className="text-xs font-mono text-[#798fae] shrink-0">
            Ad Account Aggregate Telemetry · Meta &amp; Google
          </span>
        </div>

        {/* Editorial Spatial Metric Blocks (No Boxed Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#798fae] mb-3">
                  <span>0{idx + 1}</span>
                  <span className="text-[#F5C400]/80">{item.tag}</span>
                </div>

                <div className="text-5xl sm:text-6xl md:text-7xl font-black text-[#FFFDF0] group-hover:text-[#F5C400] transition-colors font-mono tracking-tighter leading-none mb-3">
                  {item.num}
                </div>

                <div className="text-sm font-bold uppercase tracking-wider text-[#FFFDF0] mb-2">
                  {item.label}
                </div>
              </div>

              <p className="text-xs text-[#cbd5e1]/70 leading-relaxed font-normal pt-4 border-t border-[rgba(255,253,240,0.05)]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
