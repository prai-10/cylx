'use client';

import React, { useState } from 'react';
import { JOBS as STATIC_JOBS } from '@/lib/data/jobs';
import { Job } from '@/types';
import { Button } from '@/components/ui/Button';
import { CareerApplicationModal } from './CareerApplicationModal';

interface CareersClientProps {
  initialJobs?: Job[];
}

export const CareersClient: React.FC<CareersClientProps> = ({ initialJobs = STATIC_JOBS }) => {
  const jobs = initialJobs.length > 0 ? initialJobs : STATIC_JOBS;
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(jobs[0]?.id || null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const toggleExpand = (jobId: string) => {
    setExpandedJobId((prev) => (prev === jobId ? null : jobId));
  };

  return (
    <>
      <div className="flex flex-col gap-6 mb-24">
        {jobs.map((job) => {
          const isExpanded = expandedJobId === job.id;

          return (
            <div
              key={job.id}
              className={`rounded-3xl border transition-all ${
                isExpanded
                  ? 'bg-[#001840]/70 border-[#F5C400]/40 shadow-xl'
                  : 'bg-[#001840]/40 border-[rgba(255,253,240,0.1)] hover:border-[rgba(255,253,240,0.2)]'
              }`}
            >
              {/* Accordion Header */}
              <div
                onClick={() => toggleExpand(job.id)}
                className="p-6 sm:p-8 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-[#F5C400] px-3 py-1 rounded-full bg-[#000c22] border border-[rgba(255,253,240,0.1)]">
                      {job.department}
                    </span>
                    <span className="text-xs font-mono text-[#9aaecf]">
                      {job.location} • {job.type}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#FFFDF0] tracking-tight">
                    {job.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(job);
                    }}
                    variant="primary"
                    size="sm"
                  >
                    Apply Now
                  </Button>
                  <span className="text-xl font-mono text-[#9aaecf] transition-transform duration-200">
                    {isExpanded ? '−' : '+'}
                  </span>
                </div>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-[rgba(255,253,240,0.08)] flex flex-col gap-6">
                  <p className="text-sm sm:text-base text-[#9aaecf] leading-relaxed">
                    {job.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-widest text-[#F5C400] mb-3">
                        Key Responsibilities
                      </h4>
                      <ul className="flex flex-col gap-2.5">
                        {job.responsibilities.map((r, i) => (
                          <li key={i} className="text-xs sm:text-sm text-[#9aaecf] flex items-start gap-2">
                            <span className="text-[#F5C400] mt-0.5">›</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-widest text-[#F5C400] mb-3">
                        Requirements
                      </h4>
                      <ul className="flex flex-col gap-2.5">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="text-xs sm:text-sm text-[#9aaecf] flex items-start gap-2">
                            <span className="text-[#F5C400] mt-0.5">›</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[rgba(255,253,240,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs font-mono text-[#7d93b8]">
                      Status: Open &amp; Actively Hiring
                    </span>
                    <Button onClick={() => handleApply(job)} variant="secondary" size="md">
                      Submit Application for {job.title} →
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <CareerApplicationModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
