'use client';

import React, { useState } from 'react';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { ContactSubmission } from '@/types';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: 'Performance Marketing',
    budget: '₹5L - ₹15L / mo',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const serviceOptions = [
    { value: 'Performance Marketing', label: 'Performance Marketing (Meta & Google)' },
    { value: 'Influencer Marketing', label: 'Influencer Marketing & Creator Bench' },
    { value: 'UGC Videos', label: 'UGC Videos & Creative Hook Direction' },
    { value: 'Social Media Management', label: 'Social Media Management & Strategy' },
    { value: 'Website Development', label: 'Website Development (Conversion-Built)' },
    { value: 'Shopify Store', label: 'Shopify Store Development & CRO' },
    { value: 'Full Growth Engine', label: 'Full Growth Engine (All Disciplines)' },
  ];

  const budgetOptions = [
    { value: '< ₹5L / mo', label: 'Under ₹5 Lakhs / month' },
    { value: '₹5L - ₹15L / mo', label: '₹5L – ₹15 Lakhs / month' },
    { value: '₹15L - ₹40L / mo', label: '₹15L – ₹40 Lakhs / month' },
    { value: '₹40L+ / mo', label: '₹40 Lakhs+ / month' },
    { value: 'To Be Discussed', label: 'To Be Discussed on Growth Call' },
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your work email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide details about your brand or ad spend goals';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit inquiry');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: 'Performance Marketing',
        budget: '₹5L - ₹15L / mo',
        message: '',
      });
    } catch (err: unknown) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="p-8 sm:p-14 rounded-3xl bg-[#001840]/60 border border-[#F5C400]/40 text-center flex flex-col items-center gap-5 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#F5C400]/20 text-[#F5C400] flex items-center justify-center font-bold text-2xl">
          ✓
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-[#FFFDF0] tracking-tight">Growth Call Scheduled</h3>
        <p className="text-sm sm:text-base text-[#9aaecf] max-w-md leading-relaxed font-normal">
          Thank you for reaching out to CLYX. Our performance leads will review your store metrics and send calendar invites within 24 hours.
        </p>
        <Button
          onClick={() => setSubmitStatus('idle')}
          variant="outline"
          size="md"
          className="mt-4"
        >
          Send Another Note
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-12 rounded-3xl bg-[#001840]/50 border border-[rgba(255,253,240,0.12)] flex flex-col gap-6 shadow-2xl">
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-200">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          id="contact-name"
          label="Your Name"
          required
          placeholder="Rohan Sharma"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />

        <FormField
          id="contact-email"
          label="Work Email"
          type="email"
          required
          placeholder="rohan@brand.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          id="contact-company"
          label="Brand / Store URL"
          placeholder="brand.com"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />

        <FormField
          id="contact-phone"
          label="Phone / WhatsApp (Optional)"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          id="contact-service"
          label="Primary Growth Discipline"
          as="select"
          options={serviceOptions}
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
        />

        <FormField
          id="contact-budget"
          label="Estimated Monthly Ad Spend"
          as="select"
          options={budgetOptions}
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
        />
      </div>

      <FormField
        id="contact-message"
        label="Current ROAS &amp; Scaling Goals"
        as="textarea"
        rows={4}
        required
        placeholder="Share your current daily ad spend, primary acquisition channels, and what CPA or ROAS targets you need to hit..."
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        error={errors.message}
      />

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Booking Call...' : 'Book a growth call →'}
        </Button>
      </div>
    </form>
  );
};
