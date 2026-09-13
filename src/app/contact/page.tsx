import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact & Growth Call — CLYX',
  description: 'Book a growth call with CLYX Media. We turn organic clips into scaled ad accounts across Meta & Google.',
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Col: Client Contact Details & Positioning */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] px-3 py-1 bg-[#001840] rounded-full border border-[rgba(255,253,240,0.12)] inline-block mb-4">
              Get in touch
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-[#FFFDF0] tracking-tight mb-6 leading-[1.05]">
              Ready to make your creators sell?
            </h1>
            <p className="text-base sm:text-lg text-[#9aaecf] leading-relaxed mb-8 font-normal">
              Book a growth call with our media buyers and creator managers. We will audit your product category, check competitor creator hooks, and outline a whitelisted ad roadmap.
            </p>

            <div className="flex flex-col gap-6 py-8 border-y border-[rgba(255,253,240,0.12)]">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#7d93b8] block mb-1">
                  Direct Email
                </span>
                <a
                  href="mailto:hello@clyxmedia.com"
                  className="text-lg font-bold text-[#FFFDF0] hover:text-[#F5C400] transition-colors font-mono"
                >
                  hello@clyxmedia.com
                </a>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#7d93b8] block mb-1">
                  Instant Messaging
                </span>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-[#F5C400] hover:underline flex items-center gap-1.5 font-mono"
                >
                  <span>WhatsApp us directly</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#7d93b8] block mb-1">
                  Brand Positioning
                </span>
                <p className="text-sm font-semibold text-[#FFFDF0]">
                  Performance marketing · Creator ads · Web
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 text-xs font-mono text-[#7d93b8] hidden lg:block">
            <p>Direct access to media buyers. Zero middle management.</p>
          </div>
        </div>

        {/* Right Col: Contact & Growth Call Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
