import { createHash } from 'node:crypto';
import {
  ASSET_PACK_VECTOR_STORAGE_TABLE,
  buildAssetPackEmbeddingPolicy,
  normalizeAssetPackEmbeddingVector,
} from './embedding-config';
import type { DepositoryAsset, DepositoryContentUnit } from './depository-search';

export type DepositorySupplyLifecycleState =
  | 'indexed-searchable'
  | 'indexed-repair-required'
  | 'blocked-readiness';

export type DepositorySupplyCompensationState =
  | 'eligible-if-selected-for-assetpack'
  | 'repair-required-before-compensation'
  | 'blocked-before-compensation';

export type DepositorySupplySearchDocumentKind =
  | 'lexical'
  | 'metadata'
  | 'measurement'
  | 'vector';

export interface DepositorySupplyIndexInput {
  deposits?: unknown[];
  depositoryAssets?: unknown[];
  sourceRevision?: unknown;
  createdAt?: string;
}

export interface DepositorySupplyRecord {
  schema: 'bitcode.depository.supply-record';
  supplyId: string;
  depositId: string;
  assetId: string;
  title: string;
  summary: string;
  artifactKind: string;
  artifactType: string | null;
  sourceBinding: {
    repositoryFullName: string | null;
    sourceBranch: string | null;
    sourceCommit: string | null;
    contentRoot: string | null;
    sourcePathCount: number;
    sourcePathRoots: string[];
    rawSourceStoredExternally: true;
    protectedSourceVisibleInIndex: false;
  };
  lifecycle: {
    state: DepositorySupplyLifecycleState;
    sourceReceived: boolean;
    measurementReady: boolean;
    proofReady: boolean;
    lexicalIndexed: boolean;
    metadataIndexed: boolean;
    vectorProjectionReady: boolean;
    searchable: boolean;
    repairRequired: boolean;
    blockers: string[];
    warnings: string[];
  };
  rightsBoundary: {
    depositorWalletId: string | null;
    btdRange: string | null;
    readerVisibilityBeforeSettlement: 'source-safe-metadata-only';
    protectedSourceBeforeSettlementVisible: false;
    settlementRequiredForSourceBearingAssetPack: true;
    btdOwnershipBoundary: 'depositor-retains-btd-until-settlement-transfer';
  };
  compensationPreview: DepositorySupplyCompensationPreview;
  proofEvidence: {
    hasWalletOrAttestationProof: boolean;
    proofRoot: string | null;
    attestationCount: number;
  };
  measurementEvidence: {
    hasAssetMeasurementEvidence: boolean;
    measurementRoot: string | null;
    measurementProvenanceCount: number;
  };
  readbackEvidence: {
    reconciliationReadbackRoot: string | null;
  };
  searchDocuments: DepositorySupplySearchDocument[];
  vectorProjection: DepositorySupplyVectorProjection;
  storageProjection: DepositorySupplyStorageProjection;
  repairActions: string[];
  sourceSafety: DepositorySupplySourceSafety;
  roots: {
    supplyRoot: string;
    searchDocumentRoot: string;
    vectorProjectionRoot: string;
    storageProjectionRoot: string;
    rightsBoundaryRoot: string;
    compensationPreviewRoot: string;
  };
}

export interface DepositorySupplyCompensationPreview {
  schema: 'bitcode.depository.supply-compensation-preview';
  state: DepositorySupplyCompensationState;
  assetId: string;
  depositId: string;
  depositorWalletId: string | null;
  candidateBtdRange: string | null;
  compensationRoute: {
    payer: 'future-reader-after-settlement';
    payee: 'depositing-wallet';
    priceAsset: 'BTC';
    allocationMethod: 'source-to-shares-largest-remainder';
    sourceToSharesProofState: 'not-created-until-accepted-need-fit-and-settlement';
    btdMintBoundary: 'not-minted-by-deposit-admission';
    btdRightsTransferBoundary: 'reader-receives-rights-only-after-btc-settlement';
  };
  readiness: {
    sourceBound: boolean;
    proofReady: boolean;
    measurementReady: boolean;
    searchable: boolean;
    depositorWalletReady: boolean;
    eligibleForFindingFits: boolean;
    eligibleForCompensationIfSelected: boolean;
    blockers: string[];
    warnings: string[];
  };
  visibility: {
    beforeSettlement: 'source-safe-compensation-route-metadata';
    protectedSourceVisible: false;
    unpaidAssetPackSourceVisible: false;
    walletPrivateMaterialVisible: false;
    settlementPrivatePayloadVisible: false;
  };
  readback: {
    ledgerAccountKeys: string[];
    databaseProjectionTables: string[];
    objectStorageVisibility: 'source-safe-metadata-only-before-settlement';
  };
  roots: {
    compensationRouteRoot: string;
    sourceToSharesPreviewRoot: string;
    readbackRoot: string;
    compensationPreviewRoot: string;
  };
}

