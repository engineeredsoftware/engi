import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@bitcode/supabase';
import { createClient } from '@bitcode/supabase/ssr/server';

import { normalizeExecutionEventRow, normalizeExecutionHistoryRow } from '../../_shared';

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

export async function GET(_request: Request, { params }: { params: { runId: string } }) {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ run: null, events: [] });
  }

  const runId = String(params?.runId || '').trim();
  if (!runId) {
    return NextResponse.json({ error: 'Missing runId parameter' }, { status: 400 });
  }

  const { data: run, error: runError } = await supabaseAdmin
    .from('executions')
    .select(
      'id, user_id, created_at, started_at, completed_at, status, type, input, output, context, items, error, total_tokens, total_cost, duration_ms',
    )
    .eq('id', runId)
    .maybeSingle();

  if (runError) {
    return NextResponse.json(
      { error: toErrorMessage(runError, 'Failed to fetch selected execution') },
      { status: 500 },
    );
  }

  if (!run || run.user_id !== userId) {
    return NextResponse.json({ error: 'Execution not found or access denied' }, { status: 404 });
  }

  const { data: events, error: eventsError } = await supabaseAdmin
    .from('execution_events')
    .select('id, run_id, event_type, event_data, created_at, agent_name, phase')
    .eq('run_id', runId)
    .order('created_at', { ascending: true });

  if (eventsError) {
    return NextResponse.json(
      { error: toErrorMessage(eventsError, 'Failed to fetch execution event history') },
      { status: 500 },
    );
  }

  return NextResponse.json({
    run: normalizeExecutionHistoryRow(run),
    events: (events || []).map(normalizeExecutionEventRow),
  });
}
