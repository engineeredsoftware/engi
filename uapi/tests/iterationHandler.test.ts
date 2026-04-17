// Unit tests for the iterationHandler: executeIteration and canRecoverIteration
import '@/tests/setupTests';

// Mock dependencies
jest.mock('@bitcode/logger', () => ({ log: jest.fn() }));
jest.mock('@bitcode/context', () => ({ getGlobalContext: jest.fn() }));
jest.mock('@bitcode/engine/pipeline/pipelineDiscoveryPhaseWrapper', () => ({ executeDiscoveryPhase: jest.fn() }));
jest.mock('@bitcode/engine/pipeline/pipelineImplementationPhaseWrapper', () => ({ executeImplementationPhase: jest.fn() }));
jest.mock('@bitcode/engine/pipeline/pipelineValidationPhaseWrapper', () => ({ executeValidationPhase: jest.fn(), handleValidationFailure: jest.fn() }));

import { getGlobalContext } from '@bitcode/context';
import { executeDiscoveryPhase } from '@bitcode/engine/pipeline/pipelineDiscoveryPhaseWrapper';
import { executeImplementationPhase } from '@bitcode/engine/pipeline/pipelineImplementationPhaseWrapper';
import { executeValidationPhase, handleValidationFailure } from '@bitcode/engine/pipeline/pipelineValidationPhaseWrapper';
import { executeIteration, canRecoverIteration } from '@bitcode/pipeline-engine-generics/iterations';
import type { PipelineMetrics, PipelineState } from '@bitcode/engine/types';

describe('executeIteration', () => {
  const fakeCtx: any = { startNewIteration: jest.fn(), execution: { phases: { iterations: [] } } };

  beforeEach(() => {
    jest.clearAllMocks();
    (getGlobalContext as jest.Mock).mockReturnValue(fakeCtx);
  });

  const baseMetrics: PipelineMetrics = {
    iterationCount: 0,
    totalTokensUsed: 0,
    totalApiCalls: 0,
    lastValidationScore: 0,
    startTime: Date.now(),
    phaseTimings: { setup: 0, discovery: 0, implementation: 0, validation: 0, shipping: 0 },
    resourceUsage: { peakMemory: 0, totalProcessingTime: 0, apiLatencies: [] },
    iterationMetrics: []
  };

  const baseState: PipelineState = {
    iteration: 0,
    phases: { setup: true, discovery: false, implementation: false, validation: false, shipping: false },
    phaseFailures: { setup: 0, discovery: 0, implementation: 0, validation: 0 },
    startTime: Date.now(),
    currentIteration: { discovery: false, implementation: false, validation: false }
  };

  it('completes a successful iteration', async () => {
    // Stub all phase wrappers to succeed
    (executeDiscoveryPhase as jest.Mock).mockResolvedValue(undefined);
    (executeImplementationPhase as jest.Mock).mockResolvedValue({ success: true, implementationResult: {} });
    (executeValidationPhase as jest.Mock).mockResolvedValue({ success: true, validationResult: {}, validationPassed: true });

    const metrics = { ...baseMetrics };
    const state: any = JSON.parse(JSON.stringify(baseState));
    const result = await executeIteration(metrics, state, 'cid', 0.5);

    expect(result).toEqual({ success: true, validationPassed: true });
    // iteration count and state updated
    expect(metrics.iterationCount).toBe(1);
    expect(state.iteration).toBe(1);
    // new iteration started in context
    expect(fakeCtx.startNewIteration).toHaveBeenCalledWith(1);
    // wrappers called in sequence
    expect(executeDiscoveryPhase).toHaveBeenCalledWith(metrics, state, 'cid', expect.any(Object));
    expect(executeImplementationPhase).toHaveBeenCalledWith(metrics, state, 'cid', expect.any(Object));
    expect(executeValidationPhase).toHaveBeenCalledWith(metrics, state, 'cid', expect.any(Object), 0.5);
  });

  it('handles a phase failure and updates state', async () => {
    // Discovery succeeds
    (executeDiscoveryPhase as jest.Mock).mockResolvedValue(undefined);
    // Implementation fails
    const implError: any = new Error('impl fail');
    implError.phase = 'implementation';
    (executeImplementationPhase as jest.Mock).mockRejectedValue(implError);

    const metrics = { ...baseMetrics };
    const state: any = JSON.parse(JSON.stringify(baseState));

    await expect(executeIteration(metrics, state, 'cid2', 0.5)).rejects.toThrow('impl fail');
    // Phase failure recorded
    expect(state.phaseFailures.implementation).toBe(1);
    // Current iteration error set
    expect(state.currentIteration.error).toMatchObject({ phase: 'implementation', message: 'impl fail' });
    // handleValidationFailure called
    expect(handleValidationFailure).toHaveBeenCalledWith(expect.any(Error), state, 'cid2');
  });
});

describe('canRecoverIteration', () => {
  it('allows recovery when under limits', () => {
    const metrics = { iterationCount: 1 } as any;
    const state: any = { currentIteration: { error: { phase: 'validation' } }, phaseFailures: { validation: 0 } };
    const { canRecover, reason } = canRecoverIteration(metrics, state, 3, 2);
    expect(canRecover).toBe(true);
    expect(reason).toBeUndefined();
  });

  it('disallows recovery when iterationCount >= maxIterations', () => {
    const metrics = { iterationCount: 3 } as any;
    const state: any = { currentIteration: { error: { phase: 'validation' } }, phaseFailures: { validation: 0 } };
    const { canRecover } = canRecoverIteration(metrics, state, 3, 2);
    expect(canRecover).toBe(false);
  });

  it('disallows recovery when phaseFailures >= maxRetries', () => {
    const metrics = { iterationCount: 1 } as any;
    const state: any = { currentIteration: { error: { phase: 'discovery' } }, phaseFailures: { discovery: 2 } };
    const { canRecover } = canRecoverIteration(metrics, state, 5, 2);
    expect(canRecover).toBe(false);
  });

  it('returns false reason for invalid inputs', () => {
    const res = canRecoverIteration(null as any, null as any, 0, 0);
    expect(res.canRecover).toBe(false);
    expect(res.reason).toMatch(/Invalid state or metrics/);
  });
});