export interface DepositorySupplySearchDocument {
  schema: 'bitcode.depository.supply-search-document';
  documentId: string;
  kind: DepositorySupplySearchDocumentKind;
  sourceSafeText: string;
  sourceSafeTextRoot: string;
  tokenCount: number;
  sourcePathRoots: string[];
  symbolRoots: string[];
  constraintRoots: string[];
  protectedSourceVisible: false;
}

export interface DepositorySupplyVectorProjection {
  schema: 'bitcode.depository.supply-vector-projection';
  provider: 'openai';
  model: string;
  dimensions: number;
  distanceMetric: 'cosine';
  vectorStore: ReturnType<typeof buildAssetPackEmbeddingPolicy>['vectorStore'];
  rows: Array<{
    vectorRowId: string;
    assetId: string;
    searchDocumentId: string;
    embeddingInputRoot: string;
    embeddingDimensions: number;
    embeddingPresent: boolean;
    embeddingState: 'ready' | 'pending-embedding' | 'invalid-dimensions';
    protectedSourceVisible: false;
  }>;
}

export interface DepositorySupplyStorageProjection {
  schema: 'bitcode.depository.supply-storage-projection';
  assetPackEvidenceTable: 'deliverables';
  vectorTable: typeof ASSET_PACK_VECTOR_STORAGE_TABLE;
  vectorMatchRpc: 'match_deliverable_vectors';
  sourceSafeColumns: string[];
  privateColumnsExcluded: string[];
  readbackChecks: string[];
}

export interface DepositorySupplySourceSafety {
  sourceSafeMetadataOnly: true;
  protectedSourceVisible: false;
  rawSourceTextVisible: false;
  credentialsSerialized: false;
  walletPrivateMaterialVisible: false;
  unpaidAssetPackSourceVisible: false;
}

export interface DepositorySupplyIndex {
  schema: 'bitcode.depository.supply-index';
  indexId: string;
  createdAt: string;
  records: DepositorySupplyRecord[];
  recordCount: number;
  searchableRecordCount: number;
  repairRequiredRecordCount: number;
  blockedRecordCount: number;
  embeddingPolicy: ReturnType<typeof buildAssetPackEmbeddingPolicy>;
  storageProjection: DepositorySupplyStorageProjection;
  sourceSafety: DepositorySupplySourceSafety;
  roots: {
    indexRoot: string;
    recordRoots: string[];
    storageProjectionRoot: string;
  };
}

const SOURCE_SAFE_METADATA_ONLY: DepositorySupplySourceSafety = {
  sourceSafeMetadataOnly: true,
  protectedSourceVisible: false,
  rawSourceTextVisible: false,
  credentialsSerialized: false,
  walletPrivateMaterialVisible: false,
  unpaidAssetPackSourceVisible: false,
};

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

function root(prefix: string, value: unknown): string {
  return `${prefix}:${sha256(stableStringify(value))}`;
}

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((entry) => stableStringify(entry)).join(',')}]`;
  return `{${Object.keys(value as Record<string, unknown>)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify((value as Record<string, unknown>)[key])}`)
    .join(',')}}`;
}

function recordValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function firstString(...values: unknown[]): string | null {
  for (const value of values) {
    const candidate = stringValue(value);
    if (candidate) return candidate;
  }
  return null;
}

function stringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => stringValue(entry))
    .filter(Boolean);
}

function getPath(value: unknown, path: string[]): unknown {
  let cursor: unknown = value;
  for (const part of path) {
    if (!cursor || typeof cursor !== 'object' || Array.isArray(cursor)) return undefined;
    cursor = (cursor as Record<string, unknown>)[part];
  }
  return cursor;
}

function normalizeArtifactKind(value: unknown): string {
  return (stringValue(value) || 'asset-pack-evidence')
    .toLowerCase()
    .replace(/[_\s]+/g, '-');
}

function tokensFrom(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/[^a-z0-9]+/g)
    .map((token) => token.trim())
    .filter((token) => token.length > 2);
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort();
}

function rootsFor(values: string[], prefix: string): string[] {
  return uniqueSorted(values).map((value) => root(prefix, value));
}

