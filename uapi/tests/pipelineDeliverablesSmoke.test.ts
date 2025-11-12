/**
 * End-to-end smoke test for the Deliverables (SDIVS) pipeline.
 * Verifies that all phases are invoked and the final result is returned.
 */
// Mock phase wrappers
jest.mock('@engi/engine/pipeline/pipelineSetupPhaseWrapper', () => ({
  executeSetupPhase: jest.fn()
}));
jest.mock('@engi/engine/pipeline/iterationHandler', () => ({
  executeIteration: jest.fn()
}));
jest.mock('@engi/engine/pipeline/pipelineShippingPhaseWrapper', () => ({
  executeShippingPhase: jest.fn(),
  handleShippingFailure: jest.fn()
}));
// Mock streaming
jest.mock('@engi/streams', () => ({
  writeStreamMessage: jest.fn()
}));
// Provide minimal global context
jest.mock('@engi/context', () => ({
  getGlobalContext: jest.fn(() => ({
    dataStream: {},
    abortSignal: {},
    execution: { phases: { iterations: [] } },
    taskContext: { taskType: 'deliverables' },
    repository: { name: 'repo', branch: 'main' },
    fileDependencies: new Map()
  }))
}));

import { runSDIVSPipeline } from '@engi/engine/pipeline/pipelineSDIVS';
import { executeSetupPhase } from '@engi/engine/pipeline/pipelineSetupPhaseWrapper';
import { executeIteration } from '@engi/pipeline-engine-generics/iterations';
import { executeShippingPhase } from '@engi/engine/pipeline/pipelineShippingPhaseWrapper';

describe('runSDIVSPipeline E2E smoke', () => {
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
    const result = await runSDIVSPipeline();
    expect(executeSetupPhase).toHaveBeenCalledTimes(1);
    expect(executeIteration).toHaveBeenCalledTimes(1);
    expect(executeShippingPhase).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('success', true);
  });
});
