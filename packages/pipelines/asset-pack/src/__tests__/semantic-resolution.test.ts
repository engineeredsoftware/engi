// @ts-nocheck
import { Execution } from '@bitcode/execution-generics';
import {
  resolveDeliveryMechanismTemplate,
  resolveDeliveryMechanismTemplateFromExecution,
  resolveExpressedNeed,
  resolveExpressedNeedFromExecution,
  resolveNeedComprehensionFromExecution,
  resolveWrittenAssetType,
  resolveWrittenAssetTypeFromExecution,
} from '../semantic-resolution';

describe('AssetPack semantic resolution', () => {
  it('collapses compatibility request labels to the canonical AssetPack kind', () => {
    expect(
      resolveWrittenAssetType({
        writtenAssetType: 'design-document-review',
        deliverableType: 'code-change',
      })
    ).toBe('need-satisfaction-asset-pack');
  });

  it('normalizes old request labels as delivery-mechanism templates', () => {
    expect(resolveDeliveryMechanismTemplate({ writtenAssetType: 'code-change' })).toBe('pull-request');
    expect(resolveDeliveryMechanismTemplate({ deliverableType: 'code-change-review' })).toBe('review-comment');
    expect(resolveDeliveryMechanismTemplate({ writtenAssetType: 'design-document' })).toBe('issue');
    expect(resolveDeliveryMechanismTemplate({ writtenAssetType: 'design-document-review' })).toBe('issue-comment');
  });

  it('reads delivery-mechanism templates from execution without changing written-asset kind', () => {
    const exec = new Execution('pipeline:asset-pack');
    exec.store('pipeline', 'deliverableType', 'code-change');
    exec.store('pipeline', 'writtenAssetType', ['design-document']);
    exec.store('pipeline', 'deliveryMechanismTemplate', 'issue-comment');

    expect(resolveWrittenAssetTypeFromExecution(exec)).toBe('need-satisfaction-asset-pack');
    expect(resolveDeliveryMechanismTemplateFromExecution(exec)).toBe('issue-comment');
  });

  it('prefers semantic need over Definition of Need mirror fields', () => {
    expect(
      resolveExpressedNeed({
        need: 'Need a review-ready asset pack',
        definitionOfNeed: 'Definition of Need mirror',
      })
    ).toBe('Need a review-ready asset pack');
  });

  it('reads semantic need and need comprehension from execution mirrors first', () => {
    const exec = new Execution('pipeline:asset-pack');
    exec.store('pipeline', 'expressedNeed', 'Compatibility fallback');
    exec.store('need', 'description', 'Need a repository-bound written asset');
    exec.store('setup/need-comprehension', 'comprehension', { intent: 'need-model' });
    exec.store('setup/need', 'comprehension', { intent: 'semantic-need' });

    expect(resolveExpressedNeedFromExecution(exec)).toBe('Need a repository-bound written asset');
    expect(resolveNeedComprehensionFromExecution(exec)).toEqual({ intent: 'semantic-need' });
  });
});
