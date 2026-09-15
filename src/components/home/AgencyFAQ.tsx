'use client';

import React from 'react';
import { Accordion, AccordionItemData } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';

const FAQ_ITEMS: AccordionItemData[] = [
  {
    id: 'faq-1',
    question: 'How does creator whitelisting differ from standard influencer marketing?',
    answer:
      'Standard influencer marketing pays a creator for a one-off organic post that disappears from feeds in 24 hours. Creator whitelisting gains advertising permissions to run paid ads through the creator’s authentic handle. This bypasses ad fatigue, leverages the creator’s social proof directly in the ad auction, and allows algorithmic ad spend scaling on the variations that convert best.',
    tag: 'Whitelisting Architecture',
  },
  {
    id: 'faq-2',
    question: 'Do we retain full ownership of our ad account and customer data?',
    answer:
      '100% yes. We deploy directly inside your Meta, Google, or TikTok Business Managers via partner access. You retain total ownership of all pixel data, custom audiences, creative assets, and billing telemetry. No hidden black-box ad accounts.',
    tag: 'Data Sovereignty',
  },
  {
    id: 'faq-3',
    question: 'How fast can we launch our first whitelisted creative batch?',
    answer:
      'Our sprint turnaround is typically 7 to 10 days from contract authorization. This includes creator roster matching, whitelisting authorization setup, creative angle scripting, and asset delivery into your active campaign structure.',
    tag: 'Sprint Velocity',
  },
  {
    id: 'faq-4',
    question: 'What ad spend volume is Clyx Media built to handle?',
    answer:
      'Our performance engine is optimized for brands spending between ₹5L/mo to ₹2Cr+/mo across Meta, Google, and TikTok. We engineer custom bid architectures and automated pacing rules to ensure CPA stability as budgets scale.',
    tag: 'Capital Scale',
  },
  {
    id: 'faq-5',
    question: 'How do you handle creator contracts, usage rights, and IP?',
    answer:
      'We provide end-to-end legal and rights management. Every creator agreement explicitly grants paid advertising usage rights, whitelisting permissions, and derivative editing rights for performance iterations.',
    tag: 'Legal & Compliance',
  },
];

export const AgencyFAQ: React.FC = () => {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-[#000818] border-b border-[rgba(255,253,240,0.08)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column — Title & Subtext */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F5C400]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400]">
                  06 / Agency Architecture FAQ
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#FFFDF0] mb-6 leading-tight">
                Frequently examined questions.
              </h2>
              <p className="text-base text-[#cbd5e1] leading-relaxed font-normal mb-8">
                Everything you need to know about creator whitelisting, performance creative engineering, and how our squad integrates with your growth stack.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#001840]/40 border border-white/10 flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#798fae]">
                Have a unique challenge?
              </span>
              <p className="text-sm text-[#FFFDF0]">
                Speak directly with a growth director. We answer technical media questions without sales fluff.
              </p>
              <Button href="/contact" variant="primary" size="sm" className="w-fit">
                Start a conversation →
              </Button>
            </div>
          </div>

          {/* Right Column — Motion Accordion */}
          <div className="lg:col-span-7">
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </div>
    </section>
  );
};
