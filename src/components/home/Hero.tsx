'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '@/components/ui/Button';

// Dynamically import Scene — avoid SSR
const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

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

  // GSAP entrance animation
  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-anim-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: 'expo.out',
          delay: 0.15,
        }
      );

      if (scrollIndicatorRef.current) {
        gsap.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 0.7, duration: 1, delay: 1.2, ease: 'power2.out' }
        );

        gsap.to(scrollIndicatorRef.current, {
          y: 6,
          repeat: -1,
          yoyo: true,
          duration: 1.4,
          ease: 'sine.inOut',
          delay: 1.6,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[760px] md:min-h-[calc(100vh-1px)] w-full flex items-center overflow-hidden px-6 py-28 md:px-12 md:py-32 lg:px-16"
      data-cursor="explore"
    >
      {/* 3D Canvas — contained atmospheric layer */}
      {!prefersReduced && (
        <div className="absolute inset-y-20 right-[-12%] z-0 pointer-events-none w-[78%] md:w-[62%] opacity-90">
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
          className="absolute inset-y-20 right-[-12%] z-0 pointer-events-none w-[78%] md:w-[62%]"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, #071e4a 0%, #000c22 75%)',
          }}
        />
      )}

      {/* Grid, glow and depth layers */}
      <div className="absolute inset-0 z-0 pointer-events-none hero-grid opacity-60" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_76%_42%,rgba(16,42,113,0.35),transparent_34%),linear-gradient(90deg,#000c22_0%,rgba(0,12,34,0.92)_35%,rgba(0,12,34,0.2)_75%,#000c22_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 z-0 pointer-events-none bg-gradient-to-t from-[#000c22] to-transparent" />

      <div className="absolute top-28 right-6 md:right-12 z-10 hidden md:flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[#798fae]">
        <span className="h-px w-10 bg-[#F5C400]" />
        <span>Live growth system / 01</span>
      </div>

      {/* Text Content */}
      <div ref={contentRef} className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.65fr)] gap-10 lg:gap-20 items-end">
        <div>
        {/* Brand Positioning Tag */}
        <div className="hero-anim-item inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#001840]/80 backdrop-blur-md rounded-full border border-[rgba(255,253,240,0.14)] mb-7 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
          <span className="w-2 h-2 rounded-full bg-[#F5C400] animate-pulse" />
          <span className="text-xs font-mono tracking-wide text-[#FFFDF0]">
            Performance Marketing · Creator Ads · Web
          </span>
        </div>

        {/* Client Approved Primary Headline */}
        <h1 className="hero-anim-item text-5xl sm:text-7xl md:text-8xl lg:text-[5.8rem] xl:text-[6.5rem] font-black text-[#FFFDF0] tracking-[-0.055em] leading-[0.9] mb-8 max-w-5xl">
          We turn organic clips into{' '}
          <span className="text-[#F5C400] relative inline-block">
            scaled ad accounts.
          </span>
        </h1>

        {/* Narrative Progression Ribbon (Organic -> Whitelist -> Performance -> Scale) */}
        <div className="hero-anim-item flex items-center gap-3 sm:gap-4 text-xs font-mono uppercase tracking-[0.14em] text-[#798fae] mb-8 overflow-x-auto pb-1 scrollbar-none whitespace-nowrap">
          <span className="text-[#F5C400] font-bold">01 Organic Clip</span>
          <span className="text-[rgba(255,253,240,0.2)]">→</span>
          <span className="text-[#FFFDF0]">02 Whitelisted Rights</span>
          <span className="text-[rgba(255,253,240,0.2)]">→</span>
          <span className="text-[#FFFDF0]">03 CPA Validation</span>
          <span className="text-[rgba(255,253,240,0.2)]">→</span>
          <span className="text-[#F5C400] font-bold">04 Account Scale</span>
        </div>

        {/* Client Approved Supporting Message */}
        <p className="hero-anim-item text-base sm:text-lg md:text-xl text-[#cbd5e1] max-w-2xl leading-relaxed mb-10 font-normal">
          CLYX Media runs the creator whitelisting + performance engine behind brands that sell — Meta &amp; Google ads, content, branding, and websites built for one job: conversion.
        </p>

        {/* Client CTAs: Book a growth call + Watch showreel */}
        <div className="hero-anim-item flex flex-wrap items-center gap-4">
          <Button href="/contact" variant="primary" size="lg" className="shadow-lg shadow-[#F5C400]/10">
            Book a growth call →
          </Button>
          <Button href="/portfolio" variant="outline" size="lg" className="border-[rgba(255,253,240,0.2)] hover:border-[#FFFDF0]">
            Watch showreel
          </Button>
        </div>
        </div>

        <div className="hero-anim-item hidden lg:flex flex-col gap-5 pb-2">
          <div className="ml-auto w-full max-w-sm rounded-[2rem] border border-white/10 bg-[#041436]/55 backdrop-blur-xl p-6 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#798fae]">
              <span>Conversion index</span>
              <span className="text-[#F5C400]">+34.8%</span>
            </div>
            <div className="flex items-end gap-2 pt-7 h-28">
              {[28, 42, 35, 58, 52, 76, 68, 92].map((height, index) => (
                <span key={index} className="flex-1 rounded-t-sm bg-gradient-to-t from-[#102A71] to-[#F5C400] opacity-80" style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="flex items-center justify-between pt-5 text-xs text-[#cbd5e1]">
              <span>Organic signal</span>
              <span className="font-mono text-[#FFFDF0]">→ scaled media</span>
            </div>
          </div>
          <div className="ml-auto flex max-w-sm items-center gap-3 text-xs leading-relaxed text-[#798fae]">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#F5C400] shadow-[0_0_18px_#F5C400]" />
            <span>Creator-native creative, connected to the numbers that matter.</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 right-8 md:right-16 z-10 hidden sm:flex items-center gap-3 text-xs font-mono text-[#798fae] uppercase tracking-widest"
      >
        <span>Explore Narrative</span>
        <span className="text-[#F5C400]">↓</span>
      </div>
    </section>
  );
}
