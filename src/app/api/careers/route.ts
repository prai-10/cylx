import { NextRequest, NextResponse } from 'next/server';
import { CareerApplication } from '@/types';
import { insertCareerApplication } from '@/lib/supabase/server';
import { sendCareerNotification } from '@/lib/resend';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CareerApplication;

    // Validate essential fields
    if (!body.name?.trim() || !body.email?.trim() || !body.role?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and target role are required.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 1. Store application in Supabase
    const dbResult = await insertCareerApplication(body);

    // 2. Dispatch notification via Resend
    await sendCareerNotification(body);

    return NextResponse.json({
      success: true,
      message: 'Application received successfully.',
      id: dbResult.id,
    });
  } catch (error) {
    console.error('API /api/careers error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error processing career application.' },
      { status: 500 }
    );
  }
}
