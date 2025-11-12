import { Execution, ExecutionStreamAdapter } from '@engi/execution-generics';
import { enablePipelineStreaming } from '../../streaming/pipeline-stream-integration';

// Minimal streamer mock – we don't need SSE, we only want DB persistence path
class MockSupabase {
  tables: Record<string, any[]> = {
    pipeline_executions: [],
    execution_events: [],
    // Structured tables (optional in this test context)
    phase_executions: [],
    step_executions: [],
    generations: [],
    tool_executions: [],
  };
  from = (table: string) => ({
    insert: (row: any) => ({
      then: (cb: any) => { (this.tables[table] ||= []).push(row); cb(); return { catch: () => ({}) }; },
      catch: () => ({})
    }),
    update: (_: any) => ({ eq: () => ({}) }),
    select: (_?: string) => ({ single: async () => ({ data: null, error: null }) })
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
});
