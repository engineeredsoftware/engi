import type { AssetPackOutput, AssetPackPostprocessed } from './types/PipelineSchemas';
import { Execution, getValidationReadyToFinish } from '@bitcode/execution-generics';
import {
  resolveDeliveryMechanismTemplateFromExecution,
  resolveWrittenAssetTypeFromExecution,
} from './semantic-resolution';
import {
  buildAssetPackSourceSafePreview,
  isAcceptedReadNeed,
  type AssetPackSourceSafePreview,
} from './read-need';
import {
  assertAssetPackDisclosureSourceSafe,
  buildAssetPackDisclosureReview,
  type AssetPackDisclosureReview,
} from './asset-pack-disclosure';
import {
  buildAssetPackPreviewBoundary,
  persistAssetPackPreviewBoundary,
  type AssetPackPreviewBoundary,
} from './asset-pack-preview-boundary';
import {
  buildAssetPackSettlementRightsDeliveryBoundary,
  persistAssetPackSettlementRightsDeliveryBoundary,
  type AssetPackSettlementRightsDeliveryBoundary,
} from './asset-pack-settlement-rights-delivery';

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
  const sourceSafePreview = ensureAssetPackSourceSafePreview(execution, enhanced, prUrl);
  if (sourceSafePreview) {
    const assetPackDisclosureReview = ensureAssetPackDisclosureReview(execution, sourceSafePreview);
    const assetPackPreviewBoundary = ensureAssetPackPreviewBoundary(
      execution,
      sourceSafePreview,
      enhanced,
    );
    (enhanced as any).sourceSafePreview = sourceSafePreview;
    (enhanced as any).assetPackDisclosureReview = assetPackDisclosureReview;
    (enhanced as any).assetPackPreviewBoundary = assetPackPreviewBoundary;
    (enhanced as any).assetPackQuoteReceipt = assetPackPreviewBoundary?.quoteReceipt;
    (enhanced as any).assetPackSettlementInstructions = assetPackPreviewBoundary?.settlementInstructions;
    (enhanced as any).assetPackDeliveryPosture = assetPackPreviewBoundary?.deliveryPosture;
    const assetPackSettlementRightsDeliveryBoundary = assetPackPreviewBoundary
      ? ensureAssetPackSettlementRightsDeliveryBoundary(execution, assetPackPreviewBoundary, enhanced)
      : null;
    if (assetPackSettlementRightsDeliveryBoundary) {
      (enhanced as any).assetPackSettlementRightsDeliveryBoundary = assetPackSettlementRightsDeliveryBoundary;
      (enhanced as any).assetPackSettlementReplayReceipt = assetPackSettlementRightsDeliveryBoundary.replayReceipt;
      (enhanced as any).assetPackDeliveryUnlock = assetPackSettlementRightsDeliveryBoundary.deliveryUnlock;
      (enhanced as any).assetPackLedgerDatabaseStorageReconciliation =
        assetPackSettlementRightsDeliveryBoundary.reconciliationReport;
    }
    (enhanced as any).feeQuote = sourceSafePreview.feeQuote;
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
  const sourceSafePreview =
    ((normalized as any).sourceSafePreview as AssetPackSourceSafePreview | undefined) ||
    ensureAssetPackSourceSafePreview(
      execution,
      normalized,
      normalized.deliveryMechanism?.prUrl || normalized.shippable?.prUrl
    );
  const assetPackDisclosureReview = sourceSafePreview
    ? ensureAssetPackDisclosureReview(execution, sourceSafePreview)
    : undefined;
  const assetPackPreviewBoundary = sourceSafePreview
    ? ensureAssetPackPreviewBoundary(execution, sourceSafePreview, normalized)
    : undefined;
  const assetPackSettlementRightsDeliveryBoundary = assetPackPreviewBoundary
    ? ensureAssetPackSettlementRightsDeliveryBoundary(execution, assetPackPreviewBoundary, normalized)
    : null;
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
    ...(sourceSafePreview
      ? {
          sourceSafePreview,
          assetPackDisclosureReview,
          assetPackPreviewBoundary,
          assetPackQuoteReceipt: assetPackPreviewBoundary?.quoteReceipt,
          assetPackSettlementInstructions: assetPackPreviewBoundary?.settlementInstructions,
          assetPackDeliveryPosture: assetPackPreviewBoundary?.deliveryPosture,
          ...(assetPackSettlementRightsDeliveryBoundary
            ? {
                assetPackSettlementRightsDeliveryBoundary,
                assetPackSettlementReplayReceipt: assetPackSettlementRightsDeliveryBoundary.replayReceipt,
                assetPackDeliveryUnlock: assetPackSettlementRightsDeliveryBoundary.deliveryUnlock,
                assetPackLedgerDatabaseStorageReconciliation:
                  assetPackSettlementRightsDeliveryBoundary.reconciliationReport,
              }
            : {}),
          feeQuote: sourceSafePreview.feeQuote,
        }
      : {}),
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

function ensureAssetPackSourceSafePreview(
  execution: Execution,
  output: AssetPackOutput,
  pullRequestTarget?: string | null
): AssetPackSourceSafePreview | null {
  const storedPreview =
    findStoredExecutionValue(execution, 'asset-pack/preview', 'sourceSafe') ||
    findStoredExecutionValue(execution, 'asset-pack', 'sourceSafePreview');
  if (storedPreview?.schema === 'bitcode.asset-pack.source-safe-preview') {
    return storedPreview as AssetPackSourceSafePreview;
  }

  const acceptedNeed =
    findStoredExecutionValue(execution, 'read/need', 'accepted') ||
    findStoredExecutionValue(execution, 'read', 'acceptedNeed');
  if (!isAcceptedReadNeed(acceptedNeed)) {
    return null;
  }

  const fitResult =
    (output as any).fitResult ||
    findStoredExecutionValue(execution, 'fit', 'result');
  if (!fitResult?.schema) {
    return null;
  }

  const assetPackId =
    firstString(
      (output as any).assetPackId,
      output.assetPackSynthesisArtifacts?.assetPackId,
      output.writtenAssets?.assetPackId,
      output.writtenAsset?.payload?.assetPackId,
      output.deliveryMechanism?.payload?.assetPackId
    ) || undefined;
  const preview = buildAssetPackSourceSafePreview({
    need: acceptedNeed,
    fitResult,
    assetPackId,
    pullRequestTarget: firstString(pullRequestTarget, output.deliveryMechanism?.prUrl, output.shippable?.prUrl),
  });

  try {
    execution.store('asset-pack/preview', 'sourceSafe', preview as any);
    execution.store('asset-pack/preview', 'feeQuote', preview.feeQuote as any);
    execution.store('asset-pack/preview', 'previewRoot', preview.roots.previewRoot);
  } catch {}

  return preview;
}

function ensureAssetPackDisclosureReview(
  execution: Execution,
  sourceSafePreview: AssetPackSourceSafePreview,
): AssetPackDisclosureReview {
  const storedReview =
    findStoredExecutionValue(execution, 'asset-pack/preview', 'disclosureReview') ||
    findStoredExecutionValue(execution, 'asset-pack', 'disclosureReview');
  if (storedReview?.schema === 'bitcode.asset-pack.disclosure-review') {
    return storedReview as AssetPackDisclosureReview;
  }

  const review = buildAssetPackDisclosureReview({ preview: sourceSafePreview });
  assertAssetPackDisclosureSourceSafe(review);
  try {
    execution.store('asset-pack/preview', 'disclosureReview', review as any);
    execution.store('asset-pack/preview', 'disclosureReviewRoot', review.roots.reviewRoot);
  } catch {}
  return review;
}

function ensureAssetPackPreviewBoundary(
  execution: Execution,
  sourceSafePreview: AssetPackSourceSafePreview,
  output: AssetPackOutput,
): AssetPackPreviewBoundary | null {
  const storedBoundary =
    findStoredExecutionValue(execution, 'asset-pack/preview', 'boundary') ||
    findStoredExecutionValue(execution, 'asset-pack', 'previewBoundary');
  if (storedBoundary?.schema === 'bitcode.asset-pack.preview-boundary') {
    return storedBoundary as AssetPackPreviewBoundary;
  }

  const acceptedNeed =
    findStoredExecutionValue(execution, 'read/need', 'accepted') ||
    findStoredExecutionValue(execution, 'read', 'acceptedNeed');
  const fitResult =
    (output as any).fitResult ||
    findStoredExecutionValue(execution, 'fit', 'result');
  const boundary = buildAssetPackPreviewBoundary({
    need: isAcceptedReadNeed(acceptedNeed) ? acceptedNeed : null,
    fitResult,
    sourceSafePreview,
    pullRequestTarget: firstString(
      sourceSafePreview.delivery.pullRequestTarget,
      output.deliveryMechanism?.prUrl,
      output.shippable?.prUrl,
    ),
  });
  persistAssetPackPreviewBoundary(execution, boundary);
  return boundary;
}

function ensureAssetPackSettlementRightsDeliveryBoundary(
  execution: Execution,
  previewBoundary: AssetPackPreviewBoundary,
  output: AssetPackOutput,
): AssetPackSettlementRightsDeliveryBoundary | null {
  const storedBoundary =
    findStoredExecutionValue(execution, 'asset-pack/settlement', 'boundary') ||
    findStoredExecutionValue(execution, 'asset-pack', 'settlementRightsDeliveryBoundary');
  if (storedBoundary?.schema === 'bitcode.asset-pack.settlement-rights-delivery-boundary') {
    return storedBoundary as AssetPackSettlementRightsDeliveryBoundary;
  }

  const paymentObservation =
    (output as any).settlementObservation ||
    (output as any).paymentObservation ||
    (output as any).btcPaymentObservation ||
    findStoredExecutionValue(execution, 'asset-pack/settlement', 'paymentObservation') ||
    findStoredExecutionValue(execution, 'btc/fee', 'paymentObservation');
  if (!paymentObservation) {
    return null;
  }

  const boundary = buildAssetPackSettlementRightsDeliveryBoundary({
    previewBoundary,
    paymentObservation,
    finality:
      (output as any).settlementFinality ||
      (output as any).btcFinality ||
      findStoredExecutionValue(execution, 'asset-pack/settlement', 'finalityReceipt') ||
      undefined,
    readerWalletId:
      firstString((output as any).readerWalletId, findStoredExecutionValue(execution, 'reader', 'walletId')),
    depositorWalletId:
      firstString((output as any).depositorWalletId, findStoredExecutionValue(execution, 'depositor', 'walletId')),
    pullRequestTarget: firstString(
      previewBoundary.sourceSafePreview.delivery.pullRequestTarget,
      output.deliveryMechanism?.prUrl,
      output.shippable?.prUrl,
    ),
  });
  persistAssetPackSettlementRightsDeliveryBoundary(execution, boundary);
  return boundary;
}

function firstString(...values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return null;
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
