// @ts-nocheck
import { Execution } from '@bitcode/execution-generics';
import {
  resolveExpressedNeed,
  resolveExpressedNeedFromExecution,
  resolveNeedComprehensionFromExecution,
  resolveWrittenAssetType,
  resolveWrittenAssetTypeFromExecution,
} from '../semantic-resolution';

describe('deliverable semantic resolution', () => {
  it('prefers writtenAssetType over retained deliverableType compatibility fields', () => {
    expect(
      resolveWrittenAssetType({
        writtenAssetType: 'design-document-review',
        deliverableType: 'code-change',
      })
    ).toBe('design-document-review');
  });

  it('normalizes execution state through writtenAssetType before deliverableType', () => {
    const exec = new Execution('pipeline:deliverable');
    exec.store('pipeline', 'deliverableType', 'code-change');
    exec.store('pipeline', 'writtenAssetType', ['design-document']);

    expect(resolveWrittenAssetTypeFromExecution(exec)).toBe('design-document');
  });

  it('prefers semantic need over retained Definition of Done compatibility fields', () => {
    expect(
      resolveExpressedNeed({
        need: 'Need a review-ready asset pack',
        definitionOfNeed: 'Definition of Need mirror',
        definitionOfDone: 'Old compatibility text',
        taskDescription: 'Older task wording',
      })
    ).toBe('Need a review-ready asset pack');
  });

  it('reads semantic need and need comprehension from execution mirrors first', () => {
    const exec = new Execution('pipeline:deliverable');
    exec.store('pipeline', 'expressedNeed', 'Compatibility fallback');
    exec.store('need', 'description', 'Need a repository-bound written asset');
    exec.store('setup/task', 'comprehension', { intent: 'compatibility-task' });
    exec.store('setup/need', 'comprehension', { intent: 'semantic-need' });

    expect(resolveExpressedNeedFromExecution(exec)).toBe('Need a repository-bound written asset');
    expect(resolveNeedComprehensionFromExecution(exec)).toEqual({ intent: 'semantic-need' });
  });
});