function sanitizeSourceSafeText(parts: unknown[]): string {
  return uniqueSorted(
    parts
      .flatMap((part) => {
        if (Array.isArray(part)) return part;
        return [part];
      })
      .map((part) => stringValue(part))
      .filter(Boolean)
  ).join(' ');
}

function contentUnitFacts(units: unknown[]): {
  sourcePaths: string[];
  symbols: string[];
  stackTags: string[];
  constraints: string[];
} {
  const sourcePaths: string[] = [];
  const symbols: string[] = [];
  const stackTags: string[] = [];
  const constraints: string[] = [];

  for (const unit of units) {
    const record = recordValue(unit);
    const facts = recordValue(record?.codeAnalysisFacts);
    const path = firstString(record?.path, record?.sourcePath);
    if (path) sourcePaths.push(path);
    sourcePaths.push(...stringArray(facts?.paths));
    symbols.push(...stringArray(facts?.symbols));
    stackTags.push(...stringArray(facts?.stackTags));
    constraints.push(...stringArray(facts?.constraints));
  }

  return {
    sourcePaths: uniqueSorted(sourcePaths),
    symbols: uniqueSorted(symbols),
    stackTags: uniqueSorted(stackTags),
    constraints: uniqueSorted(constraints),
  };
}

function extractDeposits(input: DepositorySupplyIndexInput): unknown[] {
  const deposits = [
    ...(Array.isArray(input.deposits) ? input.deposits : []),
    ...(Array.isArray(input.depositoryAssets) ? input.depositoryAssets : []),
  ];

  if (deposits.length) return deposits;
  const sourceRevision = recordValue(input.sourceRevision);
  return sourceRevision ? [{ sourceRevision, assetId: 'deposit-reference' }] : [];
}

function resolveSourceRevision(record: Record<string, unknown>, fallback: unknown): Record<string, unknown> {
  return (
    recordValue(record.sourceRevision) ||
    recordValue(record.repoSnapshot) ||
    recordValue(record.repo_snapshot) ||
    recordValue(fallback) ||
    {}
  );
}

function buildSearchDocument(input: {
  assetId: string;
  kind: DepositorySupplySearchDocumentKind;
  sourceSafeText: string;
  sourcePaths: string[];
  symbols: string[];
  constraints: string[];
}): DepositorySupplySearchDocument {
  const documentId = `${input.assetId}:${input.kind}`;
  return {
    schema: 'bitcode.depository.supply-search-document',
    documentId,
    kind: input.kind,
    sourceSafeText: input.sourceSafeText,
    sourceSafeTextRoot: root('sha256', input.sourceSafeText),
    tokenCount: tokensFrom(input.sourceSafeText).length,
    sourcePathRoots: rootsFor(input.sourcePaths, 'path-root'),
    symbolRoots: rootsFor(input.symbols, 'symbol-root'),
    constraintRoots: rootsFor(input.constraints, 'constraint-root'),
    protectedSourceVisible: false,
  };
}

function buildStorageProjection(): DepositorySupplyStorageProjection {
  return {
    schema: 'bitcode.depository.supply-storage-projection',
    assetPackEvidenceTable: 'deliverables',
    vectorTable: ASSET_PACK_VECTOR_STORAGE_TABLE,
    vectorMatchRpc: 'match_deliverable_vectors',
    sourceSafeColumns: [
      'deliverables.id',
      'deliverables.title',
      'deliverables.output',
      'deliverables.config',
      'deliverable_vectors.deliverable_id',
      'deliverable_vectors.embedding',
    ],
    privateColumnsExcluded: [
      'raw-source-text',
      'provider-token',
      'wallet-private-material',
      'unpaid-assetpack-source',
      'settlement-private-payload',
    ],
    readbackChecks: [
      'deliverables row exists for every searchable supply record',
      'deliverable_vectors rows bind to the active embedding policy',
      'match_deliverable_vectors returns only source-safe metadata before settlement',
    ],
  };
}

