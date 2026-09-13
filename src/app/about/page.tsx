import type { Metadata } from 'next';
import { TEAM_MEMBERS } from '@/lib/data/team';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About — CLYX Media',
  description: 'CLYX runs the creator whitelisting + performance engine behind brands that sell — Meta & Google ads, content, and conversion web.',
};

export default function AboutPage() {
  const steps = [
    {
      num: '01',
      title: 'Creator Bench Scouting',
      desc: 'We identify and negotiate dark-post permissions with creators who genuinely live in your category.',
    },
    {
      num: '02',
      title: 'Feed-Native UGC Direction',
      desc: 'We formulate 3-second hooks and unboxing/routine scripts that convert cold traffic without ad cynicism.',
    },
    {
      num: '03',
      title: 'Handle Whitelisting Setup',
      desc: 'Ads run directly through creator profiles, appearing as authentic recommendations in Meta feeds.',
    },
    {
      num: '04',
      title: 'Data-Driven Scale',
      desc: 'Daily ad spend scales behind verified conversion rate and ROAS thresholds, not subjective opinion.',
    },
  ];

  return (
    <main className="w-full min-h-screen py-16 md:py-28 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto bg-[#000c22]">
      {/* Header */}
      <div className="mb-20 md:mb-28 border-b border-[rgba(255,253,240,0.06)] pb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-4">
          About CLYX Media
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#FFFDF0] tracking-tight leading-[0.98] mb-8 max-w-5xl">
          Performance marketing · Creator ads · Web
        </h1>
        <p className="text-lg sm:text-xl text-[#cbd5e1] max-w-3xl leading-relaxed font-normal">
          CLYX Media runs the creator whitelisting + performance engine behind brands that sell — Meta &amp; Google ads, content, branding, and websites built for one job: conversion.
        </p>
      </div>

      {/* Philosophy Dual Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-28">
        <div className="lg:col-span-6 p-8 sm:p-12 rounded-3xl bg-[#001840]/40 border border-[rgba(255,253,240,0.08)]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-4">
            Why Creator Whitelisting
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#FFFDF0] mb-6 tracking-tight">
            A one-off post doesn&apos;t sell. A whitelisted ad, run on data, does.
          </h2>
          <div className="flex flex-col gap-4 text-sm text-[#cbd5e1]/80 leading-relaxed font-normal">
            <p>
              Traditional influencer marketing is broken. Brands pay large upfront fees for 24-hour stories that disappear before the algorithm can optimize.
            </p>
            <p>
              Instead, we run the creator&apos;s own organic content as a paid ad through their handle. It reads as a genuine recommendation, earns immediate trust, and allows our media buyers to scale spend behind the creative variations that actually convert.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 p-8 sm:p-12 rounded-3xl bg-[#001840]/40 border border-[rgba(255,253,240,0.08)]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-4">
            Our Edge
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#FFFDF0] mb-6 tracking-tight">
            Creative built for feeds. Media buying built on data.
          </h2>
          <div className="flex flex-col gap-4 text-sm text-[#cbd5e1]/80 leading-relaxed font-normal">
            <p>
              Most media buyers don&apos;t understand creator culture. Most creative agencies don&apos;t know how to read Meta breakdown reports.
            </p>
            <p>
              CLYX fuses both disciplines under one roof. We test dozens of creative hooks weekly, killing fatigue before it starts and scaling accounts from initial traction to multi-crore monthly spend.
            </p>
          </div>
        </div>
      </div>

      {/* The 4-Step Execution Playbook */}
      <div className="mb-28">
        <div className="mb-12 border-b border-[rgba(255,253,240,0.06)] pb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-2">
            Execution Playbook
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#FFFDF0]">
            How we scale creator ad accounts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-8 rounded-3xl bg-[#000818] border border-[rgba(255,253,240,0.07)] flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-black font-mono text-[#F5C400] block mb-4">
                  {step.num}
                </span>
                <h3 className="text-lg font-bold text-[#FFFDF0] mb-3">
                  {step.title}
                </h3>
                <p className="text-xs text-[#cbd5e1]/80 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Structure: Small team. Direct access. */}
      <div className="mb-28">
        <div className="mb-12 border-b border-[rgba(255,253,240,0.06)] pb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-2">
            Partnership Model
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#FFFDF0] mb-2">
            Small team. Direct access.
          </h2>
          <p className="text-sm text-[#cbd5e1]/80 max-w-xl font-normal">
            You work directly with senior media buyers and creator managers. No junior layers or disconnected account reps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="p-8 rounded-3xl bg-[#001840]/30 border border-[rgba(255,253,240,0.07)]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#000818] text-[#F5C400] flex items-center justify-center font-bold text-xs font-mono mb-4 border border-[rgba(255,253,240,0.08)]">
                {member.department.slice(0, 3)}
              </div>
              <span className="text-xs font-mono text-[#F5C400] block mb-1">
                {member.role}
              </span>
              <h3 className="text-base font-bold text-[#FFFDF0] mb-2">
                {member.name}
              </h3>
              <p className="text-xs text-[#cbd5e1]/80 leading-relaxed font-normal">
                {member.bioPlaceholder}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 sm:p-14 rounded-3xl bg-[#001840]/50 border border-[rgba(255,253,240,0.08)] text-center max-w-3xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFDF0] mb-3">
          Ready to make your creators sell?
        </h3>
        <p className="text-sm text-[#cbd5e1]/80 mb-8 font-normal">
          Book a direct growth call with our team. We will audit your current ad account and creator opportunities.
        </p>
        <Button href="/contact" variant="primary" size="lg">
          Start a project →
        </Button>
      </div>
    </main>
  );
}
