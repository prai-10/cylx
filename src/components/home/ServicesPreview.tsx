'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/data/services';
import { Button } from '@/components/ui/Button';

export const ServicesPreview: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = SERVICES[activeIndex] || SERVICES[0];

  return (
    <section className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#000c22] border-b border-[rgba(255,253,240,0.06)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 border-b border-[rgba(255,253,240,0.06)] pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-3">
              Growth Engine Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#FFFDF0]">
              Six disciplines. One growth engine.
            </h2>
          </div>
          <Button href="/services" variant="outline" className="shrink-0 border-[rgba(255,253,240,0.15)] hover:border-[#F5C400]">
            Explore All Capabilities →
          </Button>
        </div>

        {/* Interactive Growth Engine Ecosystem (Desktop & Tablet) */}
        <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Discipline Selector Column */}
          <div className="col-span-5 flex flex-col gap-2">
            {SERVICES.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`text-left p-4 lg:p-5 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? 'bg-[#001840] border border-[#F5C400]/40 pl-6'
                      : 'hover:bg-[#001840]/40 border border-transparent text-[#798fae]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-mono font-bold transition-colors ${
                        isActive ? 'text-[#F5C400]' : 'text-[#798fae]'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={`text-lg lg:text-xl font-bold transition-colors ${
                        isActive ? 'text-[#FFFDF0]' : 'text-[#cbd5e1]/70 group-hover:text-[#FFFDF0]'
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-mono transition-transform duration-200 ${
                      isActive ? 'text-[#F5C400] translate-x-1' : 'opacity-0 group-hover:opacity-100 text-[#798fae]'
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Central Ecosystem Display Panel */}
          <div className="col-span-7 bg-[#001840]/60 border border-[rgba(255,253,240,0.08)] rounded-3xl p-8 lg:p-12 flex flex-col justify-between min-h-[440px] relative overflow-hidden backdrop-blur-md">
            {/* Ambient Lighting Glow (Restrained Royal Blue) */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#102A71]/25 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-8 border-b border-[rgba(255,253,240,0.06)] pb-4">
                <span className="text-xs font-mono text-[#F5C400] tracking-widest uppercase">
                  Active Discipline Telemetry · 0{activeIndex + 1} / 06
                </span>
                <span className="text-[11px] font-mono text-[#798fae]">
                  Integrated Conversion System
                </span>
              </div>

              <h3 className="text-2xl lg:text-4xl font-black text-[#FFFDF0] tracking-tight mb-4">
                {activeService.title}
              </h3>

              <p className="text-base lg:text-lg text-[#FFFDF0]/90 leading-relaxed font-normal mb-8">
                {activeService.shortDescription}
              </p>

              {/* Capabilities Pills */}
              <div className="flex flex-col gap-2 mb-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#798fae]">
                  Core Capabilities
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeService.capabilities.slice(0, 4).map((cap, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#000c22] border border-[rgba(255,253,240,0.08)] text-[#cbd5e1]"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[rgba(255,253,240,0.06)] flex items-center justify-between">
              <span className="text-xs text-[#798fae] font-mono">
                Engine Module {activeService.id}
              </span>
              <Link
                href="/services"
                className="text-xs font-mono text-[#F5C400] hover:text-[#FFDC5F] flex items-center gap-1.5 transition-colors font-bold uppercase tracking-wider"
              >
                <span>Read Full Blueprint</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Sequential View (Accordion-style) */}
        <div className="md:hidden flex flex-col gap-4">
          {SERVICES.map((service, index) => {
            const isExpanded = activeIndex === index;

            return (
              <div
                key={service.id}
                className={`rounded-2xl border transition-all ${
                  isExpanded
                    ? 'bg-[#001840] border-[#F5C400]/50'
                    : 'bg-[#001840]/30 border-[rgba(255,253,240,0.06)]'
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isExpanded ? -1 : index)}
                  className="w-full p-6 text-left flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#F5C400] font-bold">0{index + 1}</span>
                    <h3 className="text-lg font-bold text-[#FFFDF0]">{service.title}</h3>
                  </div>
                  <span className="text-base text-[#F5C400]">{isExpanded ? '−' : '+'}</span>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-1 border-t border-[rgba(255,253,240,0.06)] flex flex-col gap-4">
                    <p className="text-sm text-[#cbd5e1] leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <Link
                      href="/services"
                      className="text-xs font-mono text-[#F5C400] flex items-center gap-1 mt-2"
                    >
                      <span>Explore full discipline</span>
                      <span>→</span>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
