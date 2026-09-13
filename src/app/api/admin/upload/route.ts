import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/supabase/server';
import { uploadMedia } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate admin user
    const session = await getAdminSession();
    // In local development without Supabase configured, allow dev uploads
    const isDevWithoutSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!session && !isDevWithoutSupabase) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    // 2. Extract and validate file
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided.' },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File exceeds 10MB limit.' },
        { status: 400 }
      );
    }

    // 3. Delegate to media storage abstraction
    const uploadResult = await uploadMedia(file, 'clyx_cms');

    if (!uploadResult.success) {
      return NextResponse.json(
        { success: false, error: uploadResult.error || 'Upload failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: uploadResult.url,
      publicId: uploadResult.publicId,
    });
  } catch (error) {
    console.error('[Upload API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing upload.' },
      { status: 500 }
    );
  }
}
