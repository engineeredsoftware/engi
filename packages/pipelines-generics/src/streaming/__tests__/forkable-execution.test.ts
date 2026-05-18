import { Execution, ExecutionStreamAdapter } from '@bitcode/execution-generics';
import { enablePipelineStreaming } from '../../streaming/pipeline-stream-integration';

// Minimal streamer mock – we don't read SSE, we only want DB persistence path
class MockSupabase {
  tables: Record<string, any[]> = {
    executions: [],
    execution_events: [],
    deliverable_pipeline_runs: [],
    deliverable_pipeline_events: [],
    deliverable_pipeline_phase_delegations: [],
    deliverable_pipeline_agent_steps: [],
    deliverable_pipeline_generations: [],
    deliverable_pipeline_tool_executions: [],
  };
  from = (table: string) => ({
    insert: (row: any) => {
      let inserted = false;
      const rows = Array.isArray(row) ? row : [row];
      const pushRow = () => {
        if (!inserted) {
          const target = (this.tables[table] ||= []);
          for (const entry of rows) {
            if (!entry.id && table !== 'execution_events') {
              entry.id = `${table}-${target.length + 1}`;
            }
            target.push(entry);
          }
          inserted = true;
        }
      };

      return {
        then: (cb: any) => {
          pushRow();
          cb({ data: rows, error: null });
          return { catch: () => ({}) };
        },
        catch: () => ({}),
        select: () => ({
          single: async () => {
            pushRow();
            return { data: rows[0], error: null };
          }
        })
      };
    },
    update: (patch: any) => ({
      eq: async (column: string, value: any) => {
        const rows = this.tables[table] || [];
        for (const row of rows) {
          if (row[column] === value) Object.assign(row, patch);
        }
        return { data: rows.filter((row) => row[column] === value), error: null };
      }
    }),
    select: (_?: string) => ({
      eq: (_column: string, _value: any) => ({
        order: () => ({
          limit: () => ({
            maybeSingle: async () => {
              const rows = this.tables[table] || [];
              return { data: rows[rows.length - 1] || null, error: null };
            }
          })
        })
      }),
      single: async () => ({ data: null, error: null })
    })
  });
}

