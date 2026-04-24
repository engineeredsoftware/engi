/**
 * End-to-end smoke test for the AssetPack (SDIVF) pipeline.
 * Verifies that all phases are invoked and the final result is returned.
 */
// Mock phase wrappers
jest.mock('@bitcode/engine/pipeline/pipelineSetupPhaseWrapper', () => ({
  executeSetupPhase: jest.fn()
}));
jest.mock('@bitcode/engine/pipeline/iterationHandler', () => ({
  executeIteration: jest.fn()
}));
jest.mock('@bitcode/engine/pipeline/pipelineShippingPhaseWrapper', () => ({
  executeShippingPhase: jest.fn(),
  handleShippingFailure: jest.fn()
}));
// Mock streaming
jest.mock('@bitcode/streams', () => ({
  writeStreamMessage: jest.fn()
}));
// Provide minimal global context
jest.mock('@bitcode/context', () => ({
  getGlobalContext: jest.fn(() => ({
    dataStream: {},
    abortSignal: {},
    execution: { phases: { iterations: [] } },
    taskContext: { taskType: 'deliverables' },
    repository: { name: 'repo', branch: 'main' },
    fileDependencies: new Map()
  }))
}));

import { runSDIVFPipeline } from '@bitcode/engine/pipeline/pipelineSDIVF';
import { executeSetupPhase } from '@bitcode/engine/pipeline/pipelineSetupPhaseWrapper';
import { executeIteration } from '@bitcode/pipeline-engine-generics/iterations';
import { executeShippingPhase } from '@bitcode/engine/pipeline/pipelineShippingPhaseWrapper';

describe('runSDIVFPipeline E2E smoke', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (executeSetupPhase as jest.Mock).mockResolvedValue({
      success: true,
      setupResult: { feedback: 'ok' }
    });
    (executeIteration as jest.Mock).mockResolvedValue({
      success: true,
      validationPassed: true
    });
    (executeShippingPhase as jest.Mock).mockResolvedValue({
      success: true,
      enhancedResult: { success: true }
    });
  });

  it('invokes all phases and returns the final PipelineResult', async () => {
    const result = await runSDIVFPipeline();
    expect(executeSetupPhase).toHaveBeenCalledTimes(1);
    expect(executeIteration).toHaveBeenCalledTimes(1);
    expect(executeShippingPhase).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('success', true);
  });
});
