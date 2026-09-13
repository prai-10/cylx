import { NextRequest, NextResponse } from 'next/server';
import { ContactSubmission } from '@/types';
import { insertContactSubmission } from '@/lib/supabase/server';
import { sendContactNotification } from '@/lib/resend';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactSubmission;

    // Validate essential fields
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and project message are required.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 1. Store in Supabase database
    const dbResult = await insertContactSubmission(body);

    // 2. Dispatch email notification via Resend
    await sendContactNotification(body);

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully.',
      id: dbResult.id,
    });
  } catch (error) {
    console.error('API /api/contact error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error processing contact submission.' },
      { status: 500 }
    );
  }
}
