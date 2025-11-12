/**
 * Instructions API
 *
 * GET/POST for execution instructions (Notes/OTF Notes during execution).
 * Persists execution instructions and streams updates.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { createJsonResponse, createAuthErrorResponse } from '@engi/responses';

/**
 * GET /api/executions/instructions?runId=X
 * Returns instructions for an execution.
 * Returns all instructions for the execution ordered by creation time.
 */
const GETHandler = async (request: NextRequest) => {
  const runId = request.nextUrl.searchParams.get('runId');

  if (!runId) {
    return NextResponse.json({ error: 'Missing runId parameter' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return createAuthErrorResponse();
  }

  const { data, error } = await supabase
    .from('instructions')
    .select('id, execution_id, content, created_at')
    .eq('execution_id', runId)
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: 'Failed to load instructions' }, { status: 500 });
  }

  const normalized = (data ?? []).map((row) => ({
    id: row.id,
    execution_id: row.execution_id,
    content: row.content,
    created_at: row.created_at,
    state: 'accepted',
    attachments: [],
  }));

  return createJsonResponse(normalized);
};

/**
 * POST /api/executions/instructions
 * Submits instruction for an execution.
 * Persists the instruction and notifies active execution streams.
 */
const POSTHandler = async (request: NextRequest) => {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return createAuthErrorResponse();
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { runId, content } = body;

  if (!runId || !content) {
    return NextResponse.json({ error: 'Missing runId or content' }, { status: 400 });
  }

  // Persist instruction
  const { data: instruction, error } = await supabase
    .from('instructions')
    .insert({
      execution_id: runId,
      content
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to save instruction' }, { status: 500 });
  }

  // Add to active execution state (if running)
  const { getExecution } = await import('@engi/execution-generics');
  const execution = getExecution(runId);

  if (execution) {
    execution.store('instructions', 'pending', instruction);
  }

  const { supabaseAdmin } = await import('@engi/supabase');

  // Emit SSE event
  await supabaseAdmin.from('stream_logs').insert({
    run_id: runId,
    type: 'instruction',
    message: content,
    metadata: { instructionId: instruction.id }
  });

  const responseBody = {
    ...instruction,
    state: 'accepted',
    attachments: [],
  };

  return createJsonResponse(responseBody, 201);
};

export const GET = traceRoute('/executions/instructions', GETHandler);
export const POST = traceRoute('/executions/instructions', POSTHandler);
