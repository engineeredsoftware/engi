// Unit tests for executeShippingPhase in pipelineShippingPhaseWrapper
import '@/tests/setupTests';

// Mock dependencies
jest.mock('@bitcode/logger', () => ({ log: jest.fn() }));
jest.mock('@bitcode/context', () => ({ getGlobalContext: jest.fn() }));
jest.mock('@bitcode/streams', () => ({ writeStreamMessage: jest.fn() }));
jest.mock('@bitcode/pipeline-asset-pack/src/phases/shipping', () => ({ runShippingDeliverables: jest.fn() }));

import { getGlobalContext } from '@bitcode/context';
import { writeStreamMessage } from '@bitcode/streams';
import { runShippingDeliverables as runShipping } from '@bitcode/pipeline-asset-pack';
import { executeShippingPhase, handleShippingFailure } from '@bitcode/engine/pipeline/pipelineShippingPhaseWrapper';
import { log } from '@bitcode/logger';

describe('executeShippingPhase', () => {
  let fakeCtx: any;
  beforeEach(() => {
    jest.clearAllMocks();
    fakeCtx = {
      dataStream: {},
      taskContext: { taskType: 'open_pr', pullRequestDetails: { number: 42 } },
      repository: {
        fileTracker: {
          getEditedFilesCount: () => 1,
          getCreatedFilesCount: () => 2,
          getDeletedFilesCount: () => 3,
          getRenamedFilesCount: () => 4,
          getChangedFilePaths: () => ['file1', 'file2']
        }
      }
    };
    (getGlobalContext as jest.Mock).mockReturnValue(fakeCtx);
  });

  it('completes successfully and populates pipelineResult and enhancedResult for open_pr', async () => {
    const shippingResult = {
      success: true,
      verificationSteps: [{ name: 'check1', passed: true }],
      finalChecklist: {
        allTestsPassing: true,
        noSecurityIssues: true,
        codeQualityThresholdMet: true,
        taskCompletionVerified: true,
        documentationUpdated: true
      },
      error: undefined,
      deliverableType: 'open_pr',
      deliverableUrl: 'http://pr-url',
      gitResults: { number: 123, url: 'http://pr-url', id: 'abc' }
    };
    (runShipping as jest.Mock).mockResolvedValue(shippingResult);

    const metrics: any = {
      startTime: Date.now() - 50,
      iterationCount: 1,
      totalTokensUsed: 10,
      totalApiCalls: 2,
      lastValidationScore: 0.5,
      phaseTimings: { setup: 0, discovery: 0, implementation: 0, validation: 0, shipping: 25 },
      resourceUsage: { peakMemory: 512, totalProcessingTime: 0, apiLatencies: [] },
      iterationMetrics: []
    };
    const pipelineResult: any = { success: false, readyToShip: false, shippingPhase: undefined, actions: {} };
    const correlationId = 'cid';
    const startTime = Date.now() - 100;
    const { success, enhancedResult } = await executeShippingPhase(metrics, pipelineResult, correlationId, startTime);

    // Wrapper returned success
    expect(success).toBe(true);
    // Pipeline result updated
    expect(pipelineResult.success).toBe(true);
    expect(pipelineResult.readyToShip).toBe(true);
    expect(pipelineResult.shippingPhase).toMatchObject({
      success: true,
      verificationSteps: shippingResult.verificationSteps,
      finalChecklist: shippingResult.finalChecklist,
      deliverableType: 'open_pr',
      deliverableUrl: 'http://pr-url'
    });
    // Streams and logs
    expect(writeStreamMessage).toHaveBeenCalledTimes(2);
    expect(log).toHaveBeenCalledWith('Starting shipping phase', 'info', expect.any(Object));
    expect(log).toHaveBeenCalledWith('Pipeline completed successfully', 'info', expect.objectContaining({ deliverableUrl: 'http://pr-url' }));
    // Actions for open_pr
    expect(enhancedResult.actions.pullRequest).toEqual(shippingResult.gitResults);
    expect(enhancedResult.actions.files).toMatchObject({
      edited: 1,
      created: 2,
      deleted: 3,
      renamed: 4,
      paths: ['file1', 'file2']
    });
    // Enhanced metrics
    expect(enhancedResult.metrics.totalTokensUsed).toBe(10);
    expect(enhancedResult.metrics.processingTimeMs).toBeGreaterThanOrEqual(0);
  });
  
  it('handles review_pr and populates reviews and prDetails', async () => {
    // Setup context for review_pr
    fakeCtx.taskContext = { taskType: 'review_pr', pullRequestDetails: { number: 100, url: 'http://pr' } };
    const reviewGit = { id: 'rev1', url: 'http://review', event: 'COMMENT' };
    const shippingResult = {
      success: true,
      verificationSteps: [],
      finalChecklist: {},
      error: undefined,
      deliverableType: 'review_pr',
      deliverableUrl: 'http://review-url',
      gitResults: reviewGit
    };
    (runShipping as jest.Mock).mockResolvedValueOnce(shippingResult);
    const metrics: any = {
      startTime: Date.now(), iterationCount: 1, totalTokensUsed: 0, totalApiCalls: 0,
      lastValidationScore: 0, phaseTimings: { setup:0, discovery:0, implementation:0, validation:0, shipping:0 },
      resourceUsage: { peakMemory:0, totalProcessingTime:0, apiLatencies:[] }, iterationMetrics: []
    };
    const pipelineResult: any = { success: false, readyToShip: false, shippingPhase: undefined, actions: {} };
    const { success, enhancedResult } = await executeShippingPhase(metrics, pipelineResult, 'cid2', Date.now());
    expect(success).toBe(true);
    expect(pipelineResult.success).toBe(true);
    expect(pipelineResult.shippingPhase?.deliverableType).toBe('review_pr');
    expect(enhancedResult.actions.reviews).toEqual([reviewGit]);
    expect(enhancedResult.actions.prDetails).toEqual(fakeCtx.taskContext.pullRequestDetails);
  });
  
  it('handles comment and populates comments and issueContext', async () => {
    // Setup context for comment
    fakeCtx.taskContext = { taskType: 'comment', issueContext: { number: 55, repo: 'test' } };
    const commentGit = { id: 'c1', url: 'http://comment' };
    const shippingResult = {
      success: true,
      verificationSteps: [], finalChecklist: {}, error: undefined,
      deliverableType: 'comment', deliverableUrl: '', gitResults: commentGit
    };
    (runShipping as jest.Mock).mockResolvedValueOnce(shippingResult);
    const metrics: any = { startTime: Date.now(), iterationCount: 1, totalTokensUsed: 0, totalApiCalls: 0,
      lastValidationScore: 0, phaseTimings: { setup:0, discovery:0, implementation:0, validation:0, shipping:0 },
      resourceUsage: { peakMemory:0, totalProcessingTime:0, apiLatencies:[] }, iterationMetrics: [] };
    const pipelineResult: any = { success: false, readyToShip: false, shippingPhase: undefined, actions: {} };
    const { enhancedResult } = await executeShippingPhase(metrics, pipelineResult, 'cid3', Date.now());
    expect(pipelineResult.success).toBe(true);
    expect(enhancedResult.actions.comments).toEqual([commentGit]);
    expect(enhancedResult.actions.issueContext).toEqual(fakeCtx.taskContext.issueContext);
  });
  
  it('handles create_issue and populates issues', async () => {
    // Setup context for create_issue
    fakeCtx.taskContext = { taskType: 'create_issue' };
    const issueGit = { id: 'i1', url: 'http://issue' };
    const shippingResult = {
      success: true,
      verificationSteps: [], finalChecklist: {}, error: undefined,
      deliverableType: 'create_issue', deliverableUrl: '', gitResults: issueGit
    };
    (runShipping as jest.Mock).mockResolvedValueOnce(shippingResult);
    const metrics: any = { startTime: Date.now(), iterationCount: 1, totalTokensUsed: 0, totalApiCalls: 0,
      lastValidationScore: 0, phaseTimings: { setup:0, discovery:0, implementation:0, validation:0, shipping:0 },
      resourceUsage: { peakMemory:0, totalProcessingTime:0, apiLatencies:[] }, iterationMetrics: [] };
    const pipelineResult: any = { success: false, readyToShip: false, shippingPhase: undefined, actions: {} };
    const { enhancedResult } = await executeShippingPhase(metrics, pipelineResult, 'cid4', Date.now());
    expect(pipelineResult.success).toBe(true);
    expect(enhancedResult.actions.issues).toEqual([issueGit]);
  });
  
  // Edge case tests
  it('swallows initial stream errors and still completes shipping', async () => {
    // Make initial writeStreamMessage throw
    (writeStreamMessage as jest.Mock)
      .mockRejectedValueOnce(new Error('stream start failed'))
      // allow the success status message to succeed
      .mockResolvedValueOnce(undefined);
    // Shipping returns success
    const shipRes = { success: true, verificationSteps: [], finalChecklist: {}, error: undefined, deliverableType: 'open_pr', deliverableUrl: '', gitResults: null };
    (runShipping as jest.Mock).mockResolvedValueOnce(shipRes);
    const metrics: any = { startTime: Date.now(), iterationCount: 1, totalTokensUsed: 0, totalApiCalls: 0,
      lastValidationScore: 0, phaseTimings: { setup:0, discovery:0, implementation:0, validation:0, shipping:0 },
      resourceUsage: { peakMemory:0, totalProcessingTime:0, apiLatencies:[] }, iterationMetrics: [] };
    const pipelineResult: any = { success: false, readyToShip: false, shippingPhase: undefined, actions: {} };
    // Should not throw despite initial stream error
    const { success } = await executeShippingPhase(metrics, pipelineResult, 'cid-stream', Date.now());
    expect(success).toBe(true);
    expect(pipelineResult.success).toBe(true);
  });

  it('throws when runShipping itself throws', async () => {
    (runShipping as jest.Mock).mockRejectedValueOnce(new Error('shipping crash'));
    const metrics: any = { startTime: Date.now(), iterationCount: 0, totalTokensUsed: 0, totalApiCalls: 0,
      lastValidationScore: 0, phaseTimings: { setup:0, discovery:0, implementation:0, validation:0, shipping:0 },
      resourceUsage: { peakMemory:0, totalProcessingTime:0, apiLatencies:[] }, iterationMetrics: [] };
    const pipelineResult: any = { success: true, readyToShip: true, shippingPhase: undefined, actions: {} };
  // Exceptions thrown by runShipping should be recorded as shipping failure
  const { success: throwSuccess, enhancedResult: throwResult } = await executeShippingPhase(
    metrics,
    pipelineResult,
    'cid-throw',
    Date.now()
  );
  expect(throwSuccess).toBe(false);
  // Pipeline result updated to reflect failure
  expect(pipelineResult.success).toBe(false);
  expect(pipelineResult.errors).toHaveLength(1);
  expect(pipelineResult.errors![0].message).toBe('shipping crash');
  // Enhanced result should be returned even on errors
  expect(throwResult).toBeDefined();
  });

  it('defaults file counts to zero when fileTracker is missing', async () => {
    // Shipping returns success
    const shipRes = { success: true, verificationSteps: [], finalChecklist: {}, error: undefined, deliverableType: 'open_pr', deliverableUrl: '', gitResults: null };
    (runShipping as jest.Mock).mockResolvedValueOnce(shipRes);
    // Remove fileTracker
    delete fakeCtx.repository.fileTracker;
    const metrics: any = { startTime: Date.now(), iterationCount: 1, totalTokensUsed: 0, totalApiCalls: 0,
      lastValidationScore: 0, phaseTimings: { setup:0, discovery:0, implementation:0, validation:0, shipping:0 },
      resourceUsage: { peakMemory:0, totalProcessingTime:0, apiLatencies:[] }, iterationMetrics: [] };
    const pipelineResult: any = { success: false, readyToShip: false, shippingPhase: undefined, actions: {} };
    const { enhancedResult } = await executeShippingPhase(metrics, pipelineResult, 'cid-no-tracker', Date.now());
    expect(enhancedResult.actions.files).toEqual({ edited: 0, created: 0, deleted: 0, renamed: 0, paths: [] });
  });

  it('handles unknown taskType without crashing', async () => {
    // Shipping returns success
    const shipRes = { success: true, verificationSteps: [], finalChecklist: {}, error: undefined, deliverableType: 'open_pr', deliverableUrl: '', gitResults: null };
    (runShipping as jest.Mock).mockResolvedValueOnce(shipRes);
    // Unknown taskContext
    fakeCtx.taskContext = { taskType: 'mystery' };
    const metrics: any = { startTime: Date.now(), iterationCount: 1, totalTokensUsed: 0, totalApiCalls: 0,
      lastValidationScore: 0, phaseTimings: { setup:0, discovery:0, implementation:0, validation:0, shipping:0 },
      resourceUsage: { peakMemory:0, totalProcessingTime:0, apiLatencies:[] }, iterationMetrics: [] };
    const pipelineResult: any = { success: false, readyToShip: false, shippingPhase: undefined, actions: {} };
    const { enhancedResult } = await executeShippingPhase(metrics, pipelineResult, 'cid-unknown', Date.now());
    // Actions should remain empty
    expect(enhancedResult.actions).toEqual({});
  });

  it('propagates zero metrics correctly', async () => {
    const shipRes = { success: true, verificationSteps: [], finalChecklist: {}, error: undefined, deliverableType: 'open_pr', deliverableUrl: '', gitResults: null };
    (runShipping as jest.Mock).mockResolvedValueOnce(shipRes);
    const metrics: any = { startTime: Date.now(), iterationCount: 0, totalTokensUsed: 0, totalApiCalls: 0,
      lastValidationScore: 0, phaseTimings: { setup:0, discovery:0, implementation:0, validation:0, shipping:0 },
      resourceUsage: { peakMemory:0, totalProcessingTime:0, apiLatencies:[] }, iterationMetrics: [] };
    const pipelineResult: any = { success: false, readyToShip: false, shippingPhase: undefined, actions: {} };
    const { enhancedResult } = await executeShippingPhase(metrics, pipelineResult, 'cid-zero', Date.now());
    expect(enhancedResult.metrics.totalTokensUsed).toBe(0);
    expect(enhancedResult.metrics.totalApiCalls).toBe(0);
  });
  
  describe('handleShippingFailure', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      // Setup basic context with minimal repository and iteration info
      fakeCtx = {
        dataStream: {},
        taskContext: {},
        repository: { fileTracker: { getOperations: () => [] } },
        getCurrentIteration: () => ({ phases: { validation: { success: false } } })
      } as any;
      (getGlobalContext as jest.Mock).mockReturnValue(fakeCtx);
    });

    it('records a string error and sends an error status', async () => {
      const pipelineResult: any = { success: true, errors: [], shippingPhase: undefined, actions: {} };
      await handleShippingFailure('fail_reason', pipelineResult, 'cid-fail');
      // Pipeline result mutated
      expect(pipelineResult.success).toBe(false);
      expect(pipelineResult.errors).toHaveLength(1);
      expect(pipelineResult.errors[0]).toMatchObject({ phase: 'shipping', message: 'fail_reason', code: 'SHIPPING_FAILED', severity: 'high' });
      // shippingPhase info
      expect(pipelineResult.shippingPhase).toMatchObject({ success: false, error: 'fail_reason', deliverableType: 'unknown' });
      // Should attempt to stream an error status
      expect(writeStreamMessage).toHaveBeenCalledWith(fakeCtx.dataStream, expect.objectContaining({
        type: 'status',
        executionState: { phase: 'Shipping', step: 'Error' },
        progress: 'error',
        message: 'Shipping phase failed',
        correlationId: 'cid-fail'
      }));
    });

    it('records an Error object and includes stack as details', async () => {
      const err = new Error('boom');
      err.stack = 'stack-trace';
      const pipelineResult: any = { success: true, errors: [], shippingPhase: undefined, actions: {} };
      await handleShippingFailure(err, pipelineResult, 'cid-err');
      expect(pipelineResult.success).toBe(false);
      expect(pipelineResult.errors[0]).toMatchObject({ message: 'boom' });
      expect(pipelineResult.shippingPhase.verificationSteps[0]).toMatchObject({ details: 'boom' });
      // metadata should reflect stack in error details stream
      const lastCall = (writeStreamMessage as jest.Mock).mock.calls.pop();
      expect(lastCall[1].detail).toBe('boom');
    });
  });

  it('handles shipping failure and records error', async () => {
    const shippingResult = { success: false, error: 'oops', deliverableType: 'create_issue' };
    (runShipping as jest.Mock).mockResolvedValue(shippingResult);

    const metrics: any = {
      startTime: Date.now(),
      iterationCount: 1,
      totalTokensUsed: 0,
      totalApiCalls: 0,
      lastValidationScore: 0,
      phaseTimings: { setup: 0, discovery: 0, implementation: 0, validation: 0, shipping: 0 },
      resourceUsage: { peakMemory: 0, totalProcessingTime: 0, apiLatencies: [] },
      iterationMetrics: []
    };
    const pipelineResult: any = { success: true, readyToShip: true, shippingPhase: undefined, errors: [], actions: {} };
    const correlationId = 'cid';
    const startTime = Date.now();
    const { success, enhancedResult } = await executeShippingPhase(metrics, pipelineResult, correlationId, startTime);

    expect(success).toBe(false);
    expect(pipelineResult.success).toBe(false);
    expect(pipelineResult.readyToShip).toBe(false);
    // Error recorded
    expect(pipelineResult.errors).toHaveLength(1);
    expect(pipelineResult.errors[0]).toMatchObject({ phase: 'shipping', message: 'oops', code: 'SHIPPING_FAILED' });
    expect(log).toHaveBeenCalledWith('Shipping phase completed with errors', 'warn', expect.any(Object));
    expect(writeStreamMessage).toHaveBeenCalledTimes(2);
    // Enhanced result still returned
    expect(enhancedResult).toBeDefined();
  });
});
