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

function normalizeProfilePayload(body: Record<string, unknown>) {
  const username =
    typeof body.username === 'string' && body.username.trim()
      ? body.username.trim()
      : typeof body.email === 'string' && body.email.includes('@')
        ? body.email.split('@')[0]
        : '';

  return {
    username,
    display_name: typeof body.displayName === 'string' ? body.displayName : body.display_name,
    bio: typeof body.bio === 'string' ? body.bio : null,
    company_name: typeof body.companyName === 'string' ? body.companyName : body.company_name,
    avatar_url: typeof body.avatarUrl === 'string' ? body.avatarUrl : body.avatar_url,
    team_members: Array.isArray(body.teamMembers) ? body.teamMembers : body.team_members,
    email: typeof body.email === 'string' ? body.email : null,
    is_verified:
      typeof body.isVerified === 'boolean'
        ? body.isVerified
        : typeof body.is_verified === 'boolean'
          ? body.is_verified
          : null,
  };
}

export async function GET(_request: Request) {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const normalized = normalizeProfilePayload(body);
  if (!normalized.username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from('user_profiles').upsert(
    {
      user_id: user.id,
      ...normalized,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
