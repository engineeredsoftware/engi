// @ts-nocheck
// @ts-nocheck
import { PipelineExecution } from '../PipelineExecution';
import { PipelineExecutor } from '../PipelineExecutor';

describe('PipelineExecutor event emission (unit)', () => {
  it('emits phase and agent events in expected order', async () => {
    const exec = new PipelineExecution('pipeline:unit');
    const events: any[] = [];
    exec.store('execution', 'dataStream', {
      writeData: async (data: string) => {
        try { events.push(JSON.parse(data)); } catch { /* ignore */ }
      }
    });

    // Register two trivial agents
    const agentA = async (input: any) => ({ ok: 'A' });
    const agentB = async (input: any) => ({ ok: 'B' });
    // Access registry through any since types import aliases are not available in test env
    (exec as any).agents.registerAgent('unit:agentA', agentA as any);
    (exec as any).agents.registerAgent('unit:agentB', agentB as any);

    const executor = new PipelineExecutor(exec);
    const res = await executor.executePhase({
      phaseName: 'setup',
      sequence: [
        { agent: 'unit:agentA' },
        { agent: 'unit:agentB' }
      ],
      allowShortCircuit: true,
    });

    expect(res.success).toBe(true);
    const types = events.map(e => e.type + (e.phase ? ':'+e.phase : '') + (e.agent ? ':'+e.agent : '') + (e.status ? ':'+e.status : ''));
    // Order: phase:start -> agentA:start -> agentA:end -> agentB:start -> agentB:end -> phase:end
    expect(types).toEqual([
      'phase:setup:start',
      'agent:unit:agentA:start',
      'agent:unit:agentA:end',
      'agent:unit:agentB:start',
      'agent:unit:agentB:end',
      'phase:setup:end',
    ]);
  });
});
