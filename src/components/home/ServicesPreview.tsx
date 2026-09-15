'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '@/lib/data/services';
import { Button } from '@/components/ui/Button';
import { BorderBeam } from '@/components/ui/BorderBeam';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const ServicesPreview: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = SERVICES[activeIndex] || SERVICES[0];
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-white border-b border-[#0017B2]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6 border-b border-[#0017B2]/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0017B2]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#0017B2] font-bold">
                02 / Growth Engine Architecture
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#000000]">
              Six disciplines. One engine.
            </h2>
          </div>
          <Button href="/services" variant="outline" className="shrink-0 border-[#0017B2]/20 hover:border-[#0017B2]">
            Explore All Capabilities →
          </Button>
        </div>

        {/* Motion UI Bento Layout (Desktop & Tablet) */}
        <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Discipline Selector Column */}
          <div role="tablist" aria-label="Services disciplines" className="col-span-5 flex flex-col gap-3">
            {SERVICES.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={service.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`text-left px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-between group min-h-[58px] relative overflow-hidden ${
                    isActive
                      ? 'bg-[#0017B2]/10 border border-[#0017B2] shadow-md pl-6'
                      : 'bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#0017B2]/10 text-[#64748B]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-[#0017B2]/10 border border-[#0017B2] rounded-2xl -z-10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-mono font-bold transition-colors ${
                        isActive ? 'text-[#0017B2]' : 'text-[#64748B]'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={`text-base lg:text-lg font-bold transition-colors ${
                        isActive ? 'text-[#000000]' : 'text-[#334155] group-hover:text-[#000000]'
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-mono transition-transform duration-200 ${
                      isActive ? 'text-[#0017B2] translate-x-1' : 'opacity-0 group-hover:opacity-100 text-[#64748B]'
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Central Bento Display Panel */}
          <div className="col-span-7 bg-[#F8FAFC] border border-[#0017B2]/15 rounded-3xl p-8 lg:p-12 flex flex-col justify-between min-h-[460px] relative overflow-hidden shadow-sm">
            <BorderBeam size={220} duration={14} colorFrom="#FCD21D" colorTo="#0017B2" />

            {/* Ambient Lighting Glow */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4A8FE7]/15 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReduced ? 0 : -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-8 border-b border-[#0017B2]/10 pb-4">
                    <span className="text-xs font-mono text-[#0017B2] tracking-widest uppercase font-bold">
                      Active Discipline · 0{activeIndex + 1} / 06
                    </span>
                    <span className="text-xs font-mono text-[#64748B]">
                      Integrated Engine Module
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-black text-[#000000] tracking-tight mb-4">
                    {activeService.title}
                  </h3>

                  <p className="text-base lg:text-lg text-[#334155] leading-relaxed font-normal mb-8">
                    {activeService.shortDescription}
                  </p>

                  {/* Capabilities Pills */}
                  <div className="flex flex-col gap-2.5 mb-8">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B]">
                      Core Capabilities
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeService.capabilities.slice(0, 5).map((cap, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white border border-[#0017B2]/15 text-[#334155] hover:border-[#0017B2] transition-colors"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#0017B2]/10 flex items-center justify-between">
                  <span className="text-xs text-[#64748B] font-mono">
                    System Node #{activeService.id}
                  </span>
                  <Link
                    href="/services"
                    className="text-xs font-mono text-[#0017B2] hover:text-[#4A8FE7] flex items-center gap-1.5 transition-colors font-bold uppercase tracking-wider group"
                  >
                    <span>Read Full Blueprint</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Accordion View */}
        <div className="md:hidden flex flex-col gap-4">
          {SERVICES.map((service, index) => {
            const isExpanded = activeIndex === index;

            return (
              <div
                key={service.id}
                className={`rounded-2xl border transition-all ${
                  isExpanded
                    ? 'bg-white border-[#0017B2] shadow-md'
                    : 'bg-[#F8FAFC] border-[#0017B2]/10'
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isExpanded ? -1 : index)}
                  className="w-full p-6 text-left flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#0017B2] font-bold">0{index + 1}</span>
                    <h3 className="text-lg font-bold text-[#000000]">{service.title}</h3>
                  </div>
                  <span className="text-base text-[#0017B2]">{isExpanded ? '−' : '+'}</span>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-1 border-t border-[#0017B2]/10 flex flex-col gap-4">
                    <p className="text-sm text-[#334155] leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <Link
                      href="/services"
                      className="text-xs font-mono text-[#0017B2] flex items-center gap-1 mt-2 font-bold"
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
