'use client';

import React, { useState } from 'react';

interface MediaUploaderProps {
  onUploadSuccess: (url: string) => void;
  label?: string;
  currentUrl?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  onUploadSuccess,
  label = 'Media Asset',
  currentUrl,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentUrl || '');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (< 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit.');
      return;
    }

    // Validate types (Images & MP4/WebM videos)
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'application/pdf'];
    if (!allowed.includes(file.type)) {
      setError('Unsupported file format. Please use JPG, PNG, WEBP, MP4, or PDF.');
      return;
    }

    setError('');
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      setPreview(data.url);
      onUploadSuccess(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#9aaecf]">
        {label}
      </span>

      <div className="flex items-center gap-4">
        {preview && (
          <div className="w-16 h-16 rounded-xl bg-[#111835] border border-[rgba(251,252,252,0.15)] flex items-center justify-center overflow-hidden shrink-0">
            {preview.endsWith('.mp4') ? (
              <span className="text-xs font-mono text-[#f8d613]">VIDEO</span>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Asset preview" className="w-full h-full object-cover" />
            )}
          </div>
        )}

        <label className="flex-1 flex flex-col items-center justify-center p-4 border border-dashed border-[rgba(251,252,252,0.2)] hover:border-[#f8d613] rounded-xl cursor-pointer bg-[#18224b]/40 transition-colors">
          <span className="text-xs text-[#9aaecf] font-medium">
            {isUploading ? 'Uploading asset...' : 'Choose file or drag & drop (JPG, PNG, WEBP, MP4)'}
          </span>
          <span className="text-[10px] text-[#62759e] mt-0.5">Maximum size: 10MB</span>
          <input
            type="file"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
            accept="image/*,video/mp4,video/webm,application/pdf"
          />
        </label>
      </div>

      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};