function buildVectorProjection(input: {
  assetId: string;
  searchDocuments: DepositorySupplySearchDocument[];
  embeddings: Record<string, unknown>;
}): DepositorySupplyVectorProjection {
  const embeddingPolicy = buildAssetPackEmbeddingPolicy();
  return {
    schema: 'bitcode.depository.supply-vector-projection',
    provider: embeddingPolicy.provider,
    model: embeddingPolicy.model,
    dimensions: embeddingPolicy.dimensions,
    distanceMetric: embeddingPolicy.vectorStore.distanceMetric,
    vectorStore: embeddingPolicy.vectorStore,
    rows: input.searchDocuments.map((document) => {
      const embedding = input.embeddings[document.documentId] ?? input.embeddings[document.kind];
      const normalized = normalizeAssetPackEmbeddingVector(embedding, {
        provider: embeddingPolicy.provider,
        model: embeddingPolicy.model,
        dimensions: embeddingPolicy.dimensions,
        encodingFormat: embeddingPolicy.encodingFormat,
        inputTokenLimit: embeddingPolicy.inputTokenLimit,
        vectorStore: embeddingPolicy.vectorStore,
      });
      const embeddingPresent = Array.isArray(embedding);
      return {
        vectorRowId: `${input.assetId}:${document.kind}:vector`,
        assetId: input.assetId,
        searchDocumentId: document.documentId,
        embeddingInputRoot: document.sourceSafeTextRoot,
        embeddingDimensions: embeddingPolicy.dimensions,
        embeddingPresent: Boolean(normalized),
        embeddingState: normalized
          ? 'ready'
          : embeddingPresent
            ? 'invalid-dimensions'
            : 'pending-embedding',
        protectedSourceVisible: false,
      };
    }),
  };
}

function buildCompensationPreview(input: {
  assetId: string;
  depositId: string;
  depositorWalletId: string | null;
  btdRange: string | null;
  sourceBound: boolean;
  proofReady: boolean;
  measurementReady: boolean;
  searchable: boolean;
  blockers: string[];
  warnings: string[];
}): DepositorySupplyCompensationPreview {
  const compensationBlockers = [
    ...input.blockers,
    ...(!input.depositorWalletId ? ['depositor_wallet_missing'] : []),
    ...(!input.proofReady ? ['wallet_or_attestation_proof_missing'] : []),
    ...(!input.measurementReady ? ['asset_measurement_evidence_missing'] : []),
    ...(!input.searchable ? ['depository_searchability_missing'] : []),
  ];
  const eligibleForCompensationIfSelected = compensationBlockers.length === 0;
  const state: DepositorySupplyCompensationState = eligibleForCompensationIfSelected
    ? 'eligible-if-selected-for-assetpack'
    : input.blockers.length
      ? 'blocked-before-compensation'
      : 'repair-required-before-compensation';
  const compensationRoute = {
    payer: 'future-reader-after-settlement' as const,
    payee: 'depositing-wallet' as const,
    priceAsset: 'BTC' as const,
    allocationMethod: 'source-to-shares-largest-remainder' as const,
    sourceToSharesProofState: 'not-created-until-accepted-need-fit-and-settlement' as const,
    btdMintBoundary: 'not-minted-by-deposit-admission' as const,
    btdRightsTransferBoundary: 'reader-receives-rights-only-after-btc-settlement' as const,
  };
  const readback = {
    ledgerAccountKeys: [
      `supplier:${input.assetId}:pending_claims`,
      ...(input.depositorWalletId
        ? [
            `depositor:${input.depositorWalletId}:deposited_assets`,
            `depositor:${input.depositorWalletId}:eligible_compensation_routes`,
          ]
        : []),
    ],
    databaseProjectionTables: [
      'deliverables',
      'deliverable_vectors',
      'ledger_entries',
      'source_to_shares_allocations',
    ],
    objectStorageVisibility: 'source-safe-metadata-only-before-settlement' as const,
  };
  const compensationRouteRoot = root('sha256', compensationRoute);
  const sourceToSharesPreviewRoot = root('sha256', {
    assetId: input.assetId,
    depositId: input.depositId,
    depositorWalletId: input.depositorWalletId,
    candidateBtdRange: input.btdRange,
    allocationMethod: compensationRoute.allocationMethod,
    sourceToSharesProofState: compensationRoute.sourceToSharesProofState,
  });
  const readbackRoot = root('sha256', readback);
  const readiness = {
    sourceBound: input.sourceBound,
    proofReady: input.proofReady,
    measurementReady: input.measurementReady,
    searchable: input.searchable,
    depositorWalletReady: Boolean(input.depositorWalletId),
    eligibleForFindingFits: input.searchable,
    eligibleForCompensationIfSelected,
    blockers: uniqueSorted(compensationBlockers),
    warnings: uniqueSorted(input.warnings),
  };
  const visibility = {
    beforeSettlement: 'source-safe-compensation-route-metadata' as const,
    protectedSourceVisible: false as const,
    unpaidAssetPackSourceVisible: false as const,
    walletPrivateMaterialVisible: false as const,
    settlementPrivatePayloadVisible: false as const,
  };
  const compensationPreviewRoot = root('sha256', {
    assetId: input.assetId,
    depositId: input.depositId,
    state,
    readiness,
    compensationRouteRoot,
    sourceToSharesPreviewRoot,
    readbackRoot,
    visibility,
  });

  return {
    schema: 'bitcode.depository.supply-compensation-preview',
    state,
    assetId: input.assetId,
    depositId: input.depositId,
    depositorWalletId: input.depositorWalletId,
    candidateBtdRange: input.btdRange,
    compensationRoute,
    readiness,
    visibility,
    readback,
    roots: {
      compensationRouteRoot,
      sourceToSharesPreviewRoot,
      readbackRoot,
      compensationPreviewRoot,
    },
  };
}

