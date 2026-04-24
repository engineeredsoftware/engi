type FileChanges = {
  edited?: number;
  created?: number;
  deleted?: number;
  paths?: string[];
  fileDiffs?: Array<{ path: string; added?: number; removed?: number }>;
} | null;

type SurfaceRecord = {
  pullRequest?: unknown;
  pullRequestReviews?: unknown[] | null;
  comments?: unknown[] | null;
  issues?: unknown[] | null;
  fileChanges?: FileChanges;
  proofEvidence?: string[] | null;
  reviewNotes?: string[] | null;
  summary?: string | null;
} | null;

type FinalWorkSummaryRecord = {
  summary?: string | null;
  processingStats?: unknown;
  repoSnapshot?: unknown;
  deliverables?: SurfaceRecord;
  assetPackSynthesisArtifacts?: SurfaceRecord;
  writtenAssets?: SurfaceRecord;
  deliveryMechanism?: SurfaceRecord;
  need?: string | null;
  writtenAssetType?: string | null;
  assetPack?: Record<string, unknown> | null;
} | null;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asSurfaceRecord(value: unknown): SurfaceRecord {
  const record = asRecord(value);
  if (!record) return null;
  return {
    pullRequest: record.pullRequest ?? null,
    pullRequestReviews: Array.isArray(record.pullRequestReviews) ? record.pullRequestReviews : null,
    comments: Array.isArray(record.comments) ? record.comments : null,
    issues: Array.isArray(record.issues) ? record.issues : null,
    fileChanges: asRecord(record.fileChanges) ? (record.fileChanges as FileChanges) : null,
    proofEvidence: Array.isArray(record.proofEvidence)
      ? record.proofEvidence.filter((item): item is string => typeof item === 'string')
      : null,
    reviewNotes: Array.isArray(record.reviewNotes)
      ? record.reviewNotes.filter((item): item is string => typeof item === 'string')
      : null,
    summary: typeof record.summary === 'string' ? record.summary : null,
  };
}

function buildSurfaceFromActions(result: Record<string, unknown>, fileChanges: FileChanges): SurfaceRecord {
  const actions = asRecord(result.actions);
  const actionFiles = asRecord(actions?.files) ? (actions?.files as FileChanges) : null;
  const resolvedFileChanges = fileChanges || actionFiles || null;
  if (!actions && !resolvedFileChanges && typeof result.summary !== 'string') {
    return null;
  }

  return {
    pullRequest: actions?.pullRequest ?? null,
    pullRequestReviews: Array.isArray(actions?.pullRequestReviews) ? (actions?.pullRequestReviews as unknown[]) : null,
    comments: Array.isArray(actions?.comments) ? (actions?.comments as unknown[]) : null,
    issues: Array.isArray(actions?.issues) ? (actions?.issues as unknown[]) : null,
    fileChanges: resolvedFileChanges,
    summary: typeof result.summary === 'string' ? result.summary : null,
  };
}

function buildAssetPack(
  finalWorkSummary: FinalWorkSummaryRecord,
  result: Record<string, unknown>,
  need: string | null,
  writtenAssetType: string | null,
): Record<string, unknown> | null {
  const direct =
    asRecord(finalWorkSummary?.assetPack) ||
    asRecord(result.assetPack);
  if (direct) return direct;

  if (!need && !writtenAssetType) return null;

  return {
    ...(need ? { need } : {}),
    ...(writtenAssetType ? { writtenAssetType } : {}),
  };
}

