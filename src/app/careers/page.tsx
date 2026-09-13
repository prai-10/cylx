import type { Metadata } from 'next';
import { CareersClient } from '@/components/careers/CareersClient';
import { getCmsJobs } from '@/lib/cms/data';

export const metadata: Metadata = {
  title: 'Careers — Clyx Media',
  description: 'Join the Clyx Media squad. We are hiring creative strategists, 3D motion designers, short-form video editors, and frontend engineers.',
};

export default async function CareersPage() {
  const jobs = await getCmsJobs();
  const perks = [
    {
      title: 'Culture-First Output',
      desc: 'No corporate bureaucracy or endless slide decks. We prioritize shipping work that breaks through cultural feeds.'
    },
    {
      title: 'Remote-First Flexibility',
      desc: 'Work from anywhere across the globe with asynchronous communication, flexible hours, and top-tier remote tooling.'
    },
    {
      title: 'Uncapped Creative Freedom',
      desc: 'We actively encourage weird, provocative, experimental ideas that challenge client comfort zones.'
    },
    {
      title: 'Hardware & Tech Allowance',
      desc: 'Comprehensive stipend for top-of-the-line MacBooks, 3D workstations, cameras, audio gear, and creative subscriptions.'
    }
  ];

  return (
    <main className="w-full min-h-screen py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-20">
        <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] px-3 py-1 bg-[#001840] rounded-full border border-[rgba(255,253,240,0.12)] inline-block mb-4">
          Join the Squad
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#FFFDF0] tracking-tight mb-6 leading-[1.05]">
          Build the internet people actually remember.
        </h1>
        <p className="text-base sm:text-lg text-[#9aaecf] max-w-3xl leading-relaxed font-normal">
          We are constantly searching for internet-native minds — strategists, 3D artists, video creators, and creative engineers obsessed with craft and velocity.
        </p>
      </div>

      {/* Why Work With Clyx / Culture */}
      <div className="mb-28">
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] px-3 py-1 bg-[#001840] rounded-full border border-[rgba(255,253,240,0.12)] inline-block mb-3">
            Why Clyx
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#FFFDF0] tracking-tight">
            The environment to do the best work of your career
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-[#001840]/40 border border-[rgba(255,253,240,0.1)] flex flex-col justify-between hover:border-[#F5C400]/30 transition-colors"
            >
              <div>
                <span className="text-xs font-mono text-[#F5C400] block mb-4">
                  0{i + 1}
                </span>
                <h3 className="text-lg font-bold text-[#FFFDF0] mb-2 tracking-tight">
                  {perk.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9aaecf] leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Open Roles Section */}
      <div className="mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] px-3 py-1 bg-[#001840] rounded-full border border-[rgba(255,253,240,0.12)] inline-block mb-3">
              Open Positions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#FFFDF0] tracking-tight">
              Currently scouting talent
            </h2>
          </div>
          <span className="text-xs font-mono text-[#9aaecf]">
            Select a position to expand details and apply
          </span>
        </div>

        <CareersClient initialJobs={jobs} />
      </div>

      {/* General Application Banner */}
      <div className="p-10 sm:p-14 rounded-3xl bg-[#001840]/60 border border-[rgba(255,253,240,0.12)] text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-2">
          General Application
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-[#FFFDF0] mb-3 tracking-tight">
          Don&apos;t see your exact discipline?
        </h3>
        <p className="text-sm sm:text-base text-[#9aaecf] mb-8 max-w-xl mx-auto leading-relaxed">
          We regularly create roles for exceptional individuals. Send your portfolio and thoughts to our talent squad.
        </p>
        <a
          href="mailto:careers@clyxmedia.com"
          className="inline-flex items-center justify-center font-semibold text-sm px-6 py-3.5 rounded-full bg-[#F5C400] text-[#000c22] hover:bg-[#FFDC5F] transition-all font-mono"
        >
          Email careers@clyxmedia.com →
        </a>
      </div>
    </main>
  );
}
