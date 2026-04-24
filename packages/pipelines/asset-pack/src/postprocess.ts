import type { DeliverableOutput, DeliverablePostprocessed } from './types/PipelineSchemas';
import { Execution, getValidationReadyToFinish } from '@bitcode/execution-generics';

export function normalizeDeliverableOutput(output: DeliverableOutput, execution: Execution): DeliverableOutput {
  const enhanced = { ...output };
  const deliveryMechanism = enhanced.deliveryMechanism || enhanced.deliverable;

  // 1) Ensure deliverable links are populated if available on execution
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
    parts.push(enhanced.success ? 'Written asset completed.' : 'Written asset finished with issues.');
    if (prUrl) parts.push(`PR: ${prUrl}`);
    if (filesModified?.length) parts.push(`Files modified: ${filesModified.length}`);
    enhanced.summary = parts.join(' ');
  }

  enhanced.semanticKind = 'asset-pack-written-asset';
  enhanced.need =
    enhanced.need ||
    (execution.get('pipeline', 'expressedNeed') as string) ||
    (execution.get('need', 'description') as string) ||
    undefined;
  enhanced.writtenAssetType =
    enhanced.writtenAssetType ||
    enhanced.deliverableType ||
    (execution.get('pipeline', 'writtenAssetType') as any) ||
    (execution.get('pipeline', 'deliverableType') as any) ||
    undefined;
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

export function buildDeliverablePostprocessedResult(
  execution: Execution,
  normalized: DeliverableOutput
): DeliverablePostprocessed {
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
    (execution as any).get?.('finish/final_work_summary', 'writtenAssets')?.summary ||
    (execution as any).get?.('finish/final_work_summary', 'deliverables')?.summary ||
    normalized.summary ||
    undefined;

  const finishArtifacts =
    (execution as any).get?.('finish/final_work_summary', 'writtenAssets') ||
    (execution as any).get?.('finish/final_work_summary', 'deliverables');
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
    artifacts,
    deliverableType:
      normalized.deliverableType ||
      normalized.writtenAssetType ||
      (execution.get('pipeline', 'writtenAssetType') as any) ||
      (execution.get('pipeline', 'deliverableType') as any) ||
      (execution as any).get?.('route/preprocessed', 'deliverables')?.deliverableType,
    writtenAssetType:
      normalized.writtenAssetType ||
      normalized.deliverableType ||
      (execution.get('pipeline', 'writtenAssetType') as any) ||
      (execution.get('pipeline', 'deliverableType') as any) ||
      (execution as any).get?.('route/preprocessed', 'assetPackWrittenAsset')?.writtenAssetType ||
      (execution as any).get?.('route/preprocessed', 'deliverables')?.deliverableType,
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
      writtenAssetType:
        normalized.writtenAssetType ||
        normalized.deliverableType ||
        (execution.get('pipeline', 'writtenAssetType') as any) ||
        (execution.get('pipeline', 'deliverableType') as any) ||
        (execution as any).get?.('route/preprocessed', 'assetPackWrittenAsset')?.writtenAssetType ||
        (execution as any).get?.('route/preprocessed', 'deliverables')?.deliverableType,
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
