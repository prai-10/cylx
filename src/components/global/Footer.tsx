'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#000818] text-[#FFFDF0] border-t border-[rgba(255,253,240,0.06)] mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[rgba(255,253,240,0.06)]">
          {/* Brand Col */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-2xl font-black tracking-[0.25em] uppercase text-[#FFFDF0] group-hover:text-[#F5C400] transition-colors">
                CLYX.
              </span>
              <span className="w-2 h-2 rounded-full bg-[#F5C400]" />
            </Link>
            <p className="text-sm text-[#cbd5e1] max-w-xs leading-relaxed font-medium">
              Performance marketing &amp; creator ads agency.
            </p>
            <p className="text-xs text-[#798fae] max-w-xs leading-relaxed font-normal">
              We turn organic clips into scaled ad accounts with category-matched creator whitelisting and conversion-first web.
            </p>

            {/* Social Links: IG, IN, X */}
            <div className="flex items-center gap-4 pt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-[#798fae] hover:text-[#F5C400] transition-colors"
              >
                IG
              </a>
              <span className="text-[#798fae]/40">•</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-[#798fae] hover:text-[#F5C400] transition-colors"
              >
                IN
              </a>
              <span className="text-[#798fae]/40">•</span>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-[#798fae] hover:text-[#F5C400] transition-colors"
              >
                X
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#798fae] mb-2 font-mono">
              Company
            </span>
            <Link href="/about" className="text-sm text-[#cbd5e1] hover:text-[#F5C400] transition-colors">
              About
            </Link>
            <Link href="/careers" className="text-sm text-[#cbd5e1] hover:text-[#F5C400] transition-colors">
              Careers
            </Link>
            <Link href="/blog" className="text-sm text-[#cbd5e1] hover:text-[#F5C400] transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-sm text-[#cbd5e1] hover:text-[#F5C400] transition-colors">
              Contact
            </Link>
          </div>

          {/* Work Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#798fae] mb-2 font-mono">
              Work
            </span>
            <Link href="/services" className="text-sm text-[#cbd5e1] hover:text-[#F5C400] transition-colors">
              Services
            </Link>
            <Link href="/portfolio" className="text-sm text-[#cbd5e1] hover:text-[#F5C400] transition-colors">
              Portfolio
            </Link>
            <Link href="/case-studies" className="text-sm text-[#cbd5e1] hover:text-[#F5C400] transition-colors">
              Case Studies
            </Link>
            <Link href="/creators" className="text-sm text-[#cbd5e1] hover:text-[#F5C400] transition-colors">
              Creators
            </Link>
          </div>

          {/* Get in touch */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#798fae] mb-2 font-mono">
              Get in touch
            </span>
            <a
              href="mailto:hello@clyxmedia.com"
              className="text-sm font-medium text-[#FFFDF0] hover:text-[#F5C400] transition-colors font-mono"
            >
              hello@clyxmedia.com
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#cbd5e1] hover:text-[#F5C400] transition-colors flex items-center gap-1.5"
            >
              <span>WhatsApp us</span>
              <span className="text-xs text-[#F5C400]">↗</span>
            </a>
            <Link
              href="/contact"
              className="text-sm text-[#F5C400] hover:text-[#FFDC5F] transition-colors font-bold font-mono mt-1 inline-block"
            >
              Book a call →
            </Link>
          </div>
        </div>

        {/* Cookie Notice Strip */}
        <div className="py-5 border-b border-[rgba(255,253,240,0.06)] text-xs text-[#cbd5e1] flex flex-col sm:flex-row items-center justify-between gap-4 font-normal">
          <span>We use cookies to improve your experience and measure campaign performance.</span>
          <div className="flex items-center gap-4 text-[#798fae]">
            <Link href="/contact" className="hover:text-[#FFFDF0] transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#FFFDF0] transition-colors">Terms</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#798fae] font-mono">
          <p>© CLYX Media. All rights reserved.</p>
          <p className="text-[11px]">Performance marketing · Creator ads · Web</p>
        </div>
      </div>
    </footer>
  );
};
