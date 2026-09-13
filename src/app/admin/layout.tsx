import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { getAdminSession } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'CLYX CMS — Administration Portal',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname = headerList.get('x-pathname') || '';

  // If on login page, render children directly without sidebar
  if (pathname.includes('/admin/login')) {
    return <>{children}</>;
  }

  // Verify session on server
  const session = await getAdminSession();
  const isDevWithoutSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL;

  // In production, require authenticated admin session
  if (!session && !isDevWithoutSupabase) {
    redirect('/admin/login');
  }

  const userEmail = session?.user?.email || 'admin@clyxmedia.com (Dev Session)';

  return (
    <div className="min-h-screen flex bg-[#0e142e] text-[#fbfcfc]">
      {/* Persistent Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title="CLYX Media Content Management"
          subtitle="Real-time content engine, whitelisting bench & lead management"
          userEmail={userEmail}
        />

        {isDevWithoutSupabase && (
          <div className="px-8 py-2 bg-amber-500/10 border-b border-amber-500/20 text-amber-300 text-xs font-mono flex items-center justify-between">
            <span>⚠️ Supabase credentials unconfigured in .env.local — Running in development mode with active fallback data.</span>
            <span className="underline">Configure Supabase for live DB</span>
          </div>
        )}

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
