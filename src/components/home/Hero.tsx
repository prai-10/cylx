'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '@/components/ui/Button';
import { StaggerReveal, StaggerItem, MaskedLine } from '@/components/ui/StaggerReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { BorderBeam } from '@/components/ui/BorderBeam';

// Dynamically import Three.js Scene — avoid SSR
const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouse = useMousePosition();
  const prefersReduced = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress through the hero section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.8)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[820px] lg:min-h-[calc(100vh-1px)] w-full flex items-center overflow-hidden px-6 py-28 md:px-12 md:py-32 lg:px-16"
      data-cursor="explore"
    >
      {/* 3D Atmospheric Background Layer */}
      {!prefersReduced && (
        <div className="absolute inset-y-16 right-[-10%] z-0 pointer-events-none w-[80%] md:w-[60%] opacity-85">
          <Scene
            mouse={mouse}
            scrollProgress={scrollProgress}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Reduced motion fallback */}
      {prefersReduced && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 70% 40%, rgba(16,42,113,0.3) 0%, #000c22 75%)',
          }}
        />
      )}

      {/* Atmospheric Editorial Grids & Ambient Light */}
      <div className="absolute inset-0 z-0 pointer-events-none hero-grid opacity-50" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_75%_35%,rgba(16,42,113,0.4),transparent_40%),linear-gradient(90deg,#000c22_0%,rgba(0,12,34,0.94)_38%,rgba(0,12,34,0.3)_75%,#000c22_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-44 z-0 pointer-events-none bg-gradient-to-t from-[#000c22] to-transparent" />

      {/* Agency Meta Tag (Top Right) */}
      <div className="absolute top-28 right-6 md:right-12 z-10 hidden md:flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[#798fae]">
        <span className="h-px w-8 bg-[#F5C400]" />
        <span>GROWTH SYSTEM / 01</span>
      </div>

      {/* Main Hero Stagger Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.7fr)] gap-12 lg:gap-16 items-end">
        <StaggerReveal staggerDelay={0.09} initialDelay={0.15} className="flex flex-col">
          {/* 1. Live Engine Kicker Pill */}
          <StaggerItem yOffset={24} duration={0.8}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#001840]/90 backdrop-blur-md rounded-full border border-[rgba(255,253,240,0.12)] mb-7 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5C400] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5C400]" />
              </span>
              <span className="text-xs font-mono tracking-wider text-[#FFFDF0]">
                PERFORMANCE ENGINE · CREATOR ADS · WEB
              </span>
            </div>
          </StaggerItem>

          {/* 2. Editorial Masked Headline Reveal */}
          <div className="mb-8 max-w-5xl">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[5.4rem] xl:text-[6.2rem] font-black text-[#FFFDF0] tracking-[-0.05em] leading-[0.92]">
              <MaskedLine delay={0.1}>
                <span>We turn organic clips</span>
              </MaskedLine>
              <MaskedLine delay={0.22}>
                <span className="text-[#F5C400] inline-block">
                  into scaled ad accounts.
                </span>
              </MaskedLine>
            </h1>
          </div>

          {/* 3. Narrative Progression Ribbon */}
          <StaggerItem yOffset={28} duration={0.85}>
            <div className="flex items-center gap-2.5 sm:gap-4 text-xs font-mono uppercase tracking-[0.14em] text-[#798fae] mb-8 overflow-x-auto pb-1 scrollbar-none whitespace-nowrap">
              <span className="text-[#F5C400] font-bold">01 Organic Clip</span>
              <span className="text-[rgba(255,253,240,0.2)]">→</span>
              <span className="text-[#FFFDF0]">02 Whitelisted Rights</span>
              <span className="text-[rgba(255,253,240,0.2)]">→</span>
              <span className="text-[#FFFDF0]">03 CPA Validation</span>
              <span className="text-[rgba(255,253,240,0.2)]">→</span>
              <span className="text-[#F5C400] font-bold">04 Account Scale</span>
            </div>
          </StaggerItem>

          {/* 4. Editorial Subtext */}
          <StaggerItem yOffset={30} duration={0.9}>
            <p className="text-base sm:text-lg md:text-xl text-[#cbd5e1] max-w-2xl leading-relaxed mb-10 font-normal">
              CLYX Media runs the creator whitelisting + performance engine behind brands that sell — Meta &amp; Google ads, content, branding, and websites built for one job: conversion.
            </p>
          </StaggerItem>

          {/* 5. Magnetic CTA Actions */}
          <StaggerItem yOffset={32} duration={0.95}>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton distance={0.2}>
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  className="shadow-xl shadow-[#F5C400]/15 group"
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
                  className="border-[rgba(255,253,240,0.2)] hover:border-[#FFFDF0]"
                >
                  <span>Watch showreel</span>
                  <span className="text-xs text-[#F5C400] font-mono ml-1.5">(2:14)</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-1">↗</span>
                </Button>
              </MagneticButton>
            </div>
          </StaggerItem>
        </StaggerReveal>

        {/* Right-Hand Editorial Telemetry Widget */}
        <StaggerReveal initialDelay={0.4} className="hidden lg:flex flex-col gap-5 pb-2">
          <StaggerItem yOffset={40} duration={1}>
            <div className="relative ml-auto w-full max-w-sm rounded-[2rem] border border-white/10 bg-[#041436]/65 backdrop-blur-2xl p-7 shadow-2xl shadow-black/30 overflow-hidden">
              <BorderBeam size={160} duration={10} colorFrom="#F5C400" colorTo="#102A71" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#798fae]">
                <span>Conversion index</span>
                <span className="text-[#F5C400] font-bold px-2 py-0.5 rounded bg-[#001840] border border-[#F5C400]/30">
                  +34.8% ALPHA
                </span>
              </div>

              {/* Dynamic Telemetry Waveform Bars */}
              <div className="flex items-end gap-2 pt-6 h-28">
                {[32, 48, 38, 64, 54, 82, 70, 96].map((height, index) => (
                  <motion.span
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      duration: 1.2,
                      delay: 0.6 + index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-[#102A71] via-[#163896] to-[#F5C400] opacity-85"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between pt-5 text-xs text-[#cbd5e1] border-t border-white/5 mt-4">
                <span className="text-[#798fae] font-mono text-[11px]">Organic Signal</span>
                <span className="font-mono text-[#FFFDF0] font-semibold text-xs">→ Scaled Attribution</span>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem yOffset={25} duration={0.9}>
            <div className="ml-auto flex max-w-sm items-center gap-3 text-xs leading-relaxed text-[#798fae] bg-[#001840]/40 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#F5C400] shadow-[0_0_12px_#F5C400]" />
              <span>Whitelisted creator ads connected directly to ROAS telemetry.</span>
            </div>
          </StaggerItem>
        </StaggerReveal>
      </div>

      {/* Editorial Minimalist Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 right-8 md:right-16 z-10 hidden sm:flex items-center gap-3 text-xs font-mono text-[#798fae] uppercase tracking-widest"
      >
        <span>SCROLL TO EXPLORE</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="text-[#F5C400]"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
