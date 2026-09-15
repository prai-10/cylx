'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const companyLinks = [['About', '/about'], ['Careers', '/careers'], ['Blog', '/blog'], ['Contact', '/contact']];
const workLinks = [['Services', '/services'], ['Portfolio', '/portfolio'], ['Case Studies', '/case-studies'], ['Creators', '/creators']];

export const Footer: React.FC = () => (
  <footer className="relative z-10 mt-auto overflow-hidden border-t border-white/10 bg-[#000818] text-[#FFFDF0]">
    <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
      <div className="relative mb-16 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#102A71]/60 via-[#041436] to-[#000c22] p-7 sm:p-10 md:p-12">
        <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#F5C400]/10 blur-3xl" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-[#F5C400]">Build the next growth loop</p>
            <h2 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight text-[#FFFDF0]">
              Your next best-performing creative is probably already in the wild.
            </h2>
          </div>
          <div className="shrink-0 pt-2 md:pt-0">
            <Button href="/contact" size="lg" className="shadow-lg shadow-[#F5C400]/10">
              Start a project →
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-black tracking-[0.2em] transition-colors hover:text-[#F5C400]">
            CLYX<span className="h-2 w-2 rounded-full bg-[#F5C400]" />
          </Link>
          <p className="mt-5 max-w-sm text-sm sm:text-base leading-relaxed text-[#cbd5e1]">
            Performance marketing, creator-native content, and conversion-first digital experiences for brands ready to scale.
          </p>
          <div className="mt-7 flex gap-5 text-xs font-mono text-[#798fae]">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#F5C400]">IG</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#F5C400]">IN</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[#F5C400]">X</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-4">
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Work" links={workLinks} />
        </div>
        <div className="md:col-span-3">
          <p className="mb-4 text-xs font-mono uppercase tracking-wider text-[#798fae]">Get in touch</p>
          <a href="mailto:hello@clyxmedia.com" className="text-base sm:text-lg font-semibold hover:text-[#F5C400]">
            hello@clyxmedia.com
          </a>
          <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#798fae]">
            Direct access to the people running your media, creative, and web.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 text-xs font-mono text-[#798fae] sm:flex-row sm:items-center sm:justify-between">
        <p>© CLYX Media. All rights reserved.</p>
        <p>Performance marketing · Creator ads · Web</p>
      </div>
    </div>
  </footer>
);

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <p className="mb-4 text-xs font-mono uppercase tracking-wider text-[#798fae]">{title}</p>
      <div className="flex flex-col gap-3">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="text-xs sm:text-sm text-[#cbd5e1] transition-colors hover:text-[#F5C400]">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