function recordEmbeddingInputs(record: Record<string, unknown>): Record<string, unknown> {
  return (
    recordValue(record.embeddings) ||
    recordValue(record.embeddingVectors) ||
    recordValue(record.vectorEmbeddings) ||
    {}
  );
}

function buildSupplyRecord(input: {
  raw: unknown;
  fallbackSourceRevision: unknown;
}): DepositorySupplyRecord | null {
  const record = recordValue(input.raw);
  if (!record) return null;
  const metadata = recordValue(record.metadata) || {};
  const sourceRevision = resolveSourceRevision(record, input.fallbackSourceRevision);
  const depositId = firstString(record.depositId, record.id, record.deposit_id, record.assetId) || null;
  const assetId = firstString(record.assetId, record.depositAssetId, record.id, record.deposit_asset_id);
  if (!depositId || !assetId) return null;

  const contentUnits = Array.isArray(record.contentUnits) ? record.contentUnits : [];
  const facts = contentUnitFacts(contentUnits);
  const sourcePaths = uniqueSorted([
    ...facts.sourcePaths,
    ...stringArray(metadata.sourcePaths),
    ...stringArray(record.sourcePaths),
  ]);
  const symbols = uniqueSorted([
    ...facts.symbols,
    ...stringArray(metadata.symbols),
    ...stringArray(record.symbols),
  ]);
  const stackTags = uniqueSorted([
    ...facts.stackTags,
    ...stringArray(metadata.declaredStacks),
    ...stringArray(metadata.stackTags),
    ...stringArray(record.stackTags),
  ]);
  const constraints = uniqueSorted([
    ...facts.constraints,
    ...stringArray(metadata.declaredConstraints),
    ...stringArray(record.constraints),
  ]);
  const title = firstString(record.title, metadata.title, record.summary, metadata.summary) || assetId;
  const summary = firstString(record.summary, metadata.summary, record.description) || title;
  const repositoryFullName =
    firstString(
      record.repositoryFullName,
      record.repository_full_name,
      sourceRevision.repositoryFullName,
      sourceRevision.repo,
      metadata.sourceRepo,
      getPath(record, ['githubBoundary', 'sourceRepo']),
      getPath(record, ['addressingSurface', 'repo'])
    ) ||
    (sourceRevision.org && sourceRevision.repo ? `${sourceRevision.org}/${sourceRevision.repo}` : null);
  const sourceBranch = firstString(record.sourceBranch, record.source_branch, sourceRevision.branch);
  const sourceCommit = firstString(record.sourceCommit, record.source_commit, sourceRevision.commit);
  const contentRoot = firstString(record.contentRoot, record.content_root);
  const artifactKind = normalizeArtifactKind(firstString(record.artifactKind, record.kind, metadata.artifactKind));
  const artifactType = firstString(record.artifactType, metadata.artifactType);
  const proofRoot = firstString(
    record.proofRoot,
    getPath(record, ['verificationEvidence', 'proofRoot']),
    getPath(record, ['assetMeasurement', 'proofRoot'])
  );
  const measurementRoot = firstString(
    record.measurementRoot,
    getPath(record, ['verificationEvidence', 'measurementRoot']),
    getPath(record, ['assetMeasurement', 'measurementRoot'])
  );
  const reconciliationReadbackRoot = firstString(
    record.reconciliationReadbackRoot,
    getPath(record, ['verificationEvidence', 'reconciliationReadbackRoot']),
    getPath(record, ['verificationEvidence', 'ledgerReadbackRoot'])
  );
  const hasWalletOrAttestationProof = Boolean(
    record.hasWalletOrAttestationProof ||
      proofRoot ||
      recordValue(record.signingSurface) ||
      recordValue(record.identitySurface) ||
      recordValue(record.githubBoundary) ||
      (Array.isArray(record.attestations) && record.attestations.length)
  );
  const hasAssetMeasurementEvidence = Boolean(
    record.hasAssetMeasurementEvidence ||
      measurementRoot ||
      record.assetMeasurement ||
      (Array.isArray(record.measurementProvenance) && record.measurementProvenance.length)
  );
  const baseText = sanitizeSourceSafeText([
    title,
    summary,
    artifactKind,
    artifactType,
    repositoryFullName,
    sourceBranch,
    sourceCommit,
    sourcePaths,
    symbols,
    stackTags,
    constraints,
    stringArray(metadata.tags),
  ]);
  const measurementText = sanitizeSourceSafeText([
    title,
    artifactKind,
    proofRoot ? 'proof-root-present' : 'proof-root-missing',
    measurementRoot ? 'measurement-root-present' : 'measurement-root-missing',
    reconciliationReadbackRoot ? 'reconciliation-readback-present' : 'reconciliation-readback-missing',
  ]);
  const searchDocuments = [
    buildSearchDocument({
      assetId,
      kind: 'lexical',
      sourceSafeText: baseText,
      sourcePaths,
      symbols,
      constraints,
    }),
    buildSearchDocument({
      assetId,
      kind: 'metadata',
      sourceSafeText: sanitizeSourceSafeText([artifactKind, artifactType, repositoryFullName, sourcePaths, stackTags]),
      sourcePaths,
      symbols,
      constraints,
    }),
    buildSearchDocument({
      assetId,
      kind: 'measurement',
      sourceSafeText: measurementText,
      sourcePaths,
      symbols,
      constraints,
    }),
    buildSearchDocument({
      assetId,
      kind: 'vector',
      sourceSafeText: sanitizeSourceSafeText([baseText, measurementText]),
      sourcePaths,
      symbols,
      constraints,
    }),
  ];
  const vectorProjection = buildVectorProjection({
    assetId,
    searchDocuments,
    embeddings: recordEmbeddingInputs(record),
  });
  const storageProjection = buildStorageProjection();
  const depositorWalletId = firstString(record.depositorWalletId, metadata.depositorWalletId, getPath(record, ['depositorBoundary', 'walletId']));
  const btdRange = firstString(record.btdRange, metadata.btdRange, getPath(record, ['btd', 'range']));
  const blockers = [
    ...(!repositoryFullName ? ['repository_binding_missing'] : []),
    ...(!sourceBranch && !sourceCommit ? ['source_revision_binding_missing'] : []),
  ];
  const warnings = [
    ...(!hasWalletOrAttestationProof ? ['wallet_or_attestation_proof_missing'] : []),
    ...(!hasAssetMeasurementEvidence ? ['asset_measurement_evidence_missing'] : []),
    ...(!depositorWalletId ? ['depositor_wallet_missing'] : []),
    ...(vectorProjection.rows.some((row) => row.embeddingState === 'pending-embedding')
      ? ['embedding_rows_pending']
      : []),
    ...(vectorProjection.rows.some((row) => row.embeddingState === 'invalid-dimensions')
      ? ['embedding_row_invalid_dimensions']
      : []),
  ];
  const lexicalIndexed = searchDocuments.some((document) => document.kind === 'lexical' && document.tokenCount > 0);
  const metadataIndexed = searchDocuments.some((document) => document.kind === 'metadata' && document.tokenCount > 0);
  const vectorProjectionReady = vectorProjection.rows.every((row) => row.embeddingState === 'ready');
  const measurementReady = hasAssetMeasurementEvidence;
  const proofReady = hasWalletOrAttestationProof;
  const searchable = !blockers.length && lexicalIndexed && metadataIndexed && measurementReady;
  const repairRequired = Boolean(blockers.length || warnings.length);
  const state: DepositorySupplyLifecycleState = blockers.length
    ? 'blocked-readiness'
    : repairRequired
      ? 'indexed-repair-required'
      : 'indexed-searchable';
  const repairActions = uniqueSorted([
    ...(!repositoryFullName ? ['bind-repository-full-name'] : []),
    ...(!sourceBranch && !sourceCommit ? ['bind-source-branch-or-commit'] : []),
    ...(!hasWalletOrAttestationProof ? ['collect-wallet-or-attestation-proof'] : []),
    ...(!hasAssetMeasurementEvidence ? ['compute-asset-measurement'] : []),
    ...(!depositorWalletId ? ['bind-depositor-wallet-for-compensation'] : []),
    ...(!vectorProjectionReady ? ['sync-active-embedding-vector-rows'] : []),
  ]);
  const rightsBoundary = {
    depositorWalletId,
    btdRange,
    readerVisibilityBeforeSettlement: 'source-safe-metadata-only' as const,
    protectedSourceBeforeSettlementVisible: false as const,
    settlementRequiredForSourceBearingAssetPack: true as const,
    btdOwnershipBoundary: 'depositor-retains-btd-until-settlement-transfer' as const,
  };
  const sourceBinding = {
    repositoryFullName,
    sourceBranch,
    sourceCommit,
    contentRoot,
    sourcePathCount: sourcePaths.length,
    sourcePathRoots: rootsFor(sourcePaths, 'path-root'),
    rawSourceStoredExternally: true as const,
    protectedSourceVisibleInIndex: false as const,
  };
  const proofEvidence = {
    hasWalletOrAttestationProof,
    proofRoot,
    attestationCount: Array.isArray(record.attestations) ? record.attestations.length : 0,
  };
  const measurementEvidence = {
    hasAssetMeasurementEvidence,
    measurementRoot,
    measurementProvenanceCount: Array.isArray(record.measurementProvenance)
      ? record.measurementProvenance.length
      : 0,
  };
  const readbackEvidence = { reconciliationReadbackRoot };
  const searchDocumentRoot = root('sha256', searchDocuments.map((document) => ({
    documentId: document.documentId,
    kind: document.kind,
    sourceSafeTextRoot: document.sourceSafeTextRoot,
  })));
  const vectorProjectionRoot = root('sha256', vectorProjection);
  const storageProjectionRoot = root('sha256', storageProjection);
  const rightsBoundaryRoot = root('sha256', rightsBoundary);
  const compensationPreview = buildCompensationPreview({
    assetId,
    depositId,
    depositorWalletId,
    btdRange,
    sourceBound: Boolean(repositoryFullName && (sourceBranch || sourceCommit)),
    proofReady,
    measurementReady,
    searchable,
    blockers,
    warnings,
  });
  const supplyRoot = root('sha256', {
    assetId,
    depositId,
    sourceBinding,
    lifecycle: { state, searchable, blockers, warnings },
    rightsBoundaryRoot,
    compensationPreviewRoot: compensationPreview.roots.compensationPreviewRoot,
    searchDocumentRoot,
    vectorProjectionRoot,
    storageProjectionRoot,
  });

  return {
    schema: 'bitcode.depository.supply-record',
    supplyId: `supply:${sha256(`${depositId}:${assetId}`).slice(0, 24)}`,
    depositId,
    assetId,
    title,
    summary,
    artifactKind,
    artifactType,
    sourceBinding,
    lifecycle: {
      state,
      sourceReceived: Boolean(repositoryFullName || contentRoot || sourcePaths.length),
      measurementReady,
      proofReady,
      lexicalIndexed,
      metadataIndexed,
      vectorProjectionReady,
      searchable,
      repairRequired,
      blockers,
      warnings,
    },
    rightsBoundary,
    compensationPreview,
    proofEvidence,
    measurementEvidence,
    readbackEvidence,
    searchDocuments,
    vectorProjection,
    storageProjection,
    repairActions,
    sourceSafety: { ...SOURCE_SAFE_METADATA_ONLY },
    roots: {
      supplyRoot,
      searchDocumentRoot,
      vectorProjectionRoot,
      storageProjectionRoot,
      rightsBoundaryRoot,
      compensationPreviewRoot: compensationPreview.roots.compensationPreviewRoot,
    },
  };
}

