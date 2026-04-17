import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@bitcode/supabase';
import { createClient } from '@bitcode/supabase/ssr/server';

import { normalizeExecutionHistoryRow } from '../_shared';

export const runtime = 'nodejs';

function toErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === 'string' && error.trim()) return error;
  return fallback;
}

async function requireUserId() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user.id;
}

export async function GET(request: Request) {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json([]);
  }

  const url = new URL(request.url);
  const requestedType = url.searchParams.get('type');

  let query = supabaseAdmin
    .from('executions')
    .select(
      'id, user_id, created_at, started_at, completed_at, status, type, input, output, context, items, error, total_tokens, total_cost, duration_ms',
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (requestedType) {
    query = query.eq('type', requestedType);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json(
      { error: toErrorMessage(error, 'Failed to fetch execution history') },
      { status: 500 },
    );
  }

  return NextResponse.json((data || []).map(normalizeExecutionHistoryRow));
}

export async function POST(request: Request) {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const now = new Date().toISOString();
  const items = Array.isArray(body.items) ? body.items : [];
  const output =
    (body.output as Record<string, unknown> | null | undefined) ||
    (body.output_data as Record<string, unknown> | null | undefined) ||
    null;
  const context =
    (body.context as Record<string, unknown> | null | undefined) ||
    (body.metadata as Record<string, unknown> | null | undefined) ||
    null;

  const { data, error } = await supabaseAdmin
    .from('executions')
    .insert({
      user_id: userId,
      type: typeof body.pipeline_type === 'string' ? body.pipeline_type : typeof body.type === 'string' ? body.type : 'pipeline:deliverables',
      status: typeof body.status === 'string' ? body.status : 'pending',
      input: (body.input as Record<string, unknown> | null | undefined) || null,
      output,
      context,
      items,
      created_at: now,
      updated_at: now,
    })
    .select(
      'id, user_id, created_at, started_at, completed_at, status, type, input, output, context, items, error, total_tokens, total_cost, duration_ms',
    )
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: toErrorMessage(error, 'Failed to create execution history row') },
      { status: 500 },
    );
  }

  return NextResponse.json({ execution: normalizeExecutionHistoryRow(data) }, { status: 201 });
}
