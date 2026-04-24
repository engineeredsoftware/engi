// Unit tests for the setup phase wrapper (pipelineSetupPhaseWrapper)
import '@/tests/setupTests';

// Mock dependencies
jest.mock('@bitcode/logger', () => ({ log: jest.fn() }));
jest.mock('@bitcode/context', () => ({ getGlobalContext: jest.fn() }));
jest.mock('@bitcode/streams', () => ({ writeStreamMessage: jest.fn() }));
jest.mock('@bitcode/pipeline-asset-pack/src/phases/setup', () => ({ runSetupDeliverables: jest.fn() }));
jest.mock('@bitcode/engine/pipeline/metrics', () => ({ updatePeakMemory: jest.fn(), createPipelineMetrics: jest.fn(() => ({ totalTokensUsed: 0, totalApiCalls: 0, phaseTimings: { setup: 0 } })), validatePipelineConfig: jest.fn(() => ({ maxIterations: 1, validationThreshold: 0, retryDelayMs: 0, maxRetries: 0 })) }));

import { getGlobalContext } from '@bitcode/context';
import { writeStreamMessage } from '@bitcode/streams';
import { runSetupDeliverables } from '@bitcode/pipeline-asset-pack';
import { executeSetupPhase } from '@bitcode/engine/pipeline/pipelineSetupPhaseWrapper';

describe('executeSetupPhase', () => {
  const fakeCtx: any = {
    dataStream: {},
    abortSignal: new AbortController().signal,
    taskContext: { taskType: 'X' },
    repository: { path: '/repo' },
    updateSetupPhaseResults: jest.fn(),
    getCurrentIteration: () => ({ metrics: {} }),
  };
  const metrics: any = { totalTokensUsed: 0, totalApiCalls: 0, phaseTimings: { setup: 0 } };

  beforeEach(() => {
    jest.clearAllMocks();
    (getGlobalContext as jest.Mock).mockReturnValue(fakeCtx);
  });

  it('completes successfully and updates metrics', async () => {
    // Mock runSetup success result
    (runSetupDeliverables as jest.Mock).mockResolvedValue({
      success: true,
      feedback: '',
      metrics: { tokensUsed: 5, resourceUsage: { apiCalls: 2 }, duration: 10 },
      setupContext: {
        readiness: { ready: true },
        repository: { path: '/repo' },
        task: { type: 'X' }
      }
    });
    const result = await executeSetupPhase(metrics, 'cid');
    expect(result.success).toBe(true);
    expect(runSetupDeliverables).toHaveBeenCalledWith({
      dataStream: fakeCtx.dataStream,
      correlationId: 'cid',
      maxRetries: 3,
      abortSignal: fakeCtx.abortSignal
    });
    expect(fakeCtx.updateSetupPhaseResults).toHaveBeenCalled();
    expect(writeStreamMessage).toHaveBeenCalled();
    expect(metrics.totalTokensUsed).toBe(5);
    expect(metrics.totalApiCalls).toBe(2);
    expect(metrics.phaseTimings.setup).toBe(10);
  });

  it('throws an error on setup failure', async () => {
    (runSetupDeliverables as jest.Mock).mockResolvedValue({ success: false, feedback: 'fail', metrics: {} });
    await expect(executeSetupPhase(metrics, 'cid')).rejects.toThrow('Setup phase failed');
  });
});
