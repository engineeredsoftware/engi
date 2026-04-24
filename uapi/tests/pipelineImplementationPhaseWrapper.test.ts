// Unit tests for executeImplementationPhase in pipelineImplementationPhaseWrapper
import '@/tests/setupTests';

// Mock dependencies
jest.mock('@bitcode/logger', () => ({ log: jest.fn() }));
jest.mock('@bitcode/context', () => ({ getGlobalContext: jest.fn() }));
jest.mock('@bitcode/streams', () => ({ writeStreamMessage: jest.fn() }));
jest.mock('@bitcode/engine/pipeline/metrics', () => ({
  trackApiCall: jest.fn((metrics, phase, fn) => fn()),
  updatePeakMemory: jest.fn(),
}));
jest.mock('@bitcode/pipeline-asset-pack/src/phases/implementation', () => ({ runImplementationDeliverables: jest.fn() }));

import { getGlobalContext } from '@bitcode/context';
import { writeStreamMessage } from '@bitcode/streams';
import { log } from '@bitcode/logger';
import { runImplementationDeliverables as runImplementation } from '@bitcode/pipeline-asset-pack';
import { executeImplementationPhase } from '@bitcode/engine/pipeline/pipelineImplementationPhaseWrapper';
import type { PipelineMetrics, PipelineState } from '@bitcode/engine/types';

describe('executeImplementationPhase', () => {
  const fakeStream = {};
  const fakeCtx: any = {
    dataStream: fakeStream,
    getCurrentIteration: jest.fn(),
    updateImplementationPhase: jest.fn(),
    getLatestImplementationDraft: jest.fn(),
    getLatestImplementation: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getGlobalContext as jest.Mock).mockReturnValue(fakeCtx);
  });

  const baseMetrics: PipelineMetrics = {
    iterationCount: 1,
    totalTokensUsed: 0,
    totalApiCalls: 0,
    lastValidationScore: 0,
    startTime: Date.now(),
    phaseTimings: { setup: 0, discovery: 0, implementation: 0, validation: 0, shipping: 0 },
    resourceUsage: { peakMemory: 0, totalProcessingTime: 0, apiLatencies: [] },
    iterationMetrics: [],
  };

  const baseState: PipelineState = {
    iteration: 1,
    phases: { setup: true, discovery: true, implementation: false, validation: false, shipping: false },
    phaseFailures: { setup: 0, discovery: 0, implementation: 0, validation: 0 },
    startTime: Date.now(),
    currentIteration: { discovery: true, implementation: false, validation: false },
  };

  it('completes successfully and updates state/metrics', async () => {
    const currentIteration: any = { implementation: { metrics: {} } };
    (fakeCtx.getCurrentIteration as jest.Mock).mockReturnValue(currentIteration);
    (fakeCtx.getLatestImplementationDraft as jest.Mock).mockReturnValue('abc');
    (fakeCtx.getLatestImplementation as jest.Mock).mockReturnValue({ changes: ['x', 'y'] });

    const implResult = { success: true, metrics: { tokensUsed: 2, validationScore: 0.6, confidence: 0.4 }, changes: { files: ['x', 'y'] } };
    (runImplementation as jest.Mock).mockResolvedValue(implResult);

    const metrics = JSON.parse(JSON.stringify(baseMetrics));
    const state = JSON.parse(JSON.stringify(baseState));
    const currentIterationMetrics: any = {};

    const result = await executeImplementationPhase(metrics, state, 'cid', currentIterationMetrics);

    expect(result.success).toBe(true);
    expect(result.implementationResult).toBe(implResult);
    expect(runImplementation).toHaveBeenCalledWith({ correlationId: 'cid' });
    expect(fakeCtx.updateImplementationPhase).toHaveBeenCalledWith(expect.objectContaining({
      metrics: expect.objectContaining({ startTime: expect.any(Number) })
    }));
    expect(state.phases.implementation).toBe(true);
    expect(state.currentIteration.implementation).toBe(true);
    expect(metrics.totalTokensUsed).toBe(2);
    expect(currentIterationMetrics.implementation).toMatchObject({
      tokensUsed: 2,
      changedFiles: 2,
      validationScore: 0.6,
      retries: 0,
      rollbacks: 0,
      confidence: 0.4,
    });
    expect(writeStreamMessage).toHaveBeenCalledWith(fakeStream, expect.objectContaining({
      type: 'status',
      progress: 'success',
      correlationId: 'cid',
    }));
  });

  it('throws and updates state on failure', async () => {
    const currentIteration: any = { implementation: { metrics: {} } };
    (fakeCtx.getCurrentIteration as jest.Mock).mockReturnValue(currentIteration);

    (runImplementation as jest.Mock).mockResolvedValue({ success: false, error: 'error happened' });

    const metrics = JSON.parse(JSON.stringify(baseMetrics));
    const state = JSON.parse(JSON.stringify(baseState));
    const currentIterationMetrics: any = {};

    await expect(executeImplementationPhase(metrics, state, 'cid', currentIterationMetrics))
      .rejects.toMatchObject({ message: expect.stringContaining('Implementation phase failed: error happened'), phase: 'implementation' });

    expect(state.phases.implementation).toBe(false);
    expect(state.currentIteration.implementation).toBe(false);
    expect(state.phaseFailures.implementation).toBe(1);
    expect(writeStreamMessage).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith('Implementation phase failed', 'error', expect.objectContaining({
      correlationId: 'cid',
    }));
  });
});
