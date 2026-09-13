'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { AdminTable } from '@/components/admin/AdminTable';
import { createClient } from '@/lib/supabase/client';
import { SERVICES } from '@/lib/data/services';
import { CmsService } from '@/types/cms';

export default function AdminServicesPage() {
  const [services, setServices] = useState<CmsService[]>([]);
  const [editingService, setEditingService] = useState<CmsService | null>(null);
  const [capabilitiesInput, setCapabilitiesInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error || !data || data.length === 0) {
        const fallback: CmsService[] = SERVICES.map((s, idx) => ({
          id: s.id,
          title: s.title,
          shortDescription: s.shortDescription,
          longDescription: s.longDescription,
          capabilities: s.capabilities,
          sortOrder: idx,
          isActive: true,
        }));
        setServices(fallback);
      } else {
        setServices(
          data.map((item: Record<string, unknown>) => ({
            id: String(item.id),
            title: String(item.title),
            shortDescription: String(item.short_description),
            longDescription: String(item.long_description),
            capabilities: (item.capabilities as string[]) || [],
            sortOrder: Number(item.sort_order) || 0,
            isActive: Boolean(item.is_active),
          }))
        );
      }
    } catch {
      setServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleToggleActive = async (service: CmsService) => {
    const newActive = !service.isActive;
    try {
      const supabase = createClient();
      await supabase
        .from('services')
        .update({ is_active: newActive })
        .eq('id', service.id);

      setServices((prev) =>
        prev.map((s) => (s.id === service.id ? { ...s, isActive: newActive } : s))
      );

      fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/', '/services'] }),
      });
    } catch (err) {
      console.error('Failed to toggle service active state:', err);
    }
  };

  const handleEditClick = (service: CmsService) => {
    setEditingService({ ...service });
    setCapabilitiesInput(service.capabilities.join('\n'));
    setMessage(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setIsSaving(true);
    setMessage(null);

    const caps = capabilitiesInput
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);

    const record = {
      title: editingService.title,
      short_description: editingService.shortDescription,
      long_description: editingService.longDescription,
      capabilities: caps,
      sort_order: Number(editingService.sortOrder) || 0,
      is_active: editingService.isActive,
    };

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('services')
        .update(record)
        .eq('id', editingService.id);

      if (error) throw new Error(error.message);

      setServices((prev) =>
        prev.map((s) => (s.id === editingService.id ? { ...editingService, capabilities: caps } : s))
      );
      setMessage({ type: 'success', text: `Saved "${editingService.title}" successfully.` });

      await fetch('/api/admin/revalidate', {
        method: 'POST',
        body: JSON.stringify({ paths: ['/', '/services'] }),
      });

      setTimeout(() => {
        setEditingService(null);
      }, 1000);
    } catch (err: unknown) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to update service.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <div>
        <h2 className="text-2xl font-black text-[#fbfcfc] tracking-tight">Services &amp; Disciplines Management</h2>
        <p className="text-xs text-[#9aaecf]">
          Manage Clyx Media&apos;s six core performance disciplines, capability offerings, and descriptions
        </p>
      </div>

      <AdminTable isEmpty={services.length === 0} emptyMessage={isLoading ? 'Loading services...' : 'No services found.'}>
        <thead className="border-b border-[rgba(251,252,252,0.08)] bg-[#111835]/50 text-[11px] font-mono text-[#62759e] uppercase">
          <tr>
            <th className="py-3 px-4">Discipline / ID</th>
            <th className="py-3 px-4">Short Description</th>
            <th className="py-3 px-4">Capabilities</th>
            <th className="py-3 px-4">Visibility</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(251,252,252,0.06)]">
          {services.map((s) => (
            <tr key={s.id} className="hover:bg-[#18224b]/40 transition-colors">
              <td className="py-3.5 px-4 max-w-xs">
                <span className="font-bold text-[#fbfcfc] block">{s.title}</span>
                <span className="text-xs text-[#62759e] font-mono">{s.id}</span>
              </td>
              <td className="py-3.5 px-4 text-xs text-[#9aaecf] max-w-md line-clamp-2">
                {s.shortDescription}
              </td>
              <td className="py-3.5 px-4 font-mono text-xs text-[#f8d613]">
                {s.capabilities.length} capabilities
              </td>
              <td className="py-3.5 px-4">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    s.isActive
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-600/30'
                  }`}
                >
                  {s.isActive ? 'Active (Public)' : 'Hidden'}
                </span>
              </td>
              <td className="py-3.5 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleToggleActive(s)}
                    className="text-xs px-2.5 py-1 rounded bg-[#18224b] hover:bg-[#0248c1]/30 text-[#9aaecf] hover:text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] transition-colors"
                  >
                    {s.isActive ? 'Hide' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleEditClick(s)}
                    className="text-xs px-2.5 py-1 rounded bg-[#18224b] hover:bg-[#0248c1] text-[#fbfcfc] border border-[rgba(251,252,252,0.1)] transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>

      {/* Edit Modal / Panel */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0f24]/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#162048] border border-[rgba(251,252,252,0.1)] rounded-3xl p-6 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#fbfcfc]">Edit Discipline: {editingService.title}</h3>
              <button
                onClick={() => setEditingService(null)}
                className="text-[#9aaecf] hover:text-[#fbfcfc] text-lg font-mono"
              >
                ✕
              </button>
            </div>

            {message && (
              <div
                className={`p-3 rounded-xl text-xs ${
                  message.type === 'success'
                    ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200'
                    : 'bg-red-950/60 border border-red-500/40 text-red-200'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
              <FormField
                id="service-title"
                label="Discipline Name"
                required
                value={editingService.title}
                onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
              />

              <FormField
                id="service-short"
                label="Short Description (Cards & Previews)"
                as="textarea"
                rows={2}
                value={editingService.shortDescription}
                onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
              />

              <FormField
                id="service-long"
                label="Long Description (Detail Breakdown)"
                as="textarea"
                rows={4}
                value={editingService.longDescription}
                onChange={(e) => setEditingService({ ...editingService, longDescription: e.target.value })}
              />

              <FormField
                id="service-caps"
                label="Capabilities (One per line)"
                as="textarea"
                rows={5}
                value={capabilitiesInput}
                onChange={(e) => setCapabilitiesInput(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4 pt-2">
                <FormField
                  id="service-order"
                  label="Sort Order"
                  type="number"
                  value={editingService.sortOrder}
                  onChange={(e) => setEditingService({ ...editingService, sortOrder: Number(e.target.value) })}
                />

                <div className="flex flex-col gap-1.5 justify-center pt-2">
                  <label className="text-xs font-mono text-[#9aaecf] uppercase tracking-wider">Public Status</label>
                  <label className="flex items-center gap-2 cursor-pointer mt-2 text-sm text-[#fbfcfc]">
                    <input
                      type="checkbox"
                      checked={editingService.isActive}
                      onChange={(e) => setEditingService({ ...editingService, isActive: e.target.checked })}
                      className="w-4 h-4 rounded bg-[#18224b] border-[rgba(251,252,252,0.2)] text-[#0248c1] focus:ring-[#f8d613]"
                    />
                    Active on Public Website
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[rgba(251,252,252,0.08)]">
                <Button variant="ghost" type="button" onClick={() => setEditingService(null)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Discipline'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
