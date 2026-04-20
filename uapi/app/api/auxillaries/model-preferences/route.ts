import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@bitcode/supabase';
import { createClient } from '@bitcode/supabase/ssr/server';

import { buildMockOrbitalData, isUserOrbitalMockMode } from '../../../../lib/mock-review-mode';

export const runtime = 'nodejs';

async function getAuthenticatedUser() {
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

async function getProfileRole(userId: string) {
  const { data: profile, error } = await supabaseAdmin
    .from('user_profiles')
    .select('role')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    return { role: null, error };
  }

  return {
    role: profile?.role || null,
    error: null,
  };
}

export async function GET() {
  if (isUserOrbitalMockMode()) {
    return NextResponse.json({
      success: true,
      preferences: buildMockOrbitalData().modelPreferences,
    });
  }

  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from('user_model_preferences')
    .select('preferences')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    preferences: data?.preferences || null,
  });
}

export async function POST(request: Request) {
  if (isUserOrbitalMockMode()) {
    return NextResponse.json({
      success: true,
      preferences: buildMockOrbitalData().modelPreferences,
    });
  }

  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { role, error: roleError } = await getProfileRole(user.id);
  if (roleError) {
    return NextResponse.json({ error: roleError.message }, { status: 500 });
  }

  if (role !== 'lead' && role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from('user_model_preferences')
    .upsert(
      {
        user_id: user.id,
        preferences: body,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
