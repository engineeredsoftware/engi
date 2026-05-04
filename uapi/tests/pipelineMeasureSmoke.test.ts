/**
 * End-to-end smoke test for the Measure SDIVS pipeline.
 * Verifies that each phase wrapper is invoked and a scalar Bitcode value is returned.
 */
// Mock phase wrappers so we don’t execute real agent logic during unit test.
jest.mock('@bitcode/pipelines/measure/src/phases/setup', () => ({
  runSetupMeasure: jest.fn(async () => ({ success: true })),
}));
jest.mock('@bitcode/pipelines/measure/src/phases/discovery', () => ({
  runDiscoveryMeasure: jest.fn(async () => ({ success: true })),
}));
jest.mock('@bitcode/pipelines/measure/src/phases/implementation', () => ({
  runMeasureImplementation: jest.fn(async () => ({ bitcode: 42, shown_work: 'stub' })),
}));
jest.mock('@bitcode/pipelines/measure/src/phases/validation', () => ({
  runValidationMeasure: jest.fn(async () => ({ success: true })),
}));
jest.mock('@bitcode/pipelines/measure/src/phases/shipping', () => ({
  runShippingMeasure: jest.fn(async () => ({ bitcode: 42, explanation: 'ok' })),
}));

jest.mock('@bitcode/streams', () => ({ writeStreamMessage: jest.fn() }));

jest.mock('@bitcode/context', () => ({
  getGlobalContext: () => ({
    dataStream: {},
    abortSignal: {},
  }),
}));

import { runMeasurePipeline } from '@bitcode/engine/pipeline/pipelineMeasureSDIVS';
import { runSetupMeasure } from '@bitcode/pipelines/measure';
import { runDiscoveryMeasure } from '@bitcode/pipelines/measure';
import { runMeasureImplementation } from '@bitcode/pipelines/measure';
import { runValidationMeasure } from '@bitcode/pipelines/measure';
import { runShippingMeasure } from '@bitcode/pipelines/measure';

describe('Measure pipeline smoke', () => {
  it('invokes all phase wrappers and returns Bitcode scalar', async () => {
    const result = await runMeasurePipeline({ mom: 'test-mom' });

    expect(runSetupMeasure).toHaveBeenCalled();
    expect(runDiscoveryMeasure).toHaveBeenCalled();
    expect(runMeasureImplementation).toHaveBeenCalled();
    expect(runValidationMeasure).toHaveBeenCalled();
    expect(runShippingMeasure).toHaveBeenCalled();

    expect(result.success).toBe(true);
    expect(result.bitcode).toBe(42);
    expect(result.explanation).toBeDefined();
  });
});
