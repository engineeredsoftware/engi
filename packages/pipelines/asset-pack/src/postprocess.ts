import type { AssetPackOutput, AssetPackPostprocessed } from './types/PipelineSchemas';
import { Execution, getValidationReadyToFinish } from '@bitcode/execution-generics';
import {
  resolveDeliveryMechanismTemplateFromExecution,
  resolveWrittenAssetTypeFromExecution,
} from './semantic-resolution';

export function normalizeAssetPackOutput(output: AssetPackOutput, execution: Execution): AssetPackOutput {
  const enhanced = { ...output };
  const deliveryMechanism = enhanced.deliveryMechanism || enhanced.shippable;
  const assetPackSynthesisArtifacts =
    enhanced.assetPackSynthesisArtifacts ||
    findStoredExecutionValue(execution, 'implementation', 'assetPackSynthesisArtifacts') ||
    findStoredExecutionValue(execution, 'finish/asset_pack_completion', 'assetPackSynthesisArtifacts') ||
    enhanced.writtenAssets;
  const writtenAssetType = resolveWrittenAssetTypeFromExecution(execution);
  const deliveryMechanismTemplate = resolveDeliveryMechanismTemplateFromExecution(execution);
  const fitResult =
    (execution as any).findUp?.('fit', 'result') ||
    (execution as any).get?.('fit', 'result');
  const depositorySearch =
    (execution as any).findUp?.('depository/search', 'result') ||
    (execution as any).get?.('depository/search', 'result');

  // 1) Ensure connected-interface links are populated if available on execution.
  const prUrl =
    enhanced.writtenAsset?.prUrl ||
    deliveryMechanism?.prUrl ||
    (execution.get('finish', 'prUrl') as string) ||
    (execution.get('finish', 'pullRequestUrl') as string);
  if (prUrl) {
    enhanced.deliveryMechanism = { ...(deliveryMechanism || {}), prUrl } as any;
    enhanced.shippable = { ...(enhanced.shippable || enhanced.deliveryMechanism || {}), prUrl } as any;
  }

  // 2) Backfill artifacts from execution if missing
  const filesModified = enhanced.artifacts?.filesModified?.length
    ? enhanced.artifacts.filesModified
    : ((execution.get('implementation', 'filesChanged') as string[]) || []);
  if (filesModified?.length) {
    enhanced.artifacts = {
      ...(enhanced.artifacts || ({} as any)),
      filesModified,
    } as any;
  }

  // 3) Ensure a human-readable summary exists
  if (!enhanced.summary || !enhanced.summary.trim()) {
    const parts: string[] = [];
    parts.push(enhanced.success ? 'AssetPack synthesis artifacts completed.' : 'AssetPack synthesis artifacts finished with issues.');
    if (prUrl) parts.push(`PR: ${prUrl}`);
    if (filesModified?.length) parts.push(`Files modified: ${filesModified.length}`);
    enhanced.summary = parts.join(' ');
  }

  if (assetPackSynthesisArtifacts) {
    enhanced.assetPackSynthesisArtifacts = assetPackSynthesisArtifacts as any;
    enhanced.writtenAssets = enhanced.writtenAssets || assetPackSynthesisArtifacts as any;
  }
  enhanced.semanticKind = 'asset-pack-written-asset';
  enhanced.read =
    enhanced.read ||
    (execution.get('pipeline', 'expressedRead') as string) ||
    (execution.get('read', 'description') as string) ||
    undefined;
  enhanced.writtenAssetType = writtenAssetType;
  enhanced.deliveryMechanismTemplate = deliveryMechanismTemplate;
  if (fitResult) {
    (enhanced as any).fitResult = fitResult;
    (enhanced as any).fit = fitResult;
    (enhanced as any).resultState = fitResult.resultState;
  }
  if (depositorySearch) {
    (enhanced as any).depositorySearch = depositorySearch;
  }
  if (!enhanced.deliveryMechanism && enhanced.shippable) {
    enhanced.deliveryMechanism = { ...enhanced.shippable };
  }
  if (!enhanced.shippable && enhanced.deliveryMechanism) {
    enhanced.shippable = { ...enhanced.deliveryMechanism };
  }

  return enhanced;
}

