'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: '📊' },
    { label: 'Portfolio', href: '/admin/portfolio', icon: '📁' },
    { label: 'Case Studies', href: '/admin/case-studies', icon: '📈' },
    { label: 'Creators', href: '/admin/creators', icon: '✨' },
    { label: 'Blog', href: '/admin/blog', icon: '✍️' },
    { label: 'Services', href: '/admin/services', icon: '⚙️' },
    { label: 'Careers', href: '/admin/careers', icon: '💼' },
    { label: 'Applications', href: '/admin/applications', icon: '👥' },
    { label: 'Contact Submissions', href: '/admin/contact-submissions', icon: '📬' },
    { label: 'Settings', href: '/admin/settings', icon: '🔧' },
  ];

  return (
    <aside className="w-64 shrink-0 bg-[#0d132b] border-r border-[rgba(251,252,252,0.08)] flex flex-col justify-between min-h-screen p-6">
      <div className="flex flex-col gap-8">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[rgba(251,252,252,0.08)]">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-xl font-black uppercase tracking-wider text-[#fbfcfc]">CLYX</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#f8d613] text-[#111835] font-bold">
              CMS
            </span>
          </Link>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#9aaecf] hover:text-[#f8d613] font-mono flex items-center gap-1"
            title="Open live public site"
          >
            <span>Live</span>
            <span>↗</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = item.href === '/admin'
              ? pathname === '/admin'
              : pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#18224b] text-[#f8d613] border border-[#f8d613]/30 font-semibold'
                    : 'text-[#9aaecf] hover:text-[#fbfcfc] hover:bg-[#162048]'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="pt-6 border-t border-[rgba(251,252,252,0.08)] flex flex-col gap-2 text-[11px] text-[#62759e]">
        <div className="flex items-center justify-between">
          <span>Environment</span>
          <span className="font-mono text-emerald-400">Production</span>
        </div>
        <div className="flex items-center justify-between">
          <span>RLS Active</span>
          <span className="font-mono text-[#f8d613]">Enforced</span>
        </div>
      </div>
    </aside>
  );
};
