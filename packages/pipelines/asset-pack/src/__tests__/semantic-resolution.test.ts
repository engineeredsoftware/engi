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
  it('resolves request labels to the canonical AssetPack kind', () => {
    expect(
      resolveWrittenAssetType({
        writtenAssetType: 'design-document-review',
      })
    ).toBe('need-satisfaction-asset-pack');
  });

  it('normalizes admitted V26 written-asset request labels to pull-request delivery', () => {
    expect(resolveDeliveryMechanismTemplate({ writtenAssetType: 'code-change' })).toBe('pull-request');
    expect(resolveDeliveryMechanismTemplate({ writtenAssetType: 'branch-deployment' })).toBe('pull-request');
  });

  it('rejects old non-PR delivery labels instead of retaining them', () => {
    expect(() => resolveDeliveryMechanismTemplate({ writtenAssetType: 'code-change-review' })).toThrow(
      /pull-request delivery only/
    );
    expect(() => resolveDeliveryMechanismTemplate({ writtenAssetType: 'design-document' })).toThrow(
      /pull-request delivery only/
    );
    expect(() => resolveDeliveryMechanismTemplate({ writtenAssetType: 'design-document-review' })).toThrow(
      /pull-request delivery only/
    );
  });

  it('reads delivery-mechanism templates from execution without changing written-asset kind', () => {
    const exec = new Execution('pipeline:asset-pack');
    exec.store('pipeline', 'writtenAssetType', ['code-change']);
    exec.store('pipeline', 'deliveryMechanismTemplate', 'pull-request');

    expect(resolveWrittenAssetTypeFromExecution(exec)).toBe('need-satisfaction-asset-pack');
    expect(resolveDeliveryMechanismTemplateFromExecution(exec)).toBe('pull-request');
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
    exec.store('pipeline', 'expressedNeed', 'Pipeline need fallback');
    exec.store('need', 'description', 'Need a repository-bound written asset');
    exec.store('setup/need-comprehension', 'comprehension', { intent: 'need-model' });
    exec.store('setup/need', 'comprehension', { intent: 'semantic-need' });

    expect(resolveExpressedNeedFromExecution(exec)).toBe('Need a repository-bound written asset');
    expect(resolveNeedComprehensionFromExecution(exec)).toEqual({ intent: 'semantic-need' });
  });
});
