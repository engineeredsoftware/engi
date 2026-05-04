// @ts-nocheck
import { Execution } from '../../../../execution-generics/src/Execution';
import { computePipelineMetrics } from '../Metrics';

function mkExec(id: string, parent?: Execution): Execution {
  return new Execution(id, parent);
}

describe('computePipelineMetrics', () => {
  it('computes durations, agent counts, and token usage from execution tree', () => {
    const root = mkExec('pipeline:asset-pack');
    // pipeline times
    const start = Date.now();
    const end = start + 5000;
    root.store('pipeline', 'startTime', start);
    root.store('pipeline', 'endTime', end);

    // Setup phase
    root.store('phase/setup', 'started', start + 0);
    root.store('phase/setup', 'completed', start + 1000);
    root.store('metrics/phase:setup', 'agentsExecuted', 2);

    // Discovery phase
    root.store('phase/discovery', 'started', start + 1000);
    root.store('phase/discovery', 'completed', start + 3000);
    root.store('metrics/phase:discovery', 'agentsExecuted', 3);

    // Implementation phase
    root.store('phase/implementation', 'started', start + 3000);
    root.store('phase/implementation', 'completed', start + 4000);
    root.store('metrics/phase:implementation', 'agentsExecuted', 4);

    // Validation phase
    root.store('phase/validation', 'started', start + 4000);
    root.store('phase/validation', 'completed', start + 4500);
    root.store('metrics/phase:validation', 'agentsExecuted', 1);

    // Finish phase
    root.store('phase/finish', 'started', start + 4500);
    root.store('phase/finish', 'completed', start + 5000);
    root.store('metrics/phase:finish', 'agentsExecuted', 1);

    // Global agent counter
    root.store('metrics', 'agentsExecuted', 11);

    // Create phase executions to hold llm usage
    const setupExec = mkExec(`${root.id}/phase:setup`, root);
    setupExec.store('llm', 'usage', { inputTokens: 100, outputTokens: 50 });

    const discoveryExec = mkExec(`${root.id}/phase:discovery`, root);
    discoveryExec.store('llm', 'usage', { totalTokens: 300 });

    const implementationExec = mkExec(`${root.id}/phase:implementation`, root);
    implementationExec.store('llm', 'usage', { inputTokens: 200, outputTokens: 100 });

    const validationExec = mkExec(`${root.id}/phase:validation`, root);
    validationExec.store('llm', 'usage', { totalTokens: 50 });

    const finishExec = mkExec(`${root.id}/phase:finish`, root);
    finishExec.store('llm', 'usage', { inputTokens: 25, outputTokens: 25 });

    const metrics = computePipelineMetrics(root);

    expect(metrics.totalDuration).toBe(5000);
    expect(metrics.agentsExecuted).toBe(11);
    expect(metrics.tokensUsed).toBe(100 + 50 + 300 + 200 + 100 + 50 + 25 + 25);

    expect(metrics.phaseDurations.setup).toBe(1000);
    expect(metrics.phaseDurations.discovery).toBe(2000);
    expect(metrics.phaseDurations.implementation).toBe(1000);
    expect(metrics.phaseDurations.validation).toBe(500);
    expect(metrics.phaseDurations.finish).toBe(500);

    expect(metrics.phases.setup.agentsExecuted).toBe(2);
    expect(metrics.phases.setup.tokensUsed).toBe(150);
    expect(metrics.phases.discovery.tokensUsed).toBe(300);
  });
});
