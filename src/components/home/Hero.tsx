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
      className="relative min-h-[92vh] md:min-h-screen w-full flex flex-col justify-end overflow-hidden pb-16 md:pb-24 px-6 md:px-12 lg:px-16"
      data-cursor="explore"
    >
      {/* 3D Canvas — absolute behind everything */}
      {!prefersReduced && (
        <div className="absolute inset-0 z-0 pointer-events-none">
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
            background: 'radial-gradient(ellipse at 50% 40%, #071e4a 0%, #000c22 75%)',
          }}
        />
      )}

      {/* Subtle depth vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-[#000c22] via-transparent to-transparent opacity-80" />

      {/* Text Content */}
      <div ref={contentRef} className="relative z-10 max-w-6xl mt-auto">
        {/* Brand Positioning Tag */}
        <div className="hero-anim-item inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#001840]/70 backdrop-blur-md rounded-full border border-[rgba(255,253,240,0.1)] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#F5C400] animate-pulse" />
          <span className="text-xs font-mono tracking-widest uppercase text-[#FFFDF0]">
            Performance marketing · Creator ads · Web
          </span>
        </div>

        {/* Client Approved Primary Headline */}
        <h1 className="hero-anim-item text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] font-black text-[#FFFDF0] tracking-tight leading-[0.94] mb-8">
          We turn organic clips into{' '}
          <span className="text-[#F5C400] relative inline-block">
            scaled ad accounts.
          </span>
        </h1>

        {/* Narrative Progression Ribbon (Organic -> Whitelist -> Performance -> Scale) */}
        <div className="hero-anim-item flex items-center gap-3 sm:gap-4 text-[11px] font-mono uppercase tracking-widest text-[#798fae] mb-8 overflow-x-auto pb-1 scrollbar-none">
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
