// @ts-nocheck
import { normalizeDeliverableOutput } from '../postprocess';
import { Execution } from '@bitcode/execution-generics';

describe('normalizeDeliverableOutput', () => {
  it('backfills prUrl, filesModified, and summary from execution', () => {
    const exec = new Execution('pipeline:deliverable');
    exec.store('shipping', 'pullRequestUrl', 'https://github.com/acme/repo/pull/123');
    exec.store('implementation', 'filesChanged', ['a.ts', 'b.ts']);

    const output: any = {
      success: true,
      deliverable: {},
      artifacts: {},
      summary: ''
    };

    const normalized = normalizeDeliverableOutput(output, exec);
    expect(normalized.deliverable.prUrl).toContain('/pull/123');
    expect(normalized.artifacts.filesModified).toEqual(['a.ts', 'b.ts']);
    expect(typeof normalized.summary).toBe('string');
    expect(normalized.summary.length).toBeGreaterThan(0);
  });
});
