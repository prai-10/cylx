import Hero from '@/components/home/Hero';
import { PerformanceProof } from '@/components/home/PerformanceProof';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { HowItWorks } from '@/components/home/HowItWorks';
import { WorkShowcase } from '@/components/home/WorkShowcase';
import { TeamSection } from '@/components/home/TeamSection';
import { ClientResultsSection } from '@/components/home/ClientResultsSection';
import { BlogPreview } from '@/components/home/BlogPreview';
import { AgencyFAQ } from '@/components/home/AgencyFAQ';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <main className="w-full">
      {/* 1. HERO */}
      <Hero />

      {/* 2. PERFORMANCE / SOCIAL PROOF */}
      <PerformanceProof />

      {/* 3. SERVICES */}
      <ServicesPreview />

      {/* 4. HOW IT ACTUALLY WORKS */}
      <HowItWorks />

      {/* 5. RECENT WORK */}
      <WorkShowcase />

      {/* 6. TEAM */}
      <TeamSection />

      {/* 7. CLIENT RESULTS */}
      <ClientResultsSection />

      {/* 8. FAQ */}
      <AgencyFAQ />

      {/* 9. BLOG */}
      <BlogPreview />

      {/* 10. FINAL CTA */}
      <FinalCTA />
    </main>
  );
}