export function buildDepositorySupplyIndex(input: DepositorySupplyIndexInput): DepositorySupplyIndex {
  const records = extractDeposits(input)
    .map((deposit) => buildSupplyRecord({ raw: deposit, fallbackSourceRevision: input.sourceRevision }))
    .filter((record): record is DepositorySupplyRecord => Boolean(record));
  const storageProjection = buildStorageProjection();
  const recordRoots = records.map((record) => record.roots.supplyRoot).sort();
  const indexRoot = root('sha256', {
    recordRoots,
    storageProjection,
    embeddingPolicy: buildAssetPackEmbeddingPolicy(),
  });

  return {
    schema: 'bitcode.depository.supply-index',
    indexId: `depository-supply-index:${sha256(recordRoots.join(':')).slice(0, 24)}`,
    createdAt: input.createdAt || new Date().toISOString(),
    records,
    recordCount: records.length,
    searchableRecordCount: records.filter((record) => record.lifecycle.searchable).length,
    repairRequiredRecordCount: records.filter((record) => record.lifecycle.repairRequired).length,
    blockedRecordCount: records.filter((record) => record.lifecycle.state === 'blocked-readiness').length,
    embeddingPolicy: buildAssetPackEmbeddingPolicy(),
    storageProjection,
    sourceSafety: { ...SOURCE_SAFE_METADATA_ONLY },
    roots: {
      indexRoot,
      recordRoots,
      storageProjectionRoot: root('sha256', storageProjection),
    },
  };
}

