'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { Job } from '@/types';

interface CareerApplicationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CareerApplicationModal: React.FC<CareerApplicationModalProps> = ({
  job,
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: job ? job.title : '',
    portfolioUrl: '',
    linkedinUrl: '',
    resumeUrl: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Update role when job prop changes
  React.useEffect(() => {
    if (job) {
      setFormData((prev) => ({ ...prev, role: job.title }));
    }
  }, [job]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.role.trim()) errs.role = 'Role is required';
    if (!formData.portfolioUrl.trim() && !formData.linkedinUrl.trim()) {
      errs.portfolioUrl = 'Please provide either a portfolio URL or LinkedIn profile';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit application');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: job ? job.title : '',
        portfolioUrl: '',
        linkedinUrl: '',
        resumeUrl: '',
        message: '',
      });
    } catch (err: unknown) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Apply: ${job ? job.title : 'Open Application'}`}
      maxWidth="max-w-2xl"
    >
      {submitStatus === 'success' ? (
        <div className="py-8 text-center flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#f8d613]/20 text-[#f8d613] flex items-center justify-center font-bold text-xl">
            ✓
          </div>
          <h3 className="text-2xl font-bold text-[#fbfcfc]">Application Received</h3>
          <p className="text-sm text-[#9aaecf] max-w-md">
            Thank you for applying to Clyx Media. Our recruitment squad reviews every application carefully. If your background aligns with our open positions, we will reach out directly.
          </p>
          <Button onClick={onClose} variant="primary" className="mt-4">
            Close Window
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {submitStatus === 'error' && (
            <div className="p-3 bg-red-950/50 border border-red-500/30 rounded-lg text-xs text-red-300">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="career-name"
              label="Full Name"
              required
              placeholder="Alex Rivers"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />

            <FormField
              id="career-email"
              label="Email Address"
              type="email"
              required
              placeholder="alex@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="career-phone"
              label="Phone (Optional)"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <FormField
              id="career-role"
              label="Target Role"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              error={errors.role}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="career-portfolio"
              label="Portfolio / Showreel URL"
              placeholder="https://portfolio.design"
              value={formData.portfolioUrl}
              onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
              error={errors.portfolioUrl}
            />

            <FormField
              id="career-linkedin"
              label="LinkedIn URL"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
            />
          </div>

          <FormField
            id="career-resume"
            label="Resume Link (Google Drive / Cloudinary / Dropbox)"
            placeholder="https://drive.google.com/..."
            value={formData.resumeUrl}
            onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
            helperText="Provide a public link to your resume or PDF doc"
          />

          <FormField
            id="career-message"
            label="Why Clyx? (Optional)"
            as="textarea"
            rows={3}
            placeholder="Tell us about a project you loved shipping or what you want to build here..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[rgba(251,252,252,0.08)] mt-2">
            <Button type="button" onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting Application...' : 'Send Application →'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
