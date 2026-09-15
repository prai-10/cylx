'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const companyLinks = [
  ['About', '/about'],
  ['Careers', '/careers'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
];

const workLinks = [
  ['Services', '/services'],
  ['Portfolio', '/portfolio'],
  ['Case Studies', '/case-studies'],
  ['Creators', '/creators'],
];

export const Footer: React.FC = () => {
  const [times, setTimes] = useState({
    mumbai: '--:--',
    london: '--:--',
    newYork: '--:--',
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimes({
        mumbai: now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        london: now.toLocaleTimeString('en-US', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        newYork: now.toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 mt-auto overflow-hidden border-t border-white/10 bg-[#000818] text-[#FFFDF0]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        {/* Editorial Top Card Banner */}
        <div className="relative mb-16 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#102A71]/50 via-[#041436] to-[#000c22] p-7 sm:p-10 md:p-12">
          <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#F5C400]/10 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-xs font-mono uppercase tracking-wider text-[#F5C400]">
                  Accepting select brand partnerships for Q3/Q4
                </p>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight text-[#FFFDF0]">
                Your next best-performing creative is probably already in the feed.
              </h2>
            </div>
            <div className="shrink-0 pt-2 md:pt-0">
              <Button href="/contact" size="lg" className="shadow-lg shadow-[#F5C400]/15">
                Start a project →
              </Button>
            </div>
          </div>
        </div>

        {/* Global Clocks Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-white/10 mb-14 text-xs font-mono text-[#798fae]">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <span className="text-[#FFFDF0] font-semibold">MUMBAI</span>
            <span className="text-[#F5C400]">{times.mumbai} IST</span>
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <span className="text-[#FFFDF0] font-semibold">LONDON</span>
            <span className="text-[#F5C400]">{times.london} GMT</span>
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <span className="text-[#FFFDF0] font-semibold">NEW YORK</span>
            <span className="text-[#F5C400]">{times.newYork} EST</span>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-black tracking-[0.2em] transition-colors hover:text-[#F5C400]">
              CLYX<span className="h-2 w-2 rounded-full bg-[#F5C400]" />
            </Link>
            <p className="mt-5 max-w-sm text-sm sm:text-base leading-relaxed text-[#cbd5e1]">
              Performance marketing, creator whitelisting, and conversion-first digital flagships for high-growth brands.
            </p>
            <div className="mt-7 flex gap-5 text-xs font-mono text-[#798fae]">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#F5C400] transition-colors">
                [ INSTAGRAM ]
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#F5C400] transition-colors">
                [ LINKEDIN ]
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[#F5C400] transition-colors">
                [ X / TWITTER ]
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-4">
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Disciplines" links={workLinks} />
          </div>

          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <p className="mb-4 text-xs font-mono uppercase tracking-wider text-[#798fae]">Direct Inquiry</p>
              <a href="mailto:hello@clyxmedia.com" className="text-base sm:text-lg font-semibold hover:text-[#F5C400] transition-colors block">
                hello@clyxmedia.com
              </a>
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#798fae]">
                Direct partner access. No intermediate accounts or account executives.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-8 text-xs font-mono text-[#798fae] hover:text-[#F5C400] transition-colors flex items-center gap-2 cursor-pointer w-fit"
            >
              <span>Back to top</span>
              <span>↑</span>
            </button>
          </div>
        </div>

        {/* Big Subtle Brand Mark Watermark */}
        <div className="pt-8 pb-4 text-center select-none pointer-events-none opacity-15 overflow-hidden">
          <span className="text-[12vw] font-black tracking-[-0.06em] text-white leading-none block whitespace-nowrap">
            CLYX MEDIA
          </span>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs font-mono text-[#798fae] sm:flex-row sm:items-center sm:justify-between border-t border-white/5">
          <p>© {new Date().getFullYear()} CLYX Media. All rights reserved.</p>
          <p>Performance Marketing · Creator Ads · Conversion Web</p>
        </div>
      </div>
    </footer>
  );
};

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <p className="mb-4 text-xs font-mono uppercase tracking-wider text-[#798fae]">{title}</p>
      <div className="flex flex-col gap-3">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="text-xs sm:text-sm text-[#cbd5e1] transition-colors hover:text-[#F5C400] hover:translate-x-0.5 inline-block"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