export function assertDepositorySupplyIndexSourceSafe(index: DepositorySupplyIndex): void {
  const serialized = stableStringify(index).toLowerCase();
  const forbidden = [
    `${['sk', 'proj'].join('-')}-`,
    `${['sb', 'secret'].join('_')}__`,
    ['service', 'role'].join('_'),
    ['wallet', 'private', 'key'].join('_'),
    ['raw', 'source', 'text'].join('_'),
    ['unpaid', 'assetpack', 'source'].join('_'),
    ['settlement', 'private', 'payload'].join('_'),
  ];
  for (const marker of forbidden) {
    if (serialized.includes(marker)) {
      throw new Error(`Depository supply index contains forbidden source-safety marker: ${marker}`);
    }
  }
  if (!index.sourceSafety.sourceSafeMetadataOnly) {
    throw new Error('Depository supply index must remain source-safe metadata only.');
  }
}

function contentUnitFromSupplyRecord(record: DepositorySupplyRecord): DepositoryContentUnit {
  const sourceSafeText = record.searchDocuments.map((document) => document.sourceSafeText).join(' ');
  return {
    unitId: `${record.assetId}:supply-index-source-safe-unit`,
    unitKind: 'depository-supply-index',
    text: sourceSafeText,
    unitHash: root('sha256', sourceSafeText),
    codeAnalysisFacts: {
      symbols: record.searchDocuments.flatMap((document) => document.symbolRoots),
      paths: record.sourceBinding.sourcePathRoots,
      stackTags: [],
      constraints: record.searchDocuments.flatMap((document) => document.constraintRoots),
    },
  };
}

