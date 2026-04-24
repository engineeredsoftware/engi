// @ts-nocheck
import deliverablePipeline from '../index';
import { Execution } from '@bitcode/execution-generics';
import { enablePipelineStreaming } from '@bitcode/pipelines-generics';

// Mock setup agents to ensure deterministic, fast dry-run
jest.mock('../agents/setup/deliverable-pipeline-clone-vcs-repository-agent', () => ({ __esModule: true, default: jest.fn().mockResolvedValue({ success: true, repository: { owner: 'acme', name: 'repo', ref: 'main' } }) }));
jest.mock('../agents/setup/deliverable-pipeline-comprehend-need-agent', () => ({ __esModule: true, default: jest.fn().mockResolvedValue({ success: true }) }));

describe('Deliverable pipeline bring-up (setup + PTRR plan: prepare→reason)', () => {
  it('streams phase/agent events and persists structured rows', async () => {
    process.env.BITCODE_DEBUG_ONLY_FAILSAFES = 'prepare';
    process.env.BITCODE_DEBUG_ONLY_GENERATIONS = 'reason';
    process.env.BITCODE_ENABLE_DELIVERABLE_SETUP_PHASE_RUNTIME_IN_TEST = '1';

    try {
      const exec = new Execution('deliverable:test');
      const inserts: any[] = [];
      const supabaseStub: any = {
        from(table: string) {
          return {
            insert: (row: any) => {
              inserts.push({ table, row });
              return { select: (_?: any) => ({ single: () => Promise.resolve({ data: { id: 'id-' + inserts.length } }) }) } as any;
            },
            update: (_: any) => ({ eq: () => Promise.resolve({}) }),
            select: () => ({ eq: () => ({ order: () => ({ limit: () => ({ maybeSingle: async () => ({ data: { id: 'id-last' } } as any) }) }) }) })
          } as any;
        }
      };
      enablePipelineStreaming(exec as any, {
        runId: 'run-1',
        userId: 'user-1',
        supabase: supabaseStub,
        streamToDatabase: true,
        structuredToDatabase: true,
      });

      const res = await deliverablePipeline({
        definitionOfNeed: 'Test',
        repository: { url: 'x' },
        deliveryTarget: 'pr' as const,
      }, exec);

      expect(res).toBeDefined();

      // Structured inserts occurred
      const phaseRows = inserts.filter(i =>
        i.table === 'phase_executions' || i.table === 'deliverables_pipeline_phase_delegations'
      );
      expect(phaseRows.length).toBeGreaterThanOrEqual(1);
      expect(
        phaseRows.some((row) => row.row.phase_name === 'setup' || row.row.phase === 'setup')
      ).toBe(true);
      const agentRows = inserts.filter(i =>
        i.table === 'step_executions' || i.table === 'deliverables_pipeline_agent_steps'
      );
      expect(agentRows.some(r => r.row.agent_name === 'deliverable-setup-plan-agent')).toBe(true);
    } finally {
      delete process.env.BITCODE_ENABLE_DELIVERABLE_SETUP_PHASE_RUNTIME_IN_TEST;
    }
  });
});
