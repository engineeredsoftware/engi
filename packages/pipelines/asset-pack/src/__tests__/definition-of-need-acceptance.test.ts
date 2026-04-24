// @ts-nocheck
import deliverablePipeline from '../index';
import { Execution } from '@bitcode/execution-generics';

describe('Deliverable pipeline - formal Definition of Need acceptance criteria (pending full SDIVF enablement)', () => {
  const base = {
    definitionOfNeed: 'Implement feature Y',
    repository: { url: 'https://github.com/acme/repo', branch: 'main' },
    deliveryTarget: 'pr' as const,
  };

  it('accepts good acceptanceCriteria', async () => {
    const input = {
      ...base,
      acceptanceCriteria: {
        functionality: 'Feature works as described',
        tests: { mustPass: true, coverageMin: 80 },
        documentation: { required: true },
        security: { scanRequired: true, severityThreshold: 'high' }
      }
    };
    const res = await deliverablePipeline(input, new Execution('definition-of-need:good'));
    expect(res.success).toBe(true);
    expect(res.deliverable.prUrl).toContain('/pull/');
  });

  it('accepts bad acceptanceCriteria (pipeline still runs; validation agents enforce)', async () => {
    const input = {
      ...base,
      acceptanceCriteria: {
        functionality: 'Partial',
        tests: { mustPass: false, coverageMin: 0 },
        documentation: { required: false },
        security: { scanRequired: false, severityThreshold: 'critical' }
      }
    };
    const res = await deliverablePipeline(input, new Execution('definition-of-need:bad'));
    expect(res.success).toBe(true);
    expect(typeof res.summary).toBe('string');
  });
});
