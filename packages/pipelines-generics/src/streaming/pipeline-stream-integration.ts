/**
 * PIPELINE STREAM INTEGRATION - Connect pipelines to streaming infrastructure
 * 
 * Provides helpers to wire up pipeline executions with stream managers
 * for real-time event emission during pipeline executions.
 */

import { ExecutionStreamAdapter } from '@bitcode/execution-generics';
import { Execution } from '@bitcode/execution-generics/Execution';
import { toPhaseLower, toStepLower } from '../types/primitives';
import { Streamer } from '@bitcode/streams';
import { ExecutionEventsModel } from '@bitcode/orm';

type SupabaseClient = any;

/**
 * Configuration for pipeline streaming
 */
export interface PipelineStreamConfig {
  runId: string;
  userId: string;
  supabase?: SupabaseClient;
  streamToDatabase?: boolean;
  streamToSSE?: boolean;
  structuredToDatabase?: boolean;
}

/**
 * Wire up a pipeline execution with streaming
 * 
 * This registers a stream manager with the execution so that
 * all storage operations emit stream events automatically.
 */
export function enablePipelineStreaming(
  execution: Execution,
  config: PipelineStreamConfig
): Streamer {
  // Create streamer
  const streamer = new Streamer({
    streamId: config.runId,
    userId: config.userId,
  });

  // Register streamer with execution
  ExecutionStreamAdapter.registerStreamer(execution.id, streamer);

  // If database streaming is enabled, wire up event persistence
  if (config.streamToDatabase && config.supabase) {
    // Best-effort: ensure an executions row exists if runId looks like a UUID
    try {
      const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      const isUuid = uuidRe.test(String(config.runId || ''));
      if (isUuid) {
        const now = new Date().toISOString();
        // Try insert; ignore duplicate errors
        config.supabase
          .from('executions')
          .insert({
            id: config.runId,
            user_id: config.userId,
            status: 'running',
            type: 'agentic-execution:asset-pack',
            started_at: now,
            created_at: now,
            updated_at: now
          } as any)
          .then(() => {})
          .catch((e: any) => {
            if (!String(e?.message || '').toLowerCase().includes('duplicate')) {
              // swallow non-duplicate as best-effort
            }
          });
      }
    } catch {}

    const eventsModel = new ExecutionEventsModel(config.supabase);
    
    // Subscribe to stream events and persist them
    streamer.subscribe(async (event) => {
      try {
        await eventsModel.create({
          run_id: config.runId,
          event_type: event.type,
          event_data: event,
          created_at: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Failed to persist stream event:', error);
      }
    });
  }

  // Optional: structured persistence into execution hierarchy tables (planned)
  const structuredEnabled = config.structuredToDatabase ?? (process?.env?.BITCODE_PIPELINE_STRUCTURED_DB === '1');
  if (structuredEnabled && config.supabase) {
    const supabase = config.supabase;
    const phaseState: { currentPhaseId: string | null; currentPhaseName: string | null } = { currentPhaseId: null, currentPhaseName: null };
    const agentStepMap = new Map<string, string>(); // key: agent:step(lower)
    // Optional runtime validation via generated schemas (best-effort)
    let genSchemas: any = null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      genSchemas = require('@bitcode/orm/src/types/generated/asset_pack_execution_storage.generated');
    } catch {}
    const toPascal = (s: string) => s.split('_').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    const validate = (table: string, row: any) => {
      try {
        if (!genSchemas) return row;
        const schemaName = toPascal(table) + 'Schema';
        const schema = genSchemas[schemaName];
        if (schema?.safeParse) {
          const parsed = schema.safeParse(row);
          if (parsed.success) return parsed.data;
        }
      } catch {}
      return row;
    };

    streamer.subscribe(async (event: any) => {
      try {
        const type = String(event?.type || '');
        const es = event?.executionState || {};
        const now = new Date().toISOString();
        // Normalize values
        const phaseName = toPhaseLower((event?.phase || es?.phase || '').toString());
        const agentName = (event?.agent || es?.agent || '').toString();
        const stepType = toStepLower((es?.step || '').toString());

        if (type === 'phase-start') {
          const row: import('../types/db').DPPhaseDelegationInsert = {
            run_id: config.runId,
            phase_name: phaseName!,
            started_at: now,
            status: 'running'
          } as any;
            const vrow = validate('phase_executions', row);
            const { data, error } = await (supabase as any).from('phase_executions').insert(vrow as any).select('id').single();
          if (!error && data) { phaseState.currentPhaseId = data.id; phaseState.currentPhaseName = phaseName ?? null; }
        } else if (type === 'phase-complete') {
          if (phaseState.currentPhaseId) {
            const status = event?.shortCircuited ? 'short_circuited' : 'completed';
            await supabase
              .from('phase_executions' as any)
              .update({ completed_at: now, status })
              .eq('id', phaseState.currentPhaseId);
          }
        } else if (type === 'agent-start') {
          if (phaseState.currentPhaseId && agentName && stepType) {
            const row: import('../types/db').DPAgentStepInsert = {
              phase_delegation_id: phaseState.currentPhaseId!,
              agent_name: agentName,
              step_type: stepType!,
              started_at: now,
              status: 'running'
            } as any;
            const vrow = validate('step_executions', row);
            const { data, error } = await (supabase as any).from('step_executions').insert(vrow as any).select('id').single();
            if (!error && data) {
              agentStepMap.set(`${agentName}:${stepType}`, data.id);
            }
          }
        } else if (type === 'agent-complete') {
          const key = `${agentName}:${stepType}`;
          const id = agentStepMap.get(key);
          if (id) await (supabase as any).from('step_executions').update({ completed_at: now, status: 'completed' }).eq('id', id);
        } else if (type === 'error') {
          // Mark run as failed (best-effort)
          try {
            await supabase
              .from('executions')
              .update({ status: 'failed', completed_at: now })
              .eq('id', config.runId);
          } catch {}
        } else if (type === 'generation') {
          const key = `${agentName}:${stepType}`;
          const agentStepId = agentStepMap.get(key) || null;
          const provider = event?.data?.provider || event?.metadata?.provider || null;
          const model = event?.data?.model || event?.metadata?.model || null;
          const messages = event?.data?.messages || null;
          const response = event?.data?.content ? { content: event.data.content } : (event?.data?.response || null);
          const row: import('../types/db').DPGenerationInsert = {
            run_id: config.runId,
            phase_delegation_id: phaseState.currentPhaseId,
            agent_step_id: agentStepId,
            substep_id: null,
            model_provider: (provider || 'unknown') as any,
            model_name: (model || 'unknown') as any,
            messages: messages as any,
            response: response as any,
            created_at: now as any
          } as any;
          const vrow = validate('generations', row);
          await (supabase as any).from('generations').insert(vrow as any);
        } else if (type === 'tool-use') {
          const key = `${agentName}:${stepType}`;
          const agentStepId = agentStepMap.get(key) || null;
          const toolName = event?.data?.tool || event?.metadata?.toolName || 'tool';
          const toolInput = event?.data?.input || null;
          const toolOutput = event?.data?.output || null;
          const toolError = event?.data?.error ? { message: event.data.error } : null;
          const row: import('../types/db').DPToolExecInsert = {
            agent_step_id: agentStepId,
            substep_id: null,
            tool_name: toolName as any,
            tool_input: toolInput as any,
            tool_output: toolOutput as any,
            tool_error: toolError as any,
            created_at: now as any
          } as any;
          const vrow = validate('tool_executions', row);
          await (supabase as any).from('tool_executions').insert(vrow as any);
        } else if (type === 'status') {
          // Optional enrichment: correlate llm.usage to latest generation for this agent step
          try {
            if (event?.namespace === 'llm' && event?.key === 'usage') {
              const key = `${agentName}:${stepType}`;
              const agentStepId = agentStepMap.get(key) || null;
              if (agentStepId) {
                const { data: last, error: selErr } = await (supabase as any)
                  .from('generations')
                  .select('id')
                  .eq('agent_step_id', agentStepId)
                  .order('created_at', { ascending: false })
                  .limit(1)
                  .maybeSingle();
                if (!selErr && last?.id) {
                  const usage = event?.data || {};
                  await supabase
                    .from('generations')
                    .update({
                      input_tokens: usage.promptTokens ?? usage.inputTokens ?? null,
                      output_tokens: usage.completionTokens ?? usage.outputTokens ?? null,
                      total_tokens: usage.totalTokens ?? null,
                    })
                    .eq('id', last.id);
                }
              }
            }
          } catch (e) {
            // best-effort only
          }
        }

        // If Finish phase completes, mark run completed.
        if (type === 'phase-complete' && phaseName === 'finish') {
          try {
            await supabase
              .from('executions')
              .update({ status: 'completed', completed_at: now })
              .eq('id', config.runId);
          } catch {}
        }
      } catch (err) {
        console.error('Structured stream persistence error', err);
      }
    });
  }

  // Note: Cleanup should be handled by the pipeline implementation
  // when it completes, by calling:
  // ExecutionStreamAdapter.unregisterStreamer(execution.id);

  return streamer;
}

/**
 * Create a streaming-enabled pipeline execution
 * 
 * Convenience function that creates an execution with streaming pre-configured.
 */
export function createStreamingExecution(
  config: PipelineStreamConfig & { parent?: Execution }
): Execution {
      const execution = new Execution(config.runId, config.parent);
  
  // Enable streaming
  enablePipelineStreaming(execution, config);
  
  // Emit initial status event
  ExecutionStreamAdapter.emitEvent(
    execution.id,
    'status' as any,
    {
      message: 'Pipeline execution started',
      runId: config.runId,
      userId: config.userId,
    }
  );
  
  return execution;
}

/**
 * Helper to emit phase transitions
 */
export async function emitPhaseTransition(
  execution: Execution,
  phase: string,
  transition: 'start' | 'complete',
  metadata?: any
): Promise<void> {
  await ExecutionStreamAdapter.emitEvent(
    execution.id,
    transition === 'start' ? 'phase-start' as any : 'phase-complete' as any,
    {
      phase,
      transition,
      ...metadata,
    }
  );
}

/**
 * Helper to emit agent activity
 */
export async function emitAgentActivity(
  execution: Execution,
  agent: string,
  activity: 'start' | 'complete' | 'error',
  metadata?: any
): Promise<void> {
  const eventType = activity === 'error' ? 'error' : `agent-${activity}`;
  
  await ExecutionStreamAdapter.emitEvent(
    execution.id,
    eventType as any,
    {
      agent,
      activity,
      ...metadata,
    }
  );
}

/**
 * Helper to emit tool usage
 */
export async function emitToolUsage(
  execution: Execution,
  tool: string,
  input: any,
  output?: any,
  error?: any
): Promise<void> {
  await ExecutionStreamAdapter.emitEvent(
    execution.id,
    'tool-use' as any,
    {
      tool,
      input,
      output,
      error,
      status: error ? 'failed' : 'success',
    }
  );
}
