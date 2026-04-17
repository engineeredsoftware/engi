// Unit tests for executeDiscoveryPhase in pipelineDiscoveryPhaseWrapper
import '@/tests/setupTests';

// Mock dependencies
jest.mock('@bitcode/logger', () => ({ log: jest.fn() }));
jest.mock('@bitcode/context', () => ({ getGlobalContext: jest.fn() }));
jest.mock('@bitcode/streams', () => ({ writeStreamMessage: jest.fn() }));
jest.mock('@bitcode/engine/pipeline/metrics', () => ({ trackApiCall: jest.fn((metrics, name, fn) => fn()) }));
jest.mock('@bitcode/discovery/discoveryPhaseModule', () => ({ runDiscovery: jest.fn() }));
jest.mock('@bitcode/discovery/discoveryDeliverablesPhaseModule', () => ({
  runDiscoveryDeliverables: jest.fn(),
}));

import { getGlobalContext } from '@bitcode/context';
import { writeStreamMessage } from '@bitcode/streams';
import { runDiscoveryDeliverables } from '@bitcode/discovery/discoveryDeliverablesPhaseModule';
import { executeDiscoveryPhase } from '@bitcode/engine/pipeline/pipelineDiscoveryPhaseWrapper';
import type { PipelineMetrics, PipelineState } from '@bitcode/engine/types';

describe('executeDiscoveryPhase', () => {
  const fakeStream = {};
  const fakeAbort = new AbortController().signal;
  const fakeCtx = {
    dataStream: fakeStream,
    abortSignal: fakeAbort,
  } as any;
  const baseState: PipelineState = {
    iteration: 1,
    phases: { setup: true, discovery: false, implementation: false, validation: false, shipping: false },
    phaseFailures: { setup: 0, discovery: 0, implementation: 0, validation: 0 },
    startTime: Date.now(),
    currentIteration: { discovery: false, implementation: false, validation: false }
  };
  const baseMetrics: PipelineMetrics = {
    iterationCount: 1,
    totalTokensUsed: 0,
    totalApiCalls: 0,
    lastValidationScore: 0,
    startTime: Date.now(),
    phaseTimings: { setup: 0, discovery: 0, implementation: 0, validation: 0, shipping: 0 },
    resourceUsage: { peakMemory: 0, totalProcessingTime: 0, apiLatencies: [] },
    iterationMetrics: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getGlobalContext as jest.Mock).mockReturnValue(fakeCtx);
  });

  it('completes successfully and updates state/metrics', async () => {
    // Mock successful discovery
    (runDiscoveryDeliverables as jest.Mock).mockResolvedValue({
      success: true,
      feedback: 'ok',
      metrics: { tokensUsed: 2, score: 0.9, confidence: 0.8 },
      discoveryContext: { relevantFiles: ['f1'], webResearch: { results: ['r1'] } }
    });
    const state = JSON.parse(JSON.stringify(baseState));
    const metrics = JSON.parse(JSON.stringify(baseMetrics));
    // Prepare per-iteration metrics container
    const currentMetrics: any = {};
    await executeDiscoveryPhase(metrics, state, 'cid', currentMetrics);
    // State flags
    expect(state.phases.discovery).toBe(true);
    expect(state.currentIteration.discovery).toBe(true);
    // Iteration metrics updated
    expect(currentMetrics.discovery).toMatchObject({ tokensUsed: 2, filesAnalyzed: 1, researchTokens: 2, webResults: 1, relevanceScore: 0.9 });
    // Metrics timings updated
    expect(metrics.phaseTimings.discovery).toBeGreaterThanOrEqual(0);
    // Stream message and log called
    expect(writeStreamMessage).toHaveBeenCalled();
  });

  it('throws and updates state on failure', async () => {
    (runDiscoveryDeliverables as jest.Mock).mockResolvedValue({ success: false, feedback: 'fail', metrics: {} });
    const state = JSON.parse(JSON.stringify(baseState));
    const metrics = JSON.parse(JSON.stringify(baseMetrics));
    const currentMetrics: any = {};
    await expect(executeDiscoveryPhase(metrics, state, 'cid', currentMetrics))
      .rejects.toMatchObject({ message: expect.stringContaining('Discovery phase failed') });
    expect(state.phases.discovery).toBe(false);
    expect(state.phaseFailures.discovery).toBe(1);
    expect(state.currentIteration.discovery).toBe(false);
    expect(writeStreamMessage).not.toHaveBeenCalled();
  });
});
