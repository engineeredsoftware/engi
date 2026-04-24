// @ts-nocheck
import deliverablePipeline from '../index';
import { Execution } from '@bitcode/execution-generics';

describe('Deliverable pipeline - Finish/Delivering & validation variants (test-mode stubs)', () => {
  const base = {
    definitionOfNeed: 'Finish feature Z',
    repository: { url: 'https://github.com/acme/repo', branch: 'main' },
    deliveryTarget: 'pr' as const,
  };

  it('finishes successfully with minimal inputs', async () => {
    const res = await deliverablePipeline(base, new Execution('finish:minimal'));
    expect(res?.deliverable?.prUrl || res?.deliverable?.pr_url || '').toContain('/pull/');
  });

  it('finishes with permissive validation (stubbed)', async () => {
    const input = {
      ...base,
      acceptanceCriteria: {
        functionality: 'Works',
        tests: { mustPass: true, coverageMin: 50 },
      }
    };
    const res = await deliverablePipeline(input, new Execution('finish:valid'));
    expect(res?.deliverable?.prUrl || '').toContain('/pull/');
  });

  it('finishes even when validation criteria are weak (enforced by agents in full run)', async () => {
    const input = {
      ...base,
      acceptanceCriteria: {
        functionality: 'Partial',
        tests: { mustPass: false, coverageMin: 0 },
      }
    };
    const res = await deliverablePipeline(input, new Execution('finish:weak'));
    expect(res?.deliverable?.prUrl || '').toContain('/pull/');
  });
});
