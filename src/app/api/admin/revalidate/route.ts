import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    const isDevWithoutSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!session && !isDevWithoutSupabase) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized.' },
        { status: 401 }
      );
    }

    const { paths } = (await req.json()) as { paths?: string[] };
    const revalidateTargets = paths && paths.length > 0
      ? paths
      : ['/', '/portfolio', '/case-studies', '/creators', '/blog', '/services', '/careers'];

    for (const p of revalidateTargets) {
      revalidatePath(p);
    }

    return NextResponse.json({
      success: true,
      message: `Revalidated ${revalidateTargets.length} paths successfully.`,
      paths: revalidateTargets,
    });
  } catch (error) {
    console.error('[Revalidate API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to revalidate cache.' },
      { status: 500 }
    );
  }
}
