import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6 py-20">
      <span className="text-xs font-mono uppercase tracking-widest text-[#f8d613] px-3 py-1 bg-[#18224b] rounded-full border border-[rgba(251,252,252,0.1)] mb-6">
        Error 404
      </span>

      <h1 className="text-4xl sm:text-6xl font-black text-[#fbfcfc] tracking-tight mb-4 max-w-xl">
        You scrolled off the map.
      </h1>

      <p className="text-sm sm:text-base text-[#9aaecf] max-w-md mb-8 leading-relaxed">
        The route you are looking for does not exist or has moved. Head back to the homepage or explore our work.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button href="/" variant="primary">
          Return Home
        </Button>
        <Button href="/work" variant="outline">
          Explore Work
        </Button>
        <Button href="/contact" variant="secondary">
          Contact Agency
        </Button>
      </div>
    </main>
  );
}
