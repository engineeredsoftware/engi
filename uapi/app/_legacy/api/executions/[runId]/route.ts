import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from '@engi/responses';
import { supabaseAdmin } from '@engi/supabase';

const DELETEHandler = async (
  request: Request,
  { params }: { params: { runId: string } }
) => {
  const { runId } = params;
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return createAuthErrorResponse();

    // Verify ownership
    const { data: run, error: fetchErr } = await supabaseAdmin
      .from('executions')
      .select('user_id, status')
      .eq('id', runId)
      .maybeSingle();
    if (fetchErr || !run || run.user_id !== user.id) {
      return createErrorResponse(new Error('Run not found or access denied'), 404);
    }

    // Update status to cancelled
    const { error: updErr } = await supabaseAdmin
      .from('executions')
      .update({ status: 'cancelled', completed_at: new Date().toISOString() })
      .eq('id', runId);
    if (updErr) return createErrorResponse(updErr);

    // Emit best-effort cancellation event
    try {
      await supabaseAdmin
        .from('execution_events')
        .insert({
          run_id: runId,
          event_type: 'status',
          event_data: {
            type: 'status', message: 'cancelled', timestamp: new Date().toISOString(), runId,
          } as any,
        } as any);
    } catch {}

    return createJsonResponse({ success: true, runId, status: 'cancelled' });
  } catch (err) {
    return createErrorResponse(err);
  }
};

export const DELETE = traceRoute('/executions/:runId', DELETEHandler);

/**
 * PUT handler for execution updates
 * Used for meta-phase transitions and other state updates
 */
const PUTHandler = async (
  request: Request,
  { params }: { params: { runId: string } }
) => {
  const { runId } = params;

  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return createAuthErrorResponse();

    const body = await request.json();
    const { gate, status } = body;

    // Verify ownership
    const { data: run } = await supabaseAdmin
      .from('executions')
      .select('user_id, guide, metadata')
      .eq('id', runId)
      .maybeSingle();

    if (!run || run.user_id !== user.id) {
      return createErrorResponse(new Error('Execution not found or access denied'), 404);
    }

    const existingMetadata = (run.metadata || {}) as Record<string, any>;

    // Prepare update
    const updates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (gate) updates.guide = gate;
    if (status) {
      if (status === 'completed' && (run.guide || '').toLowerCase() === 'digest') {
        const digestMeta = existingMetadata.digest || {};
        if (!digestMeta.agentsDocUpdated) {
          return createErrorResponse(new Error('Digest guide must update .ai/AGENTS.md before shipping'), 400);
        }
        updates.metadata = {
          ...existingMetadata,
          digest: {
            ...digestMeta,
            shippedAt: new Date().toISOString()
          }
        };
      }
      updates.status = status;
    }

    // Update execution
    const { data, error } = await supabaseAdmin
      .from('executions')
      .update(updates)
      .eq('id', runId)
      .select()
      .single();

    if (error) {
      return createErrorResponse(error);
    }

    // Emit event for gate transitions
    if (gate) {
      await supabaseAdmin.from('stream_logs').insert({
        run_id: runId,
        type: 'gate_transition',
        message: `Transitioned to ${gate} guide`,
        metadata: { to: gate, triggeredBy: 'user' }
      });
    }

    const { guide, ...rest } = data as any;

    return createJsonResponse({
      success: true,
      execution: {
        ...rest,
        guide: guide || null
      }
    });
  } catch (err) {
    return createErrorResponse(err);
  }
};

export const PUT = traceRoute('/executions/:runId', PUTHandler);
