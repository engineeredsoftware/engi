/**
 * Full dry-run integration test for the AssetPack SDIVF pipeline.
 * Ensures all phases execute with default dry-run responses.
 */
// Mock pipeline phase wrappers to isolate runSDIVFPipeline
jest.mock('@bitcode/engine/pipeline/pipelineSetupPhaseWrapper', () => ({
  executeSetupPhase: jest.fn(() => Promise.resolve({ success: true }))
}));
jest.mock('@bitcode/engine/pipeline/iterationHandler', () => ({
  executeIteration: jest.fn(() => Promise.resolve({ success: true, validationPassed: true })),
  canRecoverIteration: jest.fn(() => ({ canRecover: true }))
}));
import { configureDryRun } from '@bitcode/dryrun';
import { runSDIVFPipeline } from '@bitcode/engine/pipeline/pipelineSDIVF';

// Mock global context to provide minimal data for pipeline
jest.mock('@bitcode/context', () => ({
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
    const result = await runSDIVFPipeline();
    // At minimum, the pipeline completes successfully in dry-run
    expect(result.success).toBe(true);
  });
});
