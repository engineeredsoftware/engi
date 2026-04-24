import type { AssetPackOutput, AssetPackPostprocessed } from './types/PipelineSchemas';
import { Execution, getValidationReadyToFinish } from '@bitcode/execution-generics';
import {
  resolveDeliveryMechanismTemplateFromExecution,
  resolveWrittenAssetTypeFromExecution,
} from './semantic-resolution';

export function normalizeAssetPackOutput(output: AssetPackOutput, execution: Execution): AssetPackOutput {
  const enhanced = { ...output };
  const deliveryMechanism = enhanced.deliveryMechanism || enhanced.deliverable;
  const assetPackSynthesisArtifacts =
    enhanced.assetPackSynthesisArtifacts ||
    (execution as any).get?.('implementation', 'assetPackSynthesisArtifacts') ||
    (execution as any).get?.('finish/final_work_summary', 'assetPackSynthesisArtifacts') ||
    enhanced.writtenAssets;
  const writtenAssetType = resolveWrittenAssetTypeFromExecution(execution);
  const deliveryMechanismTemplate = resolveDeliveryMechanismTemplateFromExecution(execution);

  // 1) Ensure connected-interface links are populated if available on execution.
  const prUrl =
    enhanced.writtenAsset?.prUrl ||
    deliveryMechanism?.prUrl ||
    (execution.get('finish', 'prUrl') as string) ||
    (execution.get('finish', 'pullRequestUrl') as string);
  if (prUrl) {
    enhanced.deliveryMechanism = { ...(deliveryMechanism || {}), prUrl } as any;
    enhanced.deliverable = { ...(enhanced.deliverable || enhanced.deliveryMechanism || {}), prUrl } as any;
    enhanced.writtenAsset = { ...(enhanced.writtenAsset || enhanced.deliveryMechanism || {}), prUrl } as any;
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
  enhanced.need =
    enhanced.need ||
    (execution.get('pipeline', 'expressedNeed') as string) ||
    (execution.get('need', 'description') as string) ||
    undefined;
  enhanced.writtenAssetType = writtenAssetType;
  enhanced.deliverableType = writtenAssetType;
  enhanced.deliveryMechanismTemplate = deliveryMechanismTemplate;
  if (!enhanced.deliveryMechanism && enhanced.deliverable) {
    enhanced.deliveryMechanism = { ...enhanced.deliverable };
  }
  if (!enhanced.deliverable && enhanced.deliveryMechanism) {
    enhanced.deliverable = { ...enhanced.deliveryMechanism };
  }
  if (!enhanced.writtenAsset && enhanced.deliverable) {
    enhanced.writtenAsset = { ...enhanced.deliverable };
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
    (execution as any).get?.('finish/final_work_summary', 'summary') ||
    (execution as any).get?.('finish/final_work_summary', 'assetPackSynthesisArtifacts')?.summary ||
    (execution as any).get?.('finish/final_work_summary', 'writtenAssets')?.summary ||
    (execution as any).get?.('finish/final_work_summary', 'deliverables')?.summary ||
    normalized.assetPackSynthesisArtifacts?.summary ||
    normalized.summary ||
    undefined;

  const finishArtifacts =
    (execution as any).get?.('finish/final_work_summary', 'assetPackSynthesisArtifacts') ||
    (execution as any).get?.('finish/final_work_summary', 'writtenAssets') ||
    (execution as any).get?.('finish/final_work_summary', 'deliverables') ||
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

  return {
    executionId,
    kind: 'deliverable',
    semanticKind: 'asset-pack-written-asset',
    title:
      normalized.writtenAsset?.title ||
      normalized.deliveryMechanism?.title ||
      normalized.deliverable?.title ||
      normalized.summary ||
      'Written Asset',
    repository,
    summary: finalSummary,
    deliveryMechanism: normalized.deliveryMechanism || normalized.deliverable,
    assetPackSynthesisArtifacts: (finishArtifacts || normalized.assetPackSynthesisArtifacts || null) as any,
    artifacts,
    deliverableType: writtenAssetType,
    writtenAssetType,
    deliveryMechanismTemplate,
    need:
      normalized.need ||
      (execution.get('pipeline', 'expressedNeed') as string) ||
      (execution.get('need', 'description') as string) ||
      undefined,
    assetPack: {
      need:
        normalized.need ||
        (execution.get('pipeline', 'expressedNeed') as string) ||
        (execution.get('need', 'description') as string) ||
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

export const normalizeDeliverableOutput = normalizeAssetPackOutput;
export const buildDeliverablePostprocessedResult = buildAssetPackPostprocessedResult;
