'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { PRIMARY_NAV_LINKS, ALL_NAV_LINKS } from '@/lib/registry';
import { NavigationPrompt } from './NavigationPrompt';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPromptOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY > 100) {
        if (delta > 6) {
          setIsVisible(false);
        } else if (delta < -6) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      y: isVisible ? 0 : '-100%',
      duration: 0.4,
      ease: 'expo.out',
    });
  }, [isVisible]);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';

      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.35,
        ease: 'expo.out',
      });

      const items = mobileMenuRef.current.querySelectorAll('.mobile-link');
      gsap.fromTo(
        items,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: 'expo.out',
          delay: 0.05,
        }
      );
    } else {
      document.body.style.overflow = '';

      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.25,
        ease: 'power2.in',
      });
    }
  }, [isMobileOpen]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Primary Navigation"
        className={cn(
          'fixed top-0 left-0 right-0 z-40',
          'flex items-center justify-between',
          'px-5 sm:px-6 lg:px-10 py-3.5 md:py-4',
          'border-b border-[rgba(255,253,240,0.08)] shadow-[0_14px_40px_rgba(0,0,0,0.16)]',
          'transition-[backdrop-filter,background-color,box-shadow] duration-300'
        )}
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(0, 12, 34, 0.72)',
        }}
      >
        {/* Logo / Wordmark */}
        <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="Clyx Media Home">
          <span className="text-base tracking-[0.25em] font-black uppercase text-[#FFFDF0] group-hover:text-[#F5C400] transition-colors">
            CLYX
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
        </Link>

        {/* Desktop Links (Streamlined 4 Links) */}
        <div className="hidden md:flex items-center gap-1">
          {PRIMARY_NAV_LINKS.map((link) => {
            const isActive = link.href === '/'
              ? pathname === '/'
              : pathname === link.href || pathname.startsWith(link.href + '/');

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-xs font-semibold uppercase tracking-wider transition-colors duration-150 px-4 py-2 rounded-full',
                  isActive
                    ? 'text-[#F5C400]'
                    : 'text-[#cbd5e1]/80 hover:text-[#FFFDF0]'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktopNavActivePill"
                    className="absolute inset-0 bg-[#001840] border border-[#F5C400]/40 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side CTAs */}
        <div className="hidden md:flex items-center gap-4">
          {/* Prompt Trigger */}
          <button
            onClick={() => setIsPromptOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#001840]/60 hover:bg-[#102A71]/50 border border-[rgba(255,253,240,0.12)] hover:border-[#F5C400]/60 rounded-full text-xs text-[#cbd5e1] hover:text-[#FFFDF0] transition-all cursor-pointer"
            title="Prompt search (⌘K)"
          >
            <span className="text-[#F5C400] font-mono font-bold">&gt;</span>
            <span className="text-xs font-mono text-[#798fae]">Search</span>
            <kbd className="text-xs font-mono bg-[#000c22] px-1.5 py-0.5 rounded border border-[rgba(255,253,240,0.1)] text-[#798fae]">
              ⌘K
            </kbd>
          </button>

          {/* Primary CTA */}
          <MagneticButton distance={0.2}>
            <Button href="/contact" variant="primary" size="sm">
              Start a project
            </Button>
          </MagneticButton>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <Button href="/contact" variant="primary" size="sm" className="text-xs px-3 py-1">
            Start a project
          </Button>

          <button
            onClick={() => setIsPromptOpen(true)}
            className="p-1.5 text-[#F5C400] hover:text-white"
            aria-label="Open prompt search"
          >
            <span className="font-mono text-sm font-bold">&gt;_</span>
          </button>

          <button
            onClick={toggleMobile}
            className="relative w-6 h-4.5 flex flex-col justify-between text-[#FFFDF0] ml-1"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            <span
              className={cn(
                'block h-0.5 w-full bg-current transition-all duration-300',
                isMobileOpen && 'rotate-45 translate-y-[8px]'
              )}
            />
            <span
              className={cn(
                'block h-0.5 w-full bg-current transition-opacity duration-300',
                isMobileOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'block h-0.5 w-full bg-current transition-all duration-300',
                isMobileOpen && '-rotate-45 -translate-y-[8px]'
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        ref={mobileMenuRef}
        className={cn(
          'fixed inset-0 z-30 md:hidden',
          'flex flex-col justify-between',
          'px-8 py-24',
          'bg-[#000c22]/98 backdrop-blur-2xl',
          'opacity-0 pointer-events-none overflow-y-auto'
        )}
      >
        <div className="flex flex-col gap-4">
          {ALL_NAV_LINKS.map((link) => {
            const isActive = link.href === '/'
              ? pathname === '/'
              : pathname === link.href || pathname.startsWith(link.href + '/');

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'mobile-link text-xl font-bold uppercase tracking-tight py-1',
                  isActive ? 'text-[#F5C400]' : 'text-[#FFFDF0]/80 hover:text-[#FFFDF0]'
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="pt-6 border-t border-[rgba(255,253,240,0.08)] flex flex-col gap-3 mt-6">
          <Button
            href="/contact"
            variant="primary"
            className="w-full justify-center"
            onClick={() => setIsMobileOpen(false)}
          >
            Start a project →
          </Button>
          <button
            onClick={() => {
              setIsMobileOpen(false);
              setIsPromptOpen(true);
            }}
            className="w-full py-2.5 bg-[#001840] border border-[#F5C400]/30 text-[#F5C400] rounded-full text-xs font-mono flex items-center justify-center gap-2"
          >
            <span>&gt; Open Prompt Navigation (⌘K)</span>
          </button>
          <div className="text-[11px] text-[#798fae] text-center pt-2">
            Performance marketing · Creator ads · Web
          </div>
        </div>
      </div>

      <NavigationPrompt isOpen={isPromptOpen} onClose={() => setIsPromptOpen(false)} />
    </>
  );
}
