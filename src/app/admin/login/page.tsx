'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message || 'Invalid administrator credentials.');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#0a0f24] text-[#fbfcfc]">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#111835] border border-[rgba(251,252,252,0.12)] shadow-2xl flex flex-col gap-6">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <span className="text-2xl font-black tracking-widest uppercase text-[#fbfcfc]">CLYX</span>
            <span className="w-2 h-2 rounded-full bg-[#f8d613]" />
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-[#fbfcfc]">
            Administrator Portal
          </h1>
          <p className="text-xs text-[#9aaecf]">
            Sign in with your verified Supabase credentials to manage content and applications.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/60 border border-red-500/30 rounded-xl text-xs text-red-300">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <FormField
            id="admin-email"
            label="Admin Email"
            type="email"
            required
            placeholder="admin@clyxmedia.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormField
            id="admin-password"
            label="Password"
            type="password"
            required
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center mt-2"
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'Sign In to CMS →'}
          </Button>
        </form>

        <div className="pt-4 border-t border-[rgba(251,252,252,0.08)] flex items-center justify-between text-xs text-[#62759e]">
          <Link href="/" className="hover:text-[#f8d613] transition-colors">
            ← Back to Public Website
          </Link>
          <span className="font-mono text-[11px]">RLS Protected</span>
        </div>
      </div>
    </div>
  );
}
