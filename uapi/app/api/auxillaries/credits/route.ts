import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@bitcode/supabase';
import { createClient } from '@bitcode/supabase/ssr/server';

export const runtime = 'nodejs';

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    return null;
  }

  return user;
}

export async function POST(request: Request) {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from('user_profiles')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle();

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  if (profile?.role !== 'admin' && profile?.role !== 'lead') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: { totalCredits?: number } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const totalCredits = Number(body.totalCredits);
  if (!Number.isFinite(totalCredits) || totalCredits < 0) {
    return NextResponse.json({ error: 'totalCredits must be a non-negative number' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('user_credits')
    .upsert(
      {
        user_id: user.id,
        balance: totalCredits,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabaseAdmin
    .from('user_profiles')
    .update({ updated_at: new Date().toISOString() })
    .eq('user_id', user.id);

  return NextResponse.json({
    success: true,
    newBalance: data?.balance ?? data?.credits ?? totalCredits,
  });
}