export function buildSemanticCompletionResult(params: {
  result: unknown;
  finalWorkSummary?: FinalWorkSummaryRecord;
  fileChanges?: FileChanges;
}) {
  const resultRecord = asRecord(params.result) || {};
  const finalWorkSummary = params.finalWorkSummary || null;
  const topLevelFileChanges = params.fileChanges || null;
  const explicitWrittenAssets =
    asSurfaceRecord(finalWorkSummary?.writtenAssets) ||
    asSurfaceRecord(resultRecord.writtenAssets);
  const explicitAssetPackSynthesisArtifacts =
    asSurfaceRecord(finalWorkSummary?.assetPackSynthesisArtifacts) ||
    asSurfaceRecord(resultRecord.assetPackSynthesisArtifacts);
  const explicitDeliveryMechanism =
    asSurfaceRecord(finalWorkSummary?.deliveryMechanism) ||
    asSurfaceRecord(resultRecord.deliveryMechanism);
  const explicitCompatibilityDeliverables =
    asSurfaceRecord(resultRecord.deliverables) ||
    asSurfaceRecord(finalWorkSummary?.deliverables);
  const actionsSurface = buildSurfaceFromActions(resultRecord, topLevelFileChanges);
  const semanticFileChanges =
    explicitAssetPackSynthesisArtifacts?.fileChanges ||
    explicitWrittenAssets?.fileChanges ||
    topLevelFileChanges ||
    explicitDeliveryMechanism?.fileChanges ||
    explicitCompatibilityDeliverables?.fileChanges ||
    actionsSurface?.fileChanges ||
    null;

  const writtenAssets =
    explicitWrittenAssets ||
    explicitAssetPackSynthesisArtifacts ||
    explicitCompatibilityDeliverables ||
    ((semanticFileChanges || typeof resultRecord.summary === 'string')
      ? {
          pullRequest: null,
          pullRequestReviews: null,
          comments: null,
          issues: null,
          fileChanges: semanticFileChanges,
          summary: typeof resultRecord.summary === 'string' ? resultRecord.summary : null,
        }
      : null);

  const deliveryMechanism =
    explicitDeliveryMechanism ||
    explicitCompatibilityDeliverables ||
    actionsSurface ||
    writtenAssets;

  const compatibilityFileChanges =
    explicitCompatibilityDeliverables?.fileChanges ||
    topLevelFileChanges ||
    actionsSurface?.fileChanges ||
    explicitDeliveryMechanism?.fileChanges ||
    writtenAssets?.fileChanges ||
    null;

  const compatibilityDeliverables =
    explicitCompatibilityDeliverables ||
    (deliveryMechanism || writtenAssets
      ? {
          pullRequest: deliveryMechanism?.pullRequest ?? writtenAssets?.pullRequest ?? null,
          pullRequestReviews:
            deliveryMechanism?.pullRequestReviews ?? writtenAssets?.pullRequestReviews ?? null,
          comments: deliveryMechanism?.comments ?? writtenAssets?.comments ?? null,
          issues: deliveryMechanism?.issues ?? writtenAssets?.issues ?? null,
          fileChanges: compatibilityFileChanges,
          summary: writtenAssets?.summary ?? deliveryMechanism?.summary ?? null,
        }
      : null);

  const summary =
    (typeof finalWorkSummary?.summary === 'string' && finalWorkSummary.summary) ||
    explicitAssetPackSynthesisArtifacts?.summary ||
    writtenAssets?.summary ||
    deliveryMechanism?.summary ||
    (typeof resultRecord.summary === 'string' ? resultRecord.summary : null) ||
    (typeof resultRecord.message === 'string' ? resultRecord.message : null);

  const need =
    (typeof finalWorkSummary?.need === 'string' && finalWorkSummary.need) ||
    (typeof resultRecord.need === 'string' ? resultRecord.need : null);
  const writtenAssetType =
    (typeof finalWorkSummary?.writtenAssetType === 'string' && finalWorkSummary.writtenAssetType) ||
    (typeof resultRecord.writtenAssetType === 'string' ? resultRecord.writtenAssetType : null);
  const assetPack = buildAssetPack(finalWorkSummary, resultRecord, need, writtenAssetType);

  return {
    clientResult: {
      ...resultRecord,
      ...(summary ? { summary } : {}),
      ...(finalWorkSummary?.processingStats ? { processingStats: finalWorkSummary.processingStats } : {}),
      ...(finalWorkSummary?.repoSnapshot ? { repoSnapshot: finalWorkSummary.repoSnapshot } : {}),
      ...(explicitAssetPackSynthesisArtifacts ? { assetPackSynthesisArtifacts: explicitAssetPackSynthesisArtifacts } : {}),
      ...(writtenAssets ? { writtenAssets } : {}),
      ...(deliveryMechanism ? { deliveryMechanism } : {}),
      ...(compatibilityDeliverables ? { deliverables: compatibilityDeliverables } : {}),
      ...(need ? { need } : {}),
      ...(writtenAssetType ? { writtenAssetType } : {}),
      ...(assetPack ? { assetPack } : {}),
      ...(explicitAssetPackSynthesisArtifacts || writtenAssets || deliveryMechanism ? { semanticKind: 'asset-pack-written-asset' } : {}),
      actions: {
        pullRequest: compatibilityDeliverables?.pullRequest ?? null,
        pullRequestReviews: compatibilityDeliverables?.pullRequestReviews ?? null,
        comments: compatibilityDeliverables?.comments ?? null,
        issues: compatibilityDeliverables?.issues ?? null,
        files:
          topLevelFileChanges ||
          actionsSurface?.fileChanges ||
          compatibilityDeliverables?.fileChanges ||
          writtenAssets?.fileChanges ||
          null,
      },
    },
    fileChanges:
      topLevelFileChanges ||
      compatibilityDeliverables?.fileChanges ||
      writtenAssets?.fileChanges ||
      null,
  };
}
