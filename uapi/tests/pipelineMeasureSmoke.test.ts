/**
 * End-to-end smoke test for the Measure SDIVS pipeline.
 * Verifies that each phase wrapper is invoked and a scalar Engi is returned.
 */
// Mock phase wrappers so we don’t execute real agent logic during unit test.
jest.mock('@engi/pipelines/measure/src/phases/setup', () => ({
  runSetupMeasure: jest.fn(async () => ({ success: true })),
}));
jest.mock('@engi/pipelines/measure/src/phases/discovery', () => ({
  runDiscoveryMeasure: jest.fn(async () => ({ success: true })),
}));
jest.mock('@engi/pipelines/measure/src/phases/implementation', () => ({
  runMeasureImplementation: jest.fn(async () => ({ engi: 42, shown_work: 'stub' })),
}));
jest.mock('@engi/pipelines/measure/src/phases/validation', () => ({
  runValidationMeasure: jest.fn(async () => ({ success: true })),
}));
jest.mock('@engi/pipelines/measure/src/phases/shipping', () => ({
  runShippingMeasure: jest.fn(async () => ({ engi: 42, explanation: 'ok' })),
}));

jest.mock('@engi/streams', () => ({ writeStreamMessage: jest.fn() }));

jest.mock('@engi/context', () => ({
  getGlobalContext: () => ({
    dataStream: {},
    abortSignal: {},
  }),
}));

import { runMeasurePipeline } from '@engi/engine/pipeline/pipelineMeasureSDIVS';
import { runSetupMeasure } from '@engi/pipelines/measure';
import { runDiscoveryMeasure } from '@engi/pipelines/measure';
import { runMeasureImplementation } from '@engi/pipelines/measure';
import { runValidationMeasure } from '@engi/pipelines/measure';
import { runShippingMeasure } from '@engi/pipelines/measure';

describe('Measure pipeline smoke', () => {
  it('invokes all phase wrappers and returns Engi scalar', async () => {
    const result = await runMeasurePipeline({ mom: 'test-mom' });

    expect(runSetupMeasure).toHaveBeenCalled();
    expect(runDiscoveryMeasure).toHaveBeenCalled();
    expect(runMeasureImplementation).toHaveBeenCalled();
    expect(runValidationMeasure).toHaveBeenCalled();
    expect(runShippingMeasure).toHaveBeenCalled();

    expect(result.success).toBe(true);
    expect(result.engi).toBe(42);
    expect(result.explanation).toBeDefined();
  });
});
