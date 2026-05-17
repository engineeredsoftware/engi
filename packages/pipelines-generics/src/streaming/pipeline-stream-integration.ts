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
  pipelineRunId?: string | null;
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

  // Optional structured persistence into the AssetPack execution hierarchy.
  const structuredEnabled = config.structuredToDatabase ?? (process?.env?.BITCODE_PIPELINE_STRUCTURED_DB === '1');
  if (structuredEnabled && config.supabase) {
    const supabase = config.supabase;
    const phaseState: { currentPhaseId: string | null; currentPhaseName: string | null } = {
      currentPhaseId: null,
      currentPhaseName: null,
    };
    const phaseIdByName = new Map<string, string>();
    const agentStepMap = new Map<string, string>();
    const generationMessagesByContext = new Map<string, unknown>();
    const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const deliverableRunId = String(config.runId || '');
    const canPersistDeliverableHierarchy = uuidRe.test(deliverableRunId);
    let deliverableRunReady: Promise<boolean> | null = null;

    const insertRow = async (table: string, row: any, returningId = false) => {
      const query = (supabase as any).from(table).insert(row);
      return returningId && query?.select
        ? query.select('id').single()
        : query;
    };

    const updateRows = async (table: string, patch: any, column: string, value: string) => {
      return (supabase as any).from(table).update(patch).eq(column, value);
    };

    const ensureDeliverableRun = (): Promise<boolean> => {
      if (!canPersistDeliverableHierarchy) {
        return Promise.resolve(false);
      }
      if (!deliverableRunReady) {
        const now = new Date().toISOString();
        deliverableRunReady = Promise.resolve(
          insertRow('deliverable_pipeline_runs', {
            id: deliverableRunId,
            user_id: config.userId,
            pipeline_run_id: config.pipelineRunId ?? null,
            pipeline_type: 'asset_pack',
            status: 'running',
            started_at: now,
            created_at: now,
            updated_at: now,
            input_data: {
              runId: config.runId,
              executionId: execution.id,
            },
            config: {
              structuredStreaming: true,
              streamToDatabase: config.streamToDatabase === true,
            },
            context: {
              bitcodePipelineHarness: true,
              source: 'pipeline-stream-integration',
            },
          })
        )
          .then(async (result: any) => {
            const message = String(result?.error?.message || result?.message || '').toLowerCase();
            const duplicate = message.includes('duplicate') || message.includes('already exists');
            if (duplicate && config.pipelineRunId) {
              await updateRows('deliverable_pipeline_runs', {
                pipeline_run_id: config.pipelineRunId,
                updated_at: new Date().toISOString(),
              }, 'id', deliverableRunId).catch(() => {});
            }
            return !message || duplicate;
          })
          .catch((error: any) => {
            const message = String(error?.message || '').toLowerCase();
            return message.includes('duplicate') || message.includes('already exists');
          });
      }
      return deliverableRunReady;
    };

    const persistDeliverableEvent = async (event: any, phaseName: string | null, agentName: string | null) => {
      if (!(await ensureDeliverableRun())) return;
      await insertRow('deliverable_pipeline_events', {
        run_id: deliverableRunId,
        event_type: String(event?.type || 'status'),
        event_data: event ?? {},
        phase: phaseName,
        agent_name: agentName,
      }).catch(() => {});
    };

    const normalizeEventContext = (event: any) => {
      const es = event?.executionState || {};
      const data = event?.data || {};
      const phaseName = toPhaseLower(String(event?.phase || es?.phase || data?.phase || '')) ?? null;
      const agentName = String(event?.agent || es?.agent || data?.agent || '').trim() || null;
      const stepType = toStepLower(String(event?.step || es?.step || data?.step || 'try')) ?? null;
      const failsafe = String(event?.failsafe || es?.failsafe || data?.failsafe || '').trim() || null;
      const generation = String(event?.generation || es?.generation || data?.generation || '').trim() || null;
      return { phaseName, agentName, stepType, failsafe, generation };
    };

    const agentStepKey = (
      phaseId: string | null,
      phaseName: string | null,
      agentName: string | null,
      stepType: string | null
    ) => `${phaseId || phaseName || 'unknown'}:${agentName || 'unknown'}:${stepType || 'try'}`;

    const generationContextKey = (context: ReturnType<typeof normalizeEventContext>) =>
      [
        context.phaseName || 'unknown',
        context.agentName || 'unknown',
        context.stepType || 'try',
        context.failsafe || 'none',
        context.generation || 'none',
      ].join(':');

    const markDeliverableRun = async (status: 'completed' | 'failed', payload?: any) => {
      if (!(await ensureDeliverableRun())) return;
      const now = new Date().toISOString();
      await updateRows('deliverable_pipeline_runs', {
        status,
        completed_at: now,
        updated_at: now,
        output_data: status === 'completed' ? (payload ?? {}) : {},
        error_data: status === 'failed' ? (payload ?? {}) : null,
      }, 'id', deliverableRunId).catch(() => {});
    };

    streamer.subscribe(async (event: any) => {
      try {
        const type = String(event?.type || '');
        const context = normalizeEventContext(event);
        const now = new Date().toISOString();
        const { phaseName, agentName, stepType } = context;

        await persistDeliverableEvent(event, phaseName, agentName);

        if (type === 'phase-start') {
          if (!(phaseName && await ensureDeliverableRun())) return;
          const row: import('../types/db').DPPhaseDelegationInsert = {
            run_id: deliverableRunId,
            phase_name: phaseName,
            started_at: now,
            status: 'running',
            input_data: event?.data ?? {},
          } as any;
          const { data, error } = await insertRow('deliverable_pipeline_phase_delegations', row, true);
          if (!error && data?.id) {
            phaseState.currentPhaseId = data.id;
            phaseState.currentPhaseName = phaseName;
            phaseIdByName.set(phaseName, data.id);
          }
        } else if (type === 'phase-complete') {
          const phaseId = phaseState.currentPhaseId || (phaseName ? phaseIdByName.get(phaseName) : null);
          if (phaseId) {
            const failed = event?.data?.status === 'failed' || event?.data?.error;
            await updateRows('deliverable_pipeline_phase_delegations', {
              completed_at: now,
              status: failed ? 'failed' : 'completed',
              output_data: failed ? {} : (event?.data ?? {}),
              error_data: failed ? (event?.data?.error ?? event?.data ?? {}) : null,
            }, 'id', phaseId);
            if (failed) await markDeliverableRun('failed', event?.data?.error ?? event?.data);
          }
        } else if (type === 'agent-start') {
          const phaseId = phaseState.currentPhaseId || (phaseName ? phaseIdByName.get(phaseName) : null);
          if (phaseId && agentName && stepType) {
            const row: import('../types/db').DPAgentStepInsert = {
              phase_delegation_id: phaseId,
              agent_name: agentName,
              step_type: stepType,
              started_at: now,
              status: 'running',
              input_data: event?.data ?? {},
            } as any;
            const { data, error } = await insertRow('deliverable_pipeline_agent_steps', row, true);
            if (!error && data?.id) {
              agentStepMap.set(agentStepKey(phaseId, phaseName, agentName, stepType), data.id);
            }
          }
        } else if (type === 'agent-complete') {
          const phaseId = phaseState.currentPhaseId || (phaseName ? phaseIdByName.get(phaseName) : null);
          const key = agentStepKey(phaseId ?? null, phaseName, agentName, stepType);
          const id = agentStepMap.get(key);
          if (id) {
            const failed = event?.data?.status === 'failed' || event?.data?.error;
            await updateRows('deliverable_pipeline_agent_steps', {
              completed_at: now,
              status: failed ? 'failed' : 'completed',
              output_data: failed ? {} : (event?.data ?? {}),
              error_data: failed ? (event?.data?.error ?? event?.data ?? {}) : null,
            }, 'id', id);
          }
        } else if (type === 'error') {
          await markDeliverableRun('failed', event?.data ?? event);
          await updateRows('executions', { status: 'failed', completed_at: now }, 'id', config.runId).catch(() => {});
        } else if (type === 'completion') {
          await markDeliverableRun('completed', event?.data ?? event);
        } else if (type === 'generation') {
          if (!(await ensureDeliverableRun())) return;
          const phaseId = phaseState.currentPhaseId || (phaseName ? phaseIdByName.get(phaseName) : null);
          const key = agentStepKey(phaseId ?? null, phaseName, agentName, stepType);
          const agentStepId = agentStepMap.get(key) || null;
          const provider = event?.data?.provider || event?.metadata?.provider || null;
          const model = event?.data?.model || event?.metadata?.model || null;
          const messages =
            event?.data?.messages ??
            generationMessagesByContext.get(generationContextKey(context)) ??
            [];
          const response = event?.data?.response ?? {
            content: event?.data?.content ?? event?.data?.output ?? null,
            parsed: event?.data?.parsed ?? event?.data?.structuredOutput ?? null,
            raw: event?.data ?? {},
          };
          const row: import('../types/db').DPGenerationInsert = {
            run_id: deliverableRunId,
            phase_delegation_id: phaseId ?? null,
            agent_step_id: agentStepId,
            substep_id: null,
            model_provider: (provider || 'unknown') as any,
            model_name: (model || 'unknown') as any,
            messages: messages as any,
            response: response as any,
            created_at: now as any
          } as any;
          await insertRow('deliverable_pipeline_generations', row);
        } else if (type === 'tool-use') {
          if (!(await ensureDeliverableRun())) return;
          const phaseId = phaseState.currentPhaseId || (phaseName ? phaseIdByName.get(phaseName) : null);
          const key = agentStepKey(phaseId ?? null, phaseName, agentName, stepType);
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
          await insertRow('deliverable_pipeline_tool_executions', row);
        } else if (type === 'status') {
          if (event?.namespace === 'llm' && event?.key === 'input') {
            const messages = event?.data?.messages;
            if (Array.isArray(messages)) {
              generationMessagesByContext.set(generationContextKey(context), messages);
            }
          }
          // Optional enrichment: correlate llm.usage to latest generation for this agent step
          try {
            if (event?.namespace === 'llm' && event?.key === 'usage') {
              const phaseId = phaseState.currentPhaseId || (phaseName ? phaseIdByName.get(phaseName) : null);
              const key = agentStepKey(phaseId ?? null, phaseName, agentName, stepType);
              const agentStepId = agentStepMap.get(key) || null;
              if (agentStepId) {
                const { data: last, error: selErr } = await (supabase as any)
                  .from('deliverable_pipeline_generations')
                  .select('id')
                  .eq('agent_step_id', agentStepId)
                  .order('created_at', { ascending: false })
                  .limit(1)
                  .maybeSingle();
                if (!selErr && last?.id) {
                  const usage = event?.data || {};
                  await supabase
                    .from('deliverable_pipeline_generations')
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
          await markDeliverableRun('completed', event?.data ?? event);
          await updateRows('executions', { status: 'completed', completed_at: now }, 'id', config.runId).catch(() => {});
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
