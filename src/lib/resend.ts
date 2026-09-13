/**
 * Resend Email Integration Helper
 * Dispatches notifications securely on the server without exposing API keys to client.
 */

import { ContactSubmission, CareerApplication } from '@/types';

export async function sendContactNotification(submission: ContactSubmission): Promise<{ success: boolean; id?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log('[Resend] RESEND_API_KEY not configured. Mocking contact email notification for:', submission.email);
    return { success: true, id: `mock_email_${Date.now()}` };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Clyx Media <notifications@clyxmedia.com>',
        to: ['hello@clyxmedia.com'],
        subject: `New Project Inquiry: ${submission.name} (${submission.service})`,
        html: `
          <div style="font-family: sans-serif; background: #111835; color: #fbfcfc; padding: 32px; border-radius: 12px;">
            <h2 style="color: #f8d613; margin-bottom: 24px;">New Client Inquiry</h2>
            <p><strong>Name:</strong> ${submission.name}</p>
            <p><strong>Email:</strong> ${submission.email}</p>
            <p><strong>Company:</strong> ${submission.company || 'N/A'}</p>
            <p><strong>Phone:</strong> ${submission.phone || 'N/A'}</p>
            <p><strong>Service:</strong> ${submission.service}</p>
            <p><strong>Estimated Budget:</strong> ${submission.budget || 'N/A'}</p>
            <div style="margin-top: 24px; padding: 16px; background: #18224b; border-radius: 8px;">
              <h4 style="margin: 0 0 8px 0; color: #9aaecf;">Project Overview:</h4>
              <p style="margin: 0; line-height: 1.5;">${submission.message}</p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Resend] Error sending contact email:', err);
      return { success: false };
    }

    const data = await res.json();
    return { success: true, id: data.id };
  } catch (err) {
    console.error('[Resend] Network error sending contact email:', err);
    return { success: false };
  }
}

export async function sendCareerNotification(application: CareerApplication): Promise<{ success: boolean; id?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log('[Resend] RESEND_API_KEY not configured. Mocking career notification for:', application.email);
    return { success: true, id: `mock_app_email_${Date.now()}` };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Clyx Talent <careers@clyxmedia.com>',
        to: ['careers@clyxmedia.com'],
        subject: `New Application: ${application.name} — ${application.role}`,
        html: `
          <div style="font-family: sans-serif; background: #111835; color: #fbfcfc; padding: 32px; border-radius: 12px;">
            <h2 style="color: #f8d613; margin-bottom: 24px;">New Career Application</h2>
            <p><strong>Role:</strong> ${application.role}</p>
            <p><strong>Applicant Name:</strong> ${application.name}</p>
            <p><strong>Email:</strong> ${application.email}</p>
            <p><strong>Phone:</strong> ${application.phone || 'N/A'}</p>
            <p><strong>Portfolio:</strong> ${application.portfolioUrl || 'N/A'}</p>
            <p><strong>LinkedIn:</strong> ${application.linkedinUrl || 'N/A'}</p>
            <p><strong>Resume:</strong> ${application.resumeUrl || 'N/A'}</p>
            ${
              application.message
                ? `<div style="margin-top: 24px; padding: 16px; background: #18224b; border-radius: 8px;">
                     <h4 style="margin: 0 0 8px 0; color: #9aaecf;">Note:</h4>
                     <p style="margin: 0;">${application.message}</p>
                   </div>`
                : ''
            }
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Resend] Error sending career email:', err);
      return { success: false };
    }

    const data = await res.json();
    return { success: true, id: data.id };
  } catch (err) {
    console.error('[Resend] Network error sending career email:', err);
    return { success: false };
  }
}
