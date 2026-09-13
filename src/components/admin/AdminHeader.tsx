'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  userEmail?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, userEmail }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('[AdminHeader] Sign out error:', err);
    } finally {
      router.push('/admin/login');
      router.refresh();
    }
  };

  return (
    <header className="w-full bg-[#111835] border-b border-[rgba(251,252,252,0.08)] px-8 py-5 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-black text-[#fbfcfc] tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-[#9aaecf] mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {userEmail && (
          <span className="text-xs font-mono text-[#9aaecf] bg-[#18224b] px-3 py-1.5 rounded-full border border-[rgba(251,252,252,0.08)] hidden sm:inline-block">
            {userEmail}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="text-xs font-medium px-3.5 py-1.5 bg-[#18224b] hover:bg-red-950/40 text-[#9aaecf] hover:text-red-300 border border-[rgba(251,252,252,0.1)] hover:border-red-500/30 rounded-full transition-all cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};
