import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@bitcode/supabase';
import { createClient } from '@bitcode/supabase/ssr/server';

export const runtime = 'nodejs';

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
}

function asString(value: unknown) {
  return typeof value === 'string' ? value : null;
}

async function readAuthenticatedUserId() {
  try {
    const supabase = await createClient();
    const auth = await supabase?.auth?.getUser?.();
    return auth?.data?.user?.id || null;
  } catch {
    return null;
  }
}

function normalizeInstruction(row: JsonRecord) {
  const instructionData = asRecord(row.instruction_data);
  const content = asString(row.content) || asString(instructionData.content) || '';
  const attachments =
    row.attachments !== undefined
      ? row.attachments
      : instructionData.attachments !== undefined
        ? instructionData.attachments
        : null;
  const state =
    asString(row.state) ||
    asString(instructionData.state) ||
    (row.is_processed ? 'processed' : 'accepted');

  return {
    id: asString(row.id) || '',
    content,
    attachments,
    state,
    created_at: asString(row.created_at) || new Date().toISOString(),
  };
}

async function resolveQueryResult(query: any) {
  return query && typeof query.then === 'function' ? query : Promise.resolve(query);
}

export async function GET(request: Request) {
  const userId = await readAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const runId = new URL(request.url).searchParams.get('runId');
  if (!runId) {
    return NextResponse.json({ error: 'runId is required' }, { status: 400 });
  }

  let query: any = supabaseAdmin
    .from('run_otf_instructions')
    .select('*');

  if (typeof query.eq === 'function') {
    query = query.eq('run_id', runId);
  }
  if (typeof query.order === 'function') {
    query = query.order('created_at', { ascending: true });
  }

  const { data, error } = await resolveQueryResult(query);
  if (error) {
    return NextResponse.json({ error: error.message || 'Failed to fetch execution instructions' }, { status: 500 });
  }

  return NextResponse.json((Array.isArray(data) ? data : []).map((row) => normalizeInstruction(asRecord(row))));
}

export async function POST(request: Request) {
  const userId = await readAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  let body: JsonRecord;
  try {
    body = asRecord(await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const runId = asString(body.runId);
  const content = asString(body.content)?.trim();
  if (!runId || !content) {
    return NextResponse.json({ error: 'runId and content are required' }, { status: 400 });
  }

  const attachments = body.attachments ?? null;
  const instructionPayload = {
    content,
    attachments,
    state: 'accepted',
    submittedBy: userId,
  };

  let insertQuery: any = supabaseAdmin
    .from('run_otf_instructions')
    .insert({
      run_id: runId,
      instruction_type: 'user_instruction',
      instruction_data: instructionPayload,
      is_processed: false,
    });

  if (typeof insertQuery.select === 'function') {
    insertQuery = insertQuery.select('*');
  }
  const insertResult = typeof insertQuery.single === 'function'
    ? await insertQuery.single()
    : await resolveQueryResult(insertQuery);

  if (insertResult.error) {
    return NextResponse.json({ error: insertResult.error.message || 'Failed to store execution instruction' }, { status: 500 });
  }

  const instruction = normalizeInstruction(asRecord(insertResult.data || instructionPayload));

  await resolveQueryResult(
    supabaseAdmin
      .from('execution_events')
      .insert({
        run_id: runId,
        event_type: 'instruction',
        event_data: {
          instruction,
          source: 'asset_pack_execution_instruction',
        },
        agent_name: null,
        phase: null,
      }),
  );

  return NextResponse.json(instruction, { status: 201 });
}
