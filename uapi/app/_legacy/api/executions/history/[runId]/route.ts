import { createClient } from '@engi/supabase/ssr/server';
import { supabaseAdmin } from '@engi/supabase';
import { traceRoute } from '@engi/observability';
import {
  createJsonResponse,
  createErrorResponse,
  createAuthErrorResponse,
} from '@engi/responses';

const GETHandler = async (
  request: Request,
  { params }: { params: { runId: string } }
) => {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return createAuthErrorResponse();
  }

  const runId = params.runId;
  if (!runId) {
    return createErrorResponse(new Error('Missing runId parameter'), 400);
  }

  // Fetch execution and verify ownership
  const { data: run, error: runError } = await supabaseAdmin
    .from('executions')
    .select(
      'id, user_id, status, type, guide, input, output, metadata, config, error, started_at, completed_at, created_at, updated_at'
    )
    .eq('id', runId)
    .maybeSingle();

  if (runError) {
    return createErrorResponse(runError);
  }

  if (!run || run.user_id !== user.id) {
    return createErrorResponse(new Error('Execution not found or access denied'), 404);
  }

  // Fetch execution events for the run
  const { data: events, error: eventsError } = await supabaseAdmin
    .from('execution_events')
    .select('id, event_type, event_data, created_at, agent_name, phase, run_id')
    .eq('run_id', runId)
    .order('created_at', { ascending: true });

  if (eventsError) {
    return createErrorResponse(eventsError);
  }

  const normalizedEvents =
    events?.map((event) => ({
      id: event.id,
      created_at: event.created_at,
      event:
        event.event_data && typeof event.event_data === 'object'
          ? (event.event_data as Record<string, unknown>)
          : {
              type: event.event_type,
              agent: event.agent_name,
              phase: event.phase,
              timestamp: event.created_at,
            },
    })) ?? [];

  const { user_id, ...rest } = run as Record<string, unknown>;

  return createJsonResponse({
    run: {
      ...rest,
      guide: (rest.guide as string | null) ?? null,
    },
    events: normalizedEvents,
  });
};

export const GET = traceRoute('/executions/history/:runId', GETHandler);
