/**
 * Executions API Route Handlers
 *
 * Route ownership lives here in the API kitchen-sink package.
 * Lower-level execution semantics remain in retained execution packages and
 * shared normalization helpers below rather than the Next.js FS routes.
 */

import { createJsonResponse } from '@bitcode/responses';
import { supabaseAdmin } from '@bitcode/supabase';
import { createClient } from '@bitcode/supabase/ssr/server';

type JsonRecord = Record<string, unknown>;

type ExecutionHistoryRow = {
  id: string;
  user_id: string;
  created_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  status: string | null;
  type: string | null;
  input: unknown;
  output: unknown;
  context: unknown;
  items: unknown;
  error: unknown;
  total_tokens: number | null;
  total_cost: number | null;
  duration_ms: number | null;
};

type ExecutionEventRow = {
  id: string;
  run_id: string;
  event_type: string;
  event_data: unknown;
  created_at: string | null;
  agent_name: string | null;
  phase: string | null;
};

function toErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === 'string' && error.trim()) return error;
  return fallback;
}

async function requireExecutionRouteUserId() {
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

function asRecord(value: unknown): JsonRecord | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as JsonRecord)
    : null;
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value : null;
}

function asNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function asArray<T = unknown>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function formatDuration(durationMs: number | null) {
  if (!durationMs || durationMs <= 0) return null;

  const totalSeconds = Math.round(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes <= 0) return `${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

function readOutputRecord(row: ExecutionHistoryRow) {
  return asRecord(row.output);
}

function readContextRecord(row: ExecutionHistoryRow) {
  return asRecord(row.context);
}

function readFinalWorkSummary(row: ExecutionHistoryRow) {
  const output = readOutputRecord(row);
  return output ? asRecord(output.final_work_summary) : null;
}

function readProcessingStatsSource(row: ExecutionHistoryRow) {
  const output = readOutputRecord(row);
  const finalWorkSummary = readFinalWorkSummary(row);

  return (
    asRecord(output?.processing_stats) ||
    asRecord(output?.processingStats) ||
    asRecord(finalWorkSummary?.processingStats)
  );
}

function buildProcessingStats(row: ExecutionHistoryRow) {
  const source = readProcessingStatsSource(row);
  const sourceTokens = asRecord(source?.tokens);
  const totalTokens = asNumber(sourceTokens?.total) ?? row.total_tokens;
  const inputTokens = asNumber(sourceTokens?.input);
  const outputTokens = asNumber(sourceTokens?.output);
  const usdTotal = asNumber(source?.usdTotal) ?? row.total_cost;
  const btdUsed = asNumber(source?.btdUsed);
  const averageLatencyMs = asNumber(source?.averageLatencyMs);
  const time = asString(source?.time) || formatDuration(row.duration_ms);
  const modelUsage = Array.isArray(source?.modelUsage) ? source.modelUsage : undefined;

  if (
    !time &&
    totalTokens === null &&
    btdUsed === null &&
    usdTotal === null &&
    averageLatencyMs === null &&
    !modelUsage
  ) {
    return null;
  }

  return {
    time: time || '',
    tokens:
      totalTokens !== null
        ? {
            input: inputTokens ?? 0,
            output: outputTokens ?? 0,
            total: totalTokens,
          }
        : undefined,
    btdUsed: btdUsed ?? undefined,
    usdTotal: usdTotal ?? undefined,
    averageLatencyMs: averageLatencyMs ?? undefined,
    modelUsage,
  };
}

function buildRepoSnapshot(row: ExecutionHistoryRow) {
  const output = readOutputRecord(row);
  const context = readContextRecord(row);
  const finalWorkSummary = readFinalWorkSummary(row);
  const repoSnapshot =
    asRecord(output?.repo_snapshot) ||
    asRecord(output?.repoSnapshot) ||
    asRecord(finalWorkSummary?.repoSnapshot) ||
    asRecord(context?.repo_snapshot) ||
    asRecord(context?.repoSnapshot);

  if (!repoSnapshot) return null;

  const org = asString(repoSnapshot.org);
  const repo = asString(repoSnapshot.repo);
  if (!org || !repo) return null;

  return {
    org,
    repo,
    branch: asString(repoSnapshot.branch) || 'n/a',
    commit: asString(repoSnapshot.commit) || '',
  };
}

function buildSummary(row: ExecutionHistoryRow) {
  const output = readOutputRecord(row);
  const context = readContextRecord(row);
  const finalWorkSummary = readFinalWorkSummary(row);
  const deliverables = asRecord(finalWorkSummary?.deliverables);

  return (
    asString(output?.summary) ||
    asString(finalWorkSummary?.summary) ||
    asString(deliverables?.summary) ||
    asString(context?.summary) ||
    null
  );
}

function buildGuide(row: ExecutionHistoryRow) {
  const context = readContextRecord(row);
  const input = asRecord(row.input);

  return asString(context?.guide) || asString(input?.guide) || null;
}

function buildMetadata(row: ExecutionHistoryRow) {
  return readContextRecord(row);
}

export function normalizeExecutionHistoryRow(row: ExecutionHistoryRow) {
  return {
    id: row.id,
    created_at: row.created_at || new Date().toISOString(),
    started_at: row.started_at,
    completed_at: row.completed_at,
    status: row.status,
    type: row.type,
    guide: buildGuide(row),
    output: readOutputRecord(row),
    metadata: buildMetadata(row),
    context: row.context ?? null,
    items: asArray(row.items),
    summary: buildSummary(row),
    processing_stats: buildProcessingStats(row),
    repo_snapshot: buildRepoSnapshot(row),
    final_work_summary: readFinalWorkSummary(row),
    error: row.error ?? null,
  };
}

export function normalizeExecutionEventRow(row: ExecutionEventRow) {
  const eventPayload = asRecord(row.event_data) || {
    type: row.event_type,
    agent: row.agent_name,
    phase: row.phase,
    timestamp: row.created_at,
  };

  return {
    id: row.id,
    run_id: row.run_id,
    event_type: row.event_type,
    event_data: row.event_data,
    created_at: row.created_at,
    agent_name: row.agent_name,
    phase: row.phase,
    event: eventPayload,
  };
}

export async function getExecutionHistoryRoute(request: Request) {
  const userId = await requireExecutionRouteUserId();
  if (!userId) {
    return createJsonResponse([]);
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
    return createJsonResponse(
      { error: toErrorMessage(error, 'Failed to fetch execution history') },
      500,
    );
  }

  return createJsonResponse((data || []).map(normalizeExecutionHistoryRow));
}

export async function postExecutionHistoryRoute(request: Request) {
  const userId = await requireExecutionRouteUserId();
  if (!userId) {
    return createJsonResponse({ error: 'unauthenticated' }, 401);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return createJsonResponse({ error: 'Invalid JSON' }, 400);
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
      type:
        typeof body.pipeline_type === 'string'
          ? body.pipeline_type
          : typeof body.type === 'string'
            ? body.type
            : 'pipeline:deliverables',
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
    return createJsonResponse(
      { error: toErrorMessage(error, 'Failed to create execution history row') },
      500,
    );
  }

  return createJsonResponse({ execution: normalizeExecutionHistoryRow(data) }, 201);
}

export async function getExecutionHistoryRunRoute(
  _request: Request,
  params: { runId?: string | null | undefined },
) {
  const userId = await requireExecutionRouteUserId();
  if (!userId) {
    return createJsonResponse({ run: null, events: [] });
  }

  const runId = String(params?.runId || '').trim();
  if (!runId) {
    return createJsonResponse({ error: 'Missing runId parameter' }, 400);
  }

  const { data: run, error: runError } = await supabaseAdmin
    .from('executions')
    .select(
      'id, user_id, created_at, started_at, completed_at, status, type, input, output, context, items, error, total_tokens, total_cost, duration_ms',
    )
    .eq('id', runId)
    .maybeSingle();

  if (runError) {
    return createJsonResponse(
      { error: toErrorMessage(runError, 'Failed to fetch selected execution') },
      500,
    );
  }

  if (!run || run.user_id !== userId) {
    return createJsonResponse({ error: 'Execution not found or access denied' }, 404);
  }

  const { data: events, error: eventsError } = await supabaseAdmin
    .from('execution_events')
    .select('id, run_id, event_type, event_data, created_at, agent_name, phase')
    .eq('run_id', runId)
    .order('created_at', { ascending: true });

  if (eventsError) {
    return createJsonResponse(
      { error: toErrorMessage(eventsError, 'Failed to fetch execution event history') },
      500,
    );
  }

  return createJsonResponse({
    run: normalizeExecutionHistoryRow(run),
    events: (events || []).map(normalizeExecutionEventRow),
  });
}
