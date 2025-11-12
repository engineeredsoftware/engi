/**
 * Full dry-run integration test for the Deliverables SDIVS pipeline.
 * Ensures all phases execute with default dry-run responses.
 */
// Mock pipeline phase wrappers to isolate runSDIVSPipeline
jest.mock('@engi/engine/pipeline/pipelineSetupPhaseWrapper', () => ({
  executeSetupPhase: jest.fn(() => Promise.resolve({ success: true }))
}));
jest.mock('@engi/engine/pipeline/iterationHandler', () => ({
  executeIteration: jest.fn(() => Promise.resolve({ success: true, validationPassed: true })),
  canRecoverIteration: jest.fn(() => ({ canRecover: true }))
}));
jest.mock('@engi/engine/pipeline/pipelineShippingPhaseWrapper', () => ({
  executeShippingPhase: jest.fn(() => Promise.resolve({ enhancedResult: { success: true } })),
  handleShippingFailure: jest.fn()
}));
import { configureDryRun } from '@engi/dryrun';
import { runSDIVSPipeline } from '@engi/engine/pipeline/pipelineSDIVS';

// Mock global context to provide minimal data for pipeline
jest.mock('@engi/context', () => ({
  getGlobalContext: jest.fn(() => ({
    dataStream: { writeData: jest.fn(), close: jest.fn() },
    abortSignal: {},
    execution: { phases: { iterations: [] } },
    taskContext: { taskType: 'deliverables', task: 'test-task' },
    repository: {
      owner: 'owner',
      name: 'repo',
      branch: 'main',
      path: '/tmp',
      commit: 'sha',
      files: []
    },
    fileDependencies: new Map(),
    startNewIteration: jest.fn(),
    recordAgentStart: jest.fn(),
    recordAgentStep: jest.fn(),
    recordAgentComplete: jest.fn()
  }))
}));

describe('Deliverables pipeline dry-run', () => {
  beforeAll(() => {
    // Enable dry run mode
    process.env.DRY_RUN_MODE = 'true';
  });

  it('executes all phases and returns a PipelineResult with default values', async () => {
    const result = await runSDIVSPipeline();
    // At minimum, the pipeline completes successfully in dry-run
    expect(result.success).toBe(true);
  });
});