describe('enablePipelineStreaming + Execution emits DB events (snapshot stream)', () => {
  it('persists events for mid-execution snapshotting', async () => {
    const supabase = new MockSupabase() as any;
    const runId = '00000000-0000-0000-0000-000000000001';
    const userId = 'user-1';

    const exec = new Execution(`exec-${runId}`);
    enablePipelineStreaming(exec as any, {
      runId,
      userId,
      supabase,
      streamToDatabase: true,
    });

    // Emit synthetic events simulating a live pipeline
    await ExecutionStreamAdapter.emitEvent(exec.id, 'phase-start' as any, { phase: 'setup' });
    await ExecutionStreamAdapter.emitEvent(exec.id, 'agent-start' as any, { agent: 'danger-wall', activity: 'start' });
    await ExecutionStreamAdapter.emitEvent(exec.id, 'generation' as any, { input: 'prompt', output: 'resp' });
    await ExecutionStreamAdapter.emitEvent(exec.id, 'agent-complete' as any, { agent: 'danger-wall', activity: 'complete' });

    // Verify events table captured entries (best-effort persistence path)
    const events = supabase.tables['execution_events'];
    expect(events.length).toBeGreaterThanOrEqual(3);
    expect(events[0].run_id).toEqual(runId);
  });

  it('persists structured deliverable phase, agent, generation, and tool rows', async () => {
    const supabase = new MockSupabase() as any;
    const runId = '11111111-1111-4111-8111-111111111111';
    const userId = '22222222-2222-4222-8222-222222222222';

    const exec = new Execution(`exec-${runId}`);
    const streamer = enablePipelineStreaming(exec as any, {
      runId,
      userId,
      supabase,
      structuredToDatabase: true,
    });

    await ExecutionStreamAdapter.emitEvent(exec.id, 'phase-start' as any, {
      phase: 'setup',
      data: { input: { read: 'fit this repository' } },
    });
    await ExecutionStreamAdapter.emitEvent(exec.id, 'agent-start' as any, {
      agent: 'setup:asset-pack-comprehend-read-agent',
      executionState: { phase: 'setup', agent: 'setup:asset-pack-comprehend-read-agent', step: 'try' },
      data: { promptContext: { read: 'fit this repository' } },
    });
    await ExecutionStreamAdapter.emitEvent(exec.id, 'status' as any, {
      namespace: 'llm',
      key: 'input',
      executionState: {
        phase: 'setup',
        agent: 'setup:asset-pack-comprehend-read-agent',
        step: 'try',
        failsafe: 'prepare_concise_context',
        generation: 'reason',
      },
      data: {
        messages: [{ role: 'user', content: 'Fit this repository.' }],
      },
    });
    await ExecutionStreamAdapter.emitEvent(exec.id, 'generation' as any, {
      executionState: {
        phase: 'setup',
        agent: 'setup:asset-pack-comprehend-read-agent',
        step: 'try',
        failsafe: 'prepare_concise_context',
        generation: 'reason',
      },
      data: {
        content: '{"result":"ok"}',
        provider: 'openai',
        model: 'gpt-test',
      },
    });
    await ExecutionStreamAdapter.emitEvent(exec.id, 'status' as any, {
      namespace: 'llm',
      key: 'parsedOutput',
      executionState: {
        phase: 'setup',
        agent: 'setup:asset-pack-comprehend-read-agent',
        step: 'try',
        failsafe: 'prepare_concise_context',
        generation: 'reason',
      },
      data: {
        parsed: { result: 'ok' },
      },
    });
    await ExecutionStreamAdapter.emitEvent(exec.id, 'tool-use' as any, {
      executionState: { phase: 'setup', agent: 'setup:asset-pack-comprehend-read-agent', step: 'try' },
      data: {
        tool: 'depository-search',
        input: { query: 'repository' },
        output: { selected: 1 },
      },
    });
    await ExecutionStreamAdapter.emitEvent(exec.id, 'agent-complete' as any, {
      agent: 'setup:asset-pack-comprehend-read-agent',
      executionState: { phase: 'setup', agent: 'setup:asset-pack-comprehend-read-agent', step: 'try' },
      data: { status: 'completed' },
    });
    await ExecutionStreamAdapter.emitEvent(exec.id, 'phase-complete' as any, {
      phase: 'setup',
      data: { status: 'completed' },
    });
    await (streamer as any).flushStructuredWrites?.();

    expect(supabase.tables.deliverable_pipeline_runs).toHaveLength(1);
    expect(supabase.tables.deliverable_pipeline_phase_delegations).toHaveLength(1);
    expect(supabase.tables.deliverable_pipeline_agent_steps).toHaveLength(1);
    expect(supabase.tables.deliverable_pipeline_generations).toHaveLength(1);
    expect(supabase.tables.deliverable_pipeline_tool_executions).toHaveLength(1);
    expect(supabase.tables.deliverable_pipeline_generations[0].messages).toEqual([
      { role: 'user', content: 'Fit this repository.' },
    ]);
    expect(supabase.tables.deliverable_pipeline_generations[0].response.parsed).toEqual({
      result: 'ok',
    });
    expect(supabase.tables.deliverable_pipeline_phase_delegations[0].status).toBe('completed');
    expect(supabase.tables.deliverable_pipeline_agent_steps[0].status).toBe('completed');
  });

  it('persists tool result store events into structured tool execution rows', async () => {
    const supabase = new MockSupabase() as any;
    const runId = '33333333-3333-4333-8333-333333333333';
    const userId = '44444444-4444-4444-8444-444444444444';
    const agentName = 'setup:asset-pack-comprehend-read-agent';

    const exec = new Execution(`exec-${runId}`);
    const streamer = enablePipelineStreaming(exec as any, {
      runId,
      userId,
      supabase,
      structuredToDatabase: true,
    });

    await ExecutionStreamAdapter.emitEvent(exec.id, 'phase-start' as any, {
      phase: 'setup',
    });
    await ExecutionStreamAdapter.emitEvent(exec.id, 'agent-start' as any, {
      agent: agentName,
      executionState: { phase: 'setup', agent: agentName, step: 'try' },
    });

    const toolExecution = new Execution('tools:execution', exec);
    toolExecution.store('tools', 'result', {
      tool: 'bitcode.asset-pack.verification',
      ok: true,
      input: { type: 'object', keys: ['repositoryFullName'] },
      output: { type: 'object', keys: ['selectedCandidateIds'] },
      phase: 'setup',
      agent: agentName,
      step: 'try',
      generation: 'tools_execution',
    });

    await new Promise((resolve) => setImmediate(resolve));
    await (streamer as any).flushStructuredWrites?.();

    expect(supabase.tables.deliverable_pipeline_tool_executions).toHaveLength(1);
    expect(supabase.tables.deliverable_pipeline_tool_executions[0]).toMatchObject({
      agent_step_id: 'deliverable_pipeline_agent_steps-1',
      tool_name: 'bitcode.asset-pack.verification',
      tool_input: { type: 'object', keys: ['repositoryFullName'] },
      tool_output: { type: 'object', keys: ['selectedCandidateIds'] },
      tool_error: null,
    });
  });
});
