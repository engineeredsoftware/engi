type FileChanges = {
  edited?: number;
  created?: number;
  deleted?: number;
  paths?: string[];
  fileDiffs?: Array<{ path: string; added?: number; removed?: number }>;
} | null;

type SurfaceRecord = {
  pullRequest?: unknown;
  fileChanges?: FileChanges;
  proofEvidence?: string[] | null;
  reviewNotes?: string[] | null;
  summary?: string | null;
} | null;

type AssetPackCompletionRecord = {
  summary?: string | null;
  processingStats?: unknown;
  repoSnapshot?: unknown;
  shippables?: SurfaceRecord;
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
    fileChanges: resolvedFileChanges,
    summary: typeof result.summary === 'string' ? result.summary : null,
  };
}

function buildAssetPack(
  assetPackCompletion: AssetPackCompletionRecord,
  result: Record<string, unknown>,
  need: string | null,
  writtenAssetType: string | null,
): Record<string, unknown> | null {
  const direct =
    asRecord(assetPackCompletion?.assetPack) ||
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
  assetPackCompletion?: AssetPackCompletionRecord;
  fileChanges?: FileChanges;
}) {
  const resultRecord = asRecord(params.result) || {};
  const assetPackCompletion = params.assetPackCompletion || null;
  const topLevelFileChanges = params.fileChanges || null;
  const explicitWrittenAssets =
    asSurfaceRecord(assetPackCompletion?.writtenAssets) ||
    asSurfaceRecord(resultRecord.writtenAssets);
  const explicitAssetPackSynthesisArtifacts =
    asSurfaceRecord(assetPackCompletion?.assetPackSynthesisArtifacts) ||
    asSurfaceRecord(resultRecord.assetPackSynthesisArtifacts);
  const explicitDeliveryMechanism =
    asSurfaceRecord(assetPackCompletion?.deliveryMechanism) ||
    asSurfaceRecord(resultRecord.deliveryMechanism);
  const explicitShippables =
    asSurfaceRecord(assetPackCompletion?.shippables) ||
    asSurfaceRecord(resultRecord.shippables) ||
    explicitDeliveryMechanism;
  const actionsSurface = buildSurfaceFromActions(resultRecord, topLevelFileChanges);
  const semanticFileChanges =
    explicitAssetPackSynthesisArtifacts?.fileChanges ||
    explicitWrittenAssets?.fileChanges ||
    topLevelFileChanges ||
    explicitDeliveryMechanism?.fileChanges ||
    explicitShippables?.fileChanges ||
    actionsSurface?.fileChanges ||
    null;

  const writtenAssets =
    explicitWrittenAssets ||
    explicitAssetPackSynthesisArtifacts ||
    ((semanticFileChanges || typeof resultRecord.summary === 'string')
      ? {
          pullRequest: null,
          fileChanges: semanticFileChanges,
          summary: typeof resultRecord.summary === 'string' ? resultRecord.summary : null,
        }
      : null);

  const deliveryMechanism =
    explicitDeliveryMechanism ||
    explicitShippables ||
    actionsSurface ||
    writtenAssets;

  const shippables =
    explicitShippables ||
    deliveryMechanism ||
    null;

  const summary =
    (typeof assetPackCompletion?.summary === 'string' && assetPackCompletion.summary) ||
    explicitAssetPackSynthesisArtifacts?.summary ||
    writtenAssets?.summary ||
    deliveryMechanism?.summary ||
    (typeof resultRecord.summary === 'string' ? resultRecord.summary : null) ||
    (typeof resultRecord.message === 'string' ? resultRecord.message : null);

  const need =
    (typeof assetPackCompletion?.need === 'string' && assetPackCompletion.need) ||
    (typeof resultRecord.need === 'string' ? resultRecord.need : null);
  const writtenAssetType =
    (typeof assetPackCompletion?.writtenAssetType === 'string' && assetPackCompletion.writtenAssetType) ||
    (typeof resultRecord.writtenAssetType === 'string' ? resultRecord.writtenAssetType : null);
  const assetPack = buildAssetPack(assetPackCompletion, resultRecord, need, writtenAssetType);

  return {
    clientResult: {
      ...resultRecord,
      ...(summary ? { summary } : {}),
      ...(assetPackCompletion?.processingStats ? { processingStats: assetPackCompletion.processingStats } : {}),
      ...(assetPackCompletion?.repoSnapshot ? { repoSnapshot: assetPackCompletion.repoSnapshot } : {}),
      ...(explicitAssetPackSynthesisArtifacts ? { assetPackSynthesisArtifacts: explicitAssetPackSynthesisArtifacts } : {}),
      ...(writtenAssets ? { writtenAssets } : {}),
      ...(shippables ? { shippables } : {}),
      ...(deliveryMechanism ? { deliveryMechanism } : {}),
      ...(need ? { need } : {}),
      ...(writtenAssetType ? { writtenAssetType } : {}),
      ...(assetPack ? { assetPack } : {}),
      ...(explicitAssetPackSynthesisArtifacts || writtenAssets || shippables || deliveryMechanism ? { semanticKind: 'asset-pack-written-asset' } : {}),
      actions: {
        pullRequest: deliveryMechanism?.pullRequest ?? writtenAssets?.pullRequest ?? null,
        files:
          topLevelFileChanges ||
          actionsSurface?.fileChanges ||
          deliveryMechanism?.fileChanges ||
          writtenAssets?.fileChanges ||
          null,
      },
    },
    fileChanges:
      topLevelFileChanges ||
      deliveryMechanism?.fileChanges ||
      writtenAssets?.fileChanges ||
      null,
  };
}