export function buildAssetPackPostprocessedResult(
  execution: Execution,
  normalized: AssetPackOutput
): AssetPackPostprocessed {
  const executionId = String(execution.get('execution', 'id') || '');
  const repoOwner = execution.get('source', 'owner');
  const repoName = execution.get('source', 'name');
  const repoFull = execution.get('source', 'fullName');
  const repository =
    (repoOwner && repoName
      ? `${String(repoOwner)}/${String(repoName)}`
      : typeof repoFull === 'string'
        ? repoFull
        : undefined) || undefined;

  const finalSummary =
    findStoredExecutionValue(execution, 'implementation', 'assetPackSynthesisArtifacts')?.summary ||
    findStoredExecutionValue(execution, 'finish/asset_pack_completion', 'assetPackSynthesisArtifacts')?.summary ||
    findStoredExecutionValue(execution, 'finish/asset_pack_completion', 'writtenAssets')?.summary ||
    findStoredExecutionValue(execution, 'finish/asset_pack_completion', 'shippables')?.summary ||
    findStoredExecutionValue(execution, 'finish/asset_pack_completion', 'summary') ||
    normalized.assetPackSynthesisArtifacts?.summary ||
    normalized.summary ||
    undefined;

  const finishArtifacts =
    findStoredExecutionValue(execution, 'implementation', 'assetPackSynthesisArtifacts') ||
    findStoredExecutionValue(execution, 'finish/asset_pack_completion', 'assetPackSynthesisArtifacts') ||
    findStoredExecutionValue(execution, 'finish/asset_pack_completion', 'writtenAssets') ||
    normalized.assetPackSynthesisArtifacts;
  const filesCreated =
    normalized.artifacts?.filesCreated ??
    finishArtifacts?.fileChanges?.created ??
    [];
  const filesModified =
    normalized.artifacts?.filesModified ??
    finishArtifacts?.fileChanges?.modified ??
    [];

  const artifacts =
    filesCreated.length ||
    filesModified.length ||
    normalized.artifacts?.documentation?.length
      ? {
          filesCreated,
          filesModified,
          testsAdded: normalized.artifacts?.testsAdded ?? 0,
          testsPassing: normalized.artifacts?.testsPassing,
          documentation: normalized.artifacts?.documentation ?? [],
        }
      : null;

  const validationReady = getValidationReadyToFinish(execution, 'asset-pack');
  const writtenAssetType = resolveWrittenAssetTypeFromExecution(execution);
  const deliveryMechanismTemplate = resolveDeliveryMechanismTemplateFromExecution(execution);
  const fitResult =
    (execution as any).findUp?.('fit', 'result') ||
    (execution as any).get?.('fit', 'result') ||
    (normalized as any).fitResult;
  const depositorySearch =
    (execution as any).findUp?.('depository/search', 'result') ||
    (execution as any).get?.('depository/search', 'result') ||
    (normalized as any).depositorySearch;
  const shippable = normalized.shippable || normalized.deliveryMechanism;
  const shippables =
    normalized.shippables ||
    (shippable
      ? {
          ...(shippable.prUrl ? { pullRequest: { url: shippable.prUrl, title: shippable.title } } : {}),
          summary: finalSummary || normalized.summary || null,
        }
      : null);

  return {
    executionId,
    kind: 'shippable',
    semanticKind: 'asset-pack-written-asset',
    title:
      normalized.writtenAsset?.title ||
      normalized.shippable?.title ||
      normalized.deliveryMechanism?.title ||
      finalSummary ||
      normalized.summary ||
      'Written Asset',
    repository,
    summary: finalSummary,
    shippable,
    shippables: shippables as any,
    deliveryMechanism: normalized.deliveryMechanism || shippable,
    assetPackSynthesisArtifacts: (finishArtifacts || normalized.assetPackSynthesisArtifacts || null) as any,
    writtenAssets: (finishArtifacts || normalized.assetPackSynthesisArtifacts || null) as any,
    artifacts,
    writtenAssetType,
    deliveryMechanismTemplate,
    ...(fitResult
      ? {
          fitResult,
          fit: fitResult,
          resultState: fitResult.resultState,
        }
      : {}),
    ...(depositorySearch ? { depositorySearch } : {}),
    read:
      normalized.read ||
      (execution.get('pipeline', 'expressedRead') as string) ||
      (execution.get('read', 'description') as string) ||
      undefined,
    assetPack: {
      read:
        normalized.read ||
        (execution.get('pipeline', 'expressedRead') as string) ||
        (execution.get('read', 'description') as string) ||
        undefined,
      writtenAssetType,
      deliveryMechanismTemplate,
    },
    ...(validationReady
      ? {
          validationReady: {
            approved: !!validationReady.approved,
            assessment: validationReady.assessment ?? null,
            confidence:
              typeof validationReady.confidence === 'number'
                ? validationReady.confidence
                : null,
          },
        }
      : {}),
  };
}

function findStoredExecutionValue(execution: Execution, namespace: string, key: string): any {
  const localValue = (execution as any).get?.(namespace, key);
  if (localValue !== undefined) return localValue;

  const upwardValue = (execution as any).findUp?.(namespace, key);
  if (upwardValue !== undefined) return upwardValue;

  const root = (execution as any).getRoot?.() || execution;
  return findStoredExecutionValueDown(root, namespace, key);
}

function findStoredExecutionValueDown(node: any, namespace: string, key: string): any {
  if (!node) return undefined;
  const value = node.get?.(namespace, key);
  if (value !== undefined) return value;
  for (const child of node.children?.values?.() || []) {
    const childValue = findStoredExecutionValueDown(child, namespace, key);
    if (childValue !== undefined) return childValue;
  }
  return undefined;
}
