// @ts-nocheck
import deliverablePipeline from '../index';
import { Execution } from '@engi/execution-generics';

describe('Deliverable pipeline - shipping & validation variants (test-mode stubs)', () => {
  const base = {
    taskDescription: 'Ship feature Z',
    repository: { url: 'https://github.com/acme/repo', branch: 'main' },
    deliveryTarget: 'pr' as const,
  };

  it('ships successfully with minimal inputs', async () => {
    const res = await deliverablePipeline(base, new Execution('ship:minimal'));
    expect(res?.deliverable?.prUrl || res?.deliverable?.pr_url || '').toContain('/pull/');
  });

  it('ships with permissive validation (stubbed)', async () => {
    const input = {
      ...base,
      acceptanceCriteria: {
        functionality: 'Works',
        tests: { mustPass: true, coverageMin: 50 },
      }
    };
    const res = await deliverablePipeline(input, new Execution('ship:valid'));
    expect(res?.deliverable?.prUrl || '').toContain('/pull/');
  });

  it('ships even when validation criteria are weak (enforced by agents in full run)', async () => {
    const input = {
      ...base,
      acceptanceCriteria: {
        functionality: 'Partial',
        tests: { mustPass: false, coverageMin: 0 },
      }
    };
    const res = await deliverablePipeline(input, new Execution('ship:weak'));
    expect(res?.deliverable?.prUrl || '').toContain('/pull/');
  });
});