export function depositorySupplyAssetsFromIndex(index: DepositorySupplyIndex): DepositoryAsset[] {
  return index.records.filter((record) => record.lifecycle.searchable).map((record) => ({
    assetId: record.assetId,
    title: record.title,
    summary: record.summary,
    artifactKind: record.artifactKind,
    artifactType: record.artifactType,
    repositoryFullName: record.sourceBinding.repositoryFullName,
    sourceBranch: record.sourceBinding.sourceBranch,
    sourceCommit: record.sourceBinding.sourceCommit,
    contentRoot: record.sourceBinding.contentRoot,
    contentUnits: [contentUnitFromSupplyRecord(record)],
    metadata: {
      depositorySupplyIndexId: index.indexId,
      depositorySupplyRecordId: record.supplyId,
      sourcePaths: record.sourceBinding.sourcePathRoots,
      tags: ['depository-supply-index', record.lifecycle.state],
      declaredConstraints: record.repairActions,
    },
    sourceMaterialBinding: {
      mode: 'source-bound-repository-revision',
      sourceSafeIndexOnly: true,
      protectedSourceVisible: false,
    },
    verificationEvidence: {
      proofRoot: record.proofEvidence.proofRoot,
      measurementRoot: record.measurementEvidence.measurementRoot,
      reconciliationReadbackRoot: record.readbackEvidence.reconciliationReadbackRoot,
      depositorySupplyIndexRoot: index.roots.indexRoot,
    },
    signingSurface: record.proofEvidence.hasWalletOrAttestationProof
      ? {
          source: 'depository-supply-index',
          proofRoot: record.proofEvidence.proofRoot,
          attestationCount: record.proofEvidence.attestationCount,
        }
      : undefined,
    assetMeasurement: record.measurementEvidence.hasAssetMeasurementEvidence
      ? {
          source: 'depository-supply-index',
          measurementRoot: record.measurementEvidence.measurementRoot,
          measurementProvenanceCount: record.measurementEvidence.measurementProvenanceCount,
        }
      : undefined,
    hasWalletOrAttestationProof: record.proofEvidence.hasWalletOrAttestationProof,
    hasAssetMeasurementEvidence: record.measurementEvidence.hasAssetMeasurementEvidence,
  }));
}
