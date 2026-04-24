// Unit tests for executeValidationPhase and handleValidationFailure
import '@/tests/setupTests';

// Mock dependencies
jest.mock('@bitcode/logger', () => ({ log: jest.fn() }));
jest.mock('@bitcode/context', () => ({ getGlobalContext: jest.fn() }));
jest.mock('@bitcode/streams', () => ({ writeStreamMessage: jest.fn() }));
jest.mock('@bitcode/engine/pipeline/metrics', () => ({
  trackApiCall: jest.fn((metrics, name, fn) => fn()),
  updatePeakMemory: jest.fn(),
}));
jest.mock('@bitcode/pipeline-asset-pack/src/phases/validation', () => ({ runValidationDeliverables: jest.fn() }));

import { getGlobalContext } from '@bitcode/context';
import { writeStreamMessage } from '@bitcode/streams';
import { log } from '@bitcode/logger';
import { runValidationDeliverables as runValidation } from '@bitcode/pipeline-asset-pack';
import {
  executeValidationPhase,
  handleValidationFailure
} from '@bitcode/engine/pipeline/pipelineValidationPhaseWrapper';
import type { PipelineMetrics, PipelineState } from '@bitcode/engine/types';

describe('executeValidationPhase', () => {
  const fakeStream = {};
  const fakeCtx: any = {
    dataStream: fakeStream,
    getCurrentIteration: jest.fn(),
    updateValidationPhase: jest.fn(),
    completeCurrentIteration: jest.fn(),
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
    phases: { setup: true, discovery: true, implementation: true, validation: false, shipping: false },
    phaseFailures: { setup: 0, discovery: 0, implementation: 0, validation: 0 },
    startTime: Date.now(),
    currentIteration: { discovery: true, implementation: true, validation: false },
  };

  it('completes successfully when validation passes', async () => {
    // Prepare fake iteration context
    const iterationCtx: any = { phases: { validation: { metrics: { startTime: Date.now() } } } };
    fakeCtx.getCurrentIteration.mockReturnValue(iterationCtx);
    // Mock runValidation result
    const validationResult = {
      success: true,
      feedback: 'all good',
      metrics: { tokensUsed: 3, score: 0.9, confidence: 0.8, taskCompletion: 1, codeQuality: 1, securityScore: 1, contentQuality: 1 },
      errors: [],
      needsIteration: false,
      readyToFinish: true,
      confidence: 0.8,
    };
    (runValidation as jest.Mock).mockResolvedValue(validationResult);

    const metrics = JSON.parse(JSON.stringify(baseMetrics));
    const state = JSON.parse(JSON.stringify(baseState));
    const currentIterationMetrics: any = {};

    const result = await executeValidationPhase(metrics, state, 'cid', currentIterationMetrics, 0.5);

    // Wrapper result
    expect(result.success).toBe(true);
    expect(result.validationResult).toBe(validationResult);
    expect(result.validationPassed).toBe(true);
    // Metrics updated
    expect(metrics.totalTokensUsed).toBe(3);
    expect(metrics.lastValidationScore).toBe(0.8);
    expect(metrics.iterationMetrics).toContain(currentIterationMetrics);
    expect(currentIterationMetrics.validation).toMatchObject({ tokensUsed: 3, score: 0.8, improvements: [] });
    // State updated
    expect(state.phases.validation).toBe(true);
    expect(state.currentIteration.validation).toMatchObject({
      feedback: 'all good',
      scores: expect.objectContaining({ overall: 0.9 }),
      readyToFinish: true,
      reasons: [],
    });
    // Stream success message
    expect(writeStreamMessage).toHaveBeenCalledWith(fakeStream,
      expect.objectContaining({
        type: 'status',
        executionState: { phase: 'Validation', step: 'Success', failsafe: 'stitch_until_complete' },
        progress: 'success',
        message: 'Validation phase was successful!',
        detail: 'Validation passed!',
        correlationId: 'cid',
        metadata: { validationResult }
      })
    );
    // Context methods
    expect(fakeCtx.updateValidationPhase).toHaveBeenCalled();
    expect(fakeCtx.completeCurrentIteration).toHaveBeenCalled();
  });

  it('completes with needsIteration when validation fails', async () => {
    const iterationCtx: any = { phases: {} };
    fakeCtx.getCurrentIteration.mockReturnValue(iterationCtx);
    const validationResult = {
      success: false,
      feedback: 'needs more work',
      metrics: { tokensUsed: 1, score: 0.4, confidence: 0.3 },
      errors: [{ message: 'issue1', code: 'E1', severity: 'low' }],
      needsIteration: true,
      readyToFinish: false,
      confidence: 0.3,
    };
    (runValidation as jest.Mock).mockResolvedValue(validationResult);

    const metrics = JSON.parse(JSON.stringify(baseMetrics));
    const state = JSON.parse(JSON.stringify(baseState));
    const currentIterationMetrics: any = {};

    const result = await executeValidationPhase(metrics, state, 'cid2', currentIterationMetrics);
    expect(result.success).toBe(true);
    expect(result.validationPassed).toBe(false);
    expect(state.phases.validation).toBe(true);
    // Stream error message
    expect(writeStreamMessage).toHaveBeenCalledWith(fakeStream,
      expect.objectContaining({
        executionState: { phase: 'Validation', step: 'Error', failsafe: 'prepare_concise_context' },
        progress: 'error',
        message: 'Validation phase determined more iteration is needed.',
        detail: 'Validation did not pass.',
      })
    );
  });
});

describe('handleValidationFailure', () => {
  const fakeCtx: any = {
    getCurrentIteration: jest.fn(),
    updateValidationPhase: jest.fn(),
    completeCurrentIteration: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
    (getGlobalContext as jest.Mock).mockReturnValue(fakeCtx);
  });

  it('updates context and completes iteration on failure', () => {
    const iterationCtx: any = { phases: {} };
    fakeCtx.getCurrentIteration.mockReturnValue(iterationCtx);
    const state: any = {};
    handleValidationFailure(new Error('fail'), state, 'cid3');
    expect(fakeCtx.updateValidationPhase).toHaveBeenCalledWith(
      expect.objectContaining({
        phaseData: expect.objectContaining({ success: false, needsIteration: true, error: 'fail' })
      })
    );
    expect(fakeCtx.completeCurrentIteration).toHaveBeenCalled();
  });

  it('logs error when no globalContext', () => {
    // Simulate getGlobalContext returning undefined
    (getGlobalContext as jest.Mock).mockReturnValue(undefined);
    handleValidationFailure(new Error('oops'), {} as any, 'cid4');
    expect(log).toHaveBeenCalledWith(
      'Cannot handle validation failure - globalContext is undefined',
      'error',
      expect.objectContaining({ correlationId: 'cid4', error: 'oops' })
    );
  });
});
