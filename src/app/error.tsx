'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring if needed
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
      <span className="text-xs font-mono uppercase tracking-widest text-red-400 px-3 py-1 bg-[#18224b] rounded-full border border-red-500/20 mb-6">
        System Error
      </span>

      <h1 className="text-3xl sm:text-5xl font-black text-[#fbfcfc] tracking-tight mb-4 max-w-xl">
        Something interrupted the signal.
      </h1>

      <p className="text-sm sm:text-base text-[#9aaecf] max-w-md mb-8">
        An unexpected error occurred while rendering this page. You can try reloading the view or head back home.
      </p>

      <div className="flex items-center gap-4">
        <Button onClick={() => reset()} variant="primary">
          Try Again
        </Button>
        <Button href="/" variant="outline">
          Return Home
        </Button>
      </div>
    </main>
  );
}
