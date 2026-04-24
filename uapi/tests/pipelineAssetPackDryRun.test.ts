/**
 * Full dry-run integration test for the AssetPack SDIVF pipeline.
 * Ensures all phases execute with default dry-run responses.
 */
import { configureDryRun } from '@bitcode/dryrun';
import { runSDIVFPipeline } from '@bitcode/engine/pipeline/pipelineSDIVF';

// Mock global context to provide minimal data for pipeline
jest.mock('@bitcode/context', () => ({
  getGlobalContext: jest.fn(() => ({
    dataStream: { writeData: jest.fn(), close: jest.fn() },
    abortSignal: {},
    execution: { phases: { iterations: [] } },
    needContext: { executionType: 'asset-pack', need: 'test-need' },
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

describe('runSDIVFPipeline full AssetPack dry-run', () => {
  beforeAll(() => {
    // Enable dry run with mocked responses
    process.env.DRY_RUN_MODE = 'true';
    configureDryRun({ mockResponses: true });
  });

  it('executes all phases and returns a PipelineResult with default values', async () => {
    const result = await runSDIVFPipeline();
    // Overall success
    expect(result.success).toBe(true);
    // Metrics contain iteration count
    expect(result.metrics.iterations).toBeGreaterThanOrEqual(1);
    // Phase timings exist
    expect(typeof result.metrics.phaseTimings.discovery).toBe('number');
    expect(typeof result.metrics.phaseTimings.implementation).toBe('number');
    expect(typeof result.metrics.phaseTimings.validation).toBe('number');
    expect(typeof result.metrics.phaseTimings.finish).toBe('number');
    // Actions.files default structure
    expect(result.actions.files).toHaveProperty('paths');
    expect(Array.isArray(result.actions.files.paths)).toBe(true);
    // No errors in pipelineResult
    expect(result.errors).toBeUndefined();
    // Validation passed
    expect(result.validationPassed).toBe(true);
    // Ready to Finish
    expect(result.readyToFinish).toBe(true);
  });
});
