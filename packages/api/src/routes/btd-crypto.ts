import { createHash } from 'crypto';
import { traceRoute } from '@bitcode/observability';
import { createAdminClient, type BtdRegistryModel } from '@bitcode/orm';
import { createClient } from '@bitcode/supabase/ssr/server';
import { createJsonResponse } from '@bitcode/responses';
import {
  BTD_MAX_MINTABLE_SUPPLY,
  type BtdAccessPolicy,
  type BtdContributorMeasure,
  type BtdMeasureMintState,
  type BtdOwnershipClaim,
  type BtdReadLicense,
  type SemanticVolumeUnitInput,
  allocateAssetPackRange,
  allocateBtdContributorCells,
  assertNonEmptyString,
  applyBtdMeasureMint,
  buildBtdMintReceipt,
  buildTerminalJournalEntry,
  createBtdMeasureMintState,
  createBtdSupplyState,
  evaluateBtdReadAccess,
  measureProofAddressableSemanticVolume,
} from '@bitcode/btd';

type AuthenticatedUser = {
  userId: string;
};

type BtdRouteAuthResolver = (request: Request) => Promise<AuthenticatedUser | null>;

type BtdRouteOptions = {
  registry?: BtdRegistryModel;
  resolveAuthenticatedUser?: BtdRouteAuthResolver;
};

export interface BtdMintDraftInput {
  assetPackId: string;
  needId: string;
  acceptedNeed: true;
  acceptedFit: true;
  sourceManifestRoot: string;
  fitReceiptRoot: string;
  proofRoot: string;
  dedupeReceiptRoot: string;
  settlementJournalRoot: string;
  exchangeReceiptRoot: string;
  accessPolicyId: string;
  accessPolicyHash: string;
  semanticUnits: SemanticVolumeUnitInput[];
  contributors?: BtdContributorMeasure[];
  measureMintState?: BtdMeasureMintState;
  exchangeSequence: bigint;
  actorId?: string;
  issuedAt?: string;
}

export interface BtdMintDraft {
  kind: 'btd_mint_draft';
  assetPackId: string;
  measurement: ReturnType<typeof measureProofAddressableSemanticVolume>;
  measureMint: ReturnType<typeof applyBtdMeasureMint>['receipt'];
  rangeAllocation?: ReturnType<typeof allocateAssetPackRange>;
  mintReceipt?: ReturnType<typeof buildBtdMintReceipt>;
  contributorAllocation?: ReturnType<typeof allocateBtdContributorCells>;
  terminalJournalEntry: ReturnType<typeof buildTerminalJournalEntry>;
  blocking: boolean;
  zeroCell: boolean;
}

export interface BtdReadAccessInput {
  walletId: string;
  assetPackId: string;
  accessPolicy: BtdAccessPolicy;
  ownershipClaims?: BtdOwnershipClaim[];
  licenses?: BtdReadLicense[];
  at?: string;
}

type BtdReadAccessRouteInput = Omit<BtdReadAccessInput, 'accessPolicy'> & {
  accessPolicy?: BtdAccessPolicy;
};

export interface BtdReadAccessDecision {
  kind: 'btd_read_access_decision';
  actorId: string;
  assetPackId: string;
  decision: ReturnType<typeof evaluateBtdReadAccess>;
  policyDisclosure: {
    accessPolicyId: string;
    accessPolicyHash: string;
    ownerRead: boolean;
    licensedRead: boolean;
    derivativeUse: boolean;
    redistributionAllowed: boolean;
    confidentiality: BtdAccessPolicy['confidentiality'];
  };
}

let defaultRegistry: BtdRegistryModel | null = null;

function getDefaultRegistry() {
  if (!defaultRegistry) {
    defaultRegistry = createAdminClient().btdRegistry;
  }

  return defaultRegistry;
}

async function defaultResolveAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    return null;
  }

  return { userId: user.id };
}

export async function buildBtdRegistrySnapshot(input: {
  registry: BtdRegistryModel;
  assetPackId?: string | null;
}) {
  const [supplyState, ranges] = await Promise.all([
    input.registry.getSupplyState(),
    input.registry.listAssetPackRanges(input.assetPackId || undefined),
  ]);

  return {
    kind: 'btd_registry_snapshot',
    activeCanonicalPointer: 'V26',
    draftTargetVersion: 'V27',
    maxSupply: BTD_MAX_MINTABLE_SUPPLY,
    supplyState,
    ranges,
    routePosture: {
      canonicalCommercialUnit: 'asset_pack_range',
      feeAsset: 'BTC',
      btdSpendableAsFee: false,
      valueBearingMainnetRequiresOperationalApproval: true,
    },
  };
}

export function buildBtdMintDraft(input: BtdMintDraftInput): BtdMintDraft {
  assertMintDraftAdmission(input);
  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const measurementId = stableId('btd-semantic-volume', [
    input.assetPackId,
    input.needId,
    input.semanticUnits.map((unit) => `${unit.unitId}:${unit.proofReceiptRoot}`).join('|'),
  ]);
  const measurement = measureProofAddressableSemanticVolume({
    measurementId,
    assetPackId: input.assetPackId,
    units: input.semanticUnits,
    issuedAt,
  });
  const measureMint = applyBtdMeasureMint({
    state: normalizeMeasureMintState(input.measureMintState),
    assetPackId: input.assetPackId,
    semanticVolume: measurement,
    proofRoot: input.proofRoot,
    settlementJournalRoot: input.settlementJournalRoot,
    accessPolicyHash: input.accessPolicyHash,
    exchangeSequence: input.exchangeSequence,
    issuedAt,
  });

  const rangeAllocation =
    measureMint.receipt.tokenCount > 0
      ? allocateAssetPackRange(
          createBtdSupplyState({
            totalMinted: measureMint.receipt.totalMintedBefore,
            nextTokenId: measureMint.receipt.totalMintedBefore,
            cumulativeAdmittedMeasurement: measureMint.receipt.cumulativeMeasurementBefore,
            residualMintCredit: measureMint.receipt.residualMintCreditBefore,
            curveParameter: measureMint.previousState.curveParameter,
          }),
          {
            assetPackId: input.assetPackId,
            needId: input.needId,
            acceptedNeed: input.acceptedNeed,
            acceptedFit: input.acceptedFit,
            sourceManifestRoot: input.sourceManifestRoot,
            measurementReceiptRoot: measurement.measurementId,
            fitReceiptRoot: input.fitReceiptRoot,
            proofRoot: input.proofRoot,
            dedupeReceiptRoot: input.dedupeReceiptRoot,
            settlementJournalRoot: input.settlementJournalRoot,
            exchangeReceiptRoot: input.exchangeReceiptRoot,
            accessPolicyId: input.accessPolicyId,
            accessPolicyHash: input.accessPolicyHash,
            normalizedBitcodeVolume: measurement.normalizedBitcodeVolume,
            tokenCount: measureMint.receipt.tokenCount,
            mintedAtExchangeSequence: input.exchangeSequence,
          },
        )
      : undefined;
  const mintReceipt = rangeAllocation ? buildBtdMintReceipt(rangeAllocation, issuedAt) : undefined;
  const contributorAllocation =
    rangeAllocation && input.contributors?.length
      ? allocateBtdContributorCells({
          assetPackId: input.assetPackId,
          rangeStart: rangeAllocation.range.rangeStart,
          rangeEndExclusive: rangeAllocation.range.rangeEndExclusive,
          contributors: input.contributors,
          issuedAt,
        })
      : undefined;
  const receiptRoots = [
    measurement.measurementId,
    stableId('btd-measure-mint', [input.assetPackId, input.exchangeSequence.toString()]),
    mintReceipt ? stableId('btd-asset-pack-mint', [input.assetPackId, mintReceipt.issuedAt]) : null,
    contributorAllocation
      ? stableId('btd-contributor-allocation', [input.assetPackId, contributorAllocation.issuedAt])
      : null,
  ].filter((value): value is string => Boolean(value));
  const terminalJournalEntry = buildTerminalJournalEntry({
    journalEntryId: stableId('terminal-v27-btd-mint-draft', [
      input.assetPackId,
      input.exchangeSequence.toString(),
    ]),
    transactionKind: measureMint.receipt.tokenCount > 0 ? 'asset_pack_mint' : 'measure_mint_tail',
    actorId: input.actorId ?? 'system:v27-btd-mint-draft',
    preStateRoot: stableId('btd-pre-state', [measureMint.receipt.totalMintedBefore.toString()]),
    postStateRoot: stableId('btd-post-state', [
      measureMint.receipt.totalMintedAfter.toString(),
      measureMint.receipt.cumulativeMeasurementAfter.toString(),
    ]),
    receiptRoots,
    ledgerAnchorIds: [],
    exchangeSequence: input.exchangeSequence,
    issuedAt,
  });

  return {
    kind: 'btd_mint_draft',
    assetPackId: input.assetPackId,
    measurement,
    measureMint: measureMint.receipt,
    rangeAllocation,
    mintReceipt,
    contributorAllocation,
    terminalJournalEntry,
    blocking: false,
    zeroCell: measureMint.receipt.tokenCount === 0,
  };
}

export function buildBtdReadAccessDecision(
  input: BtdReadAccessInput & { actorId: string },
): BtdReadAccessDecision {
  assertNonEmptyString(input.actorId, 'actorId');
  assertNonEmptyString(input.walletId, 'walletId');
  assertNonEmptyString(input.assetPackId, 'assetPackId');
  const decision = evaluateBtdReadAccess(input);

  return {
    kind: 'btd_read_access_decision',
    actorId: input.actorId,
    assetPackId: input.assetPackId,
    decision,
    policyDisclosure: {
      accessPolicyId: input.accessPolicy.accessPolicyId,
      accessPolicyHash: input.accessPolicy.accessPolicyHash,
      ownerRead: input.accessPolicy.ownerRead,
      licensedRead: input.accessPolicy.licensedRead,
      derivativeUse: input.accessPolicy.derivativeUse,
      redistributionAllowed: input.accessPolicy.redistributionAllowed,
      confidentiality: input.accessPolicy.confidentiality,
    },
  };
}

export function buildGetBtdRegistrySnapshotRoute(options: BtdRouteOptions = {}) {
  return traceRoute('/btd/registry', async (request: Request) => {
    const user = await (options.resolveAuthenticatedUser ?? defaultResolveAuthenticatedUser)(
      request,
    );
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    const url = new URL(request.url);
    const snapshot = await buildBtdRegistrySnapshot({
      registry: options.registry ?? getDefaultRegistry(),
      assetPackId: url.searchParams.get('assetPackId'),
    });

    return createJsonResponse(toJsonSafe(snapshot));
  });
}

export function buildPostBtdMintDraftRoute(options: BtdRouteOptions = {}) {
  return traceRoute('/btd/mint-draft', async (request: Request) => {
    const user = await (options.resolveAuthenticatedUser ?? defaultResolveAuthenticatedUser)(
      request,
    );
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    let body: Omit<BtdMintDraftInput, 'actorId' | 'exchangeSequence'> & {
      exchangeSequence: string | number;
    };
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    let draft: BtdMintDraft;
    try {
      draft = buildBtdMintDraft({
        ...body,
        actorId: user.userId,
        exchangeSequence: BigInt(body.exchangeSequence),
      });
    } catch (error) {
      return createJsonResponse({ error: toBadRequestMessage(error) }, 400);
    }

    return createJsonResponse(toJsonSafe(draft));
  });
}

export function buildPostBtdReadAccessRoute(options: BtdRouteOptions = {}) {
  return traceRoute('/btd/read-access', async (request: Request) => {
    const user = await (options.resolveAuthenticatedUser ?? defaultResolveAuthenticatedUser)(
      request,
    );
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    let body: BtdReadAccessRouteInput;
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    let decision: BtdReadAccessDecision;
    try {
      const registry = options.registry;
      const accessPolicy =
        body.accessPolicy ?? (await resolveRegistryAccessPolicy(registry, body.assetPackId));
      const ownershipClaims =
        body.ownershipClaims ??
        (registry
          ? mapRegistryOwnershipClaims(
              await registry.listOwnershipClaims({
                walletId: body.walletId,
                assetPackId: body.assetPackId,
              }),
            )
          : undefined);
      const licenses =
        body.licenses ??
        (registry
          ? mapRegistryReadLicenses(
              await registry.listReadLicenses({
                walletId: body.walletId,
                assetPackId: body.assetPackId,
              }),
            )
          : undefined);

      decision = buildBtdReadAccessDecision({
        ...body,
        accessPolicy,
        ownershipClaims,
        licenses,
        actorId: user.userId,
      });
    } catch (error) {
      return createJsonResponse({ error: toBadRequestMessage(error) }, 400);
    }

    return createJsonResponse(toJsonSafe(decision));
  });
}

export const getBtdRegistrySnapshot = buildGetBtdRegistrySnapshotRoute();
export const postBtdMintDraft = buildPostBtdMintDraftRoute();
export const postBtdReadAccess = buildPostBtdReadAccessRoute();

function assertMintDraftAdmission(input: BtdMintDraftInput): void {
  if (input.acceptedNeed !== true) {
    throw new Error('V27 BTD mint draft requires accepted Need.');
  }

  if (input.acceptedFit !== true) {
    throw new Error('V27 BTD mint draft requires accepted Fit.');
  }

  if (!input.semanticUnits.length) {
    throw new Error('V27 BTD mint draft requires at least one semantic unit.');
  }

  assertNonEmptyString(input.assetPackId, 'assetPackId');
  assertNonEmptyString(input.needId, 'needId');
  assertNonEmptyString(input.sourceManifestRoot, 'sourceManifestRoot');
  assertNonEmptyString(input.fitReceiptRoot, 'fitReceiptRoot');
  assertNonEmptyString(input.proofRoot, 'proofRoot');
  assertNonEmptyString(input.dedupeReceiptRoot, 'dedupeReceiptRoot');
  assertNonEmptyString(input.settlementJournalRoot, 'settlementJournalRoot');
  assertNonEmptyString(input.exchangeReceiptRoot, 'exchangeReceiptRoot');
  assertNonEmptyString(input.accessPolicyId, 'accessPolicyId');
  assertNonEmptyString(input.accessPolicyHash, 'accessPolicyHash');

  if (typeof input.exchangeSequence !== 'bigint' || input.exchangeSequence <= 0n) {
    throw new Error('V27 BTD mint draft requires a positive Exchange sequence.');
  }
}

function normalizeMeasureMintState(state?: BtdMeasureMintState): BtdMeasureMintState {
  if (!state) {
    return createBtdMeasureMintState();
  }

  return createBtdMeasureMintState({
    totalMinted: state.totalMinted,
    nextTokenId: state.nextTokenId,
    cumulativeAdmittedMeasurement: state.cumulativeAdmittedMeasurement,
    curveParameter: state.curveParameter,
  });
}

function stableId(prefix: string, parts: string[]): string {
  const hash = createHash('sha256').update(parts.join('\u001f')).digest('hex').slice(0, 16);
  return `${prefix}_${hash}`;
}

function toBadRequestMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Invalid V27 BTD mint draft input';
}

async function resolveRegistryAccessPolicy(
  registry: BtdRegistryModel | undefined,
  assetPackId: string,
): Promise<BtdAccessPolicy> {
  if (!registry) {
    throw new Error('accessPolicy is required when no registry projection is supplied.');
  }

  const [range] = await registry.listAssetPackRanges(assetPackId);
  if (!range) {
    throw new Error('No registry range found for AssetPack access policy.');
  }

  return {
    accessPolicyId: readStringField(range, 'access_policy_id', 'accessPolicyId'),
    accessPolicyHash: readStringField(range, 'access_policy_hash', 'accessPolicyHash'),
    ownerRead: readBooleanField(range, true, 'owner_read', 'ownerRead'),
    licensedRead: readBooleanField(range, true, 'licensed_read', 'licensedRead'),
    derivativeUse: readBooleanField(range, false, 'derivative_use', 'derivativeUse'),
    redistributionAllowed: readBooleanField(
      range,
      false,
      'redistribution_allowed',
      'redistributionAllowed',
    ),
    confidentiality: readConfidentiality(range),
  };
}

function mapRegistryOwnershipClaims(rows: Record<string, unknown>[]): BtdOwnershipClaim[] {
  return rows.map((row) => ({
    walletId: readStringField(row, 'to_wallet_id', 'walletId'),
    assetPackId: readStringField(row, 'asset_pack_id', 'assetPackId'),
    rangeStart: readNumberField(row, 'range_start', 'rangeStart'),
    rangeEndExclusive: readNumberField(row, 'range_end_exclusive', 'rangeEndExclusive'),
    accessPolicyHash: readStringField(row, 'access_policy_hash', 'accessPolicyHash'),
  }));
}

function mapRegistryReadLicenses(rows: Record<string, unknown>[]): BtdReadLicense[] {
  return rows.map((row) => ({
    licenseId: readStringField(row, 'license_id', 'licenseId'),
    walletId: readStringField(row, 'wallet_id', 'walletId'),
    assetPackId: readStringField(row, 'asset_pack_id', 'assetPackId'),
    accessPolicyHash: readStringField(row, 'access_policy_hash', 'accessPolicyHash'),
    validFrom: readStringField(row, 'valid_from', 'validFrom'),
    expiresAt: readOptionalStringField(row, 'expires_at', 'expiresAt'),
    revokedAt: readOptionalStringField(row, 'revoked_at', 'revokedAt'),
  }));
}

function readStringField(row: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  throw new Error(`${keys[0]} must be a non-empty string.`);
}

function readOptionalStringField(
  row: Record<string, unknown>,
  ...keys: string[]
): string | undefined {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return undefined;
}

function readNumberField(row: Record<string, unknown>, ...keys: string[]): number {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'number' && Number.isSafeInteger(value)) {
      return value;
    }
    if (typeof value === 'string' && /^-?\d+$/.test(value)) {
      return Number(value);
    }
  }

  throw new Error(`${keys[0]} must be a safe integer.`);
}

function readBooleanField(
  row: Record<string, unknown>,
  fallback: boolean,
  ...keys: string[]
): boolean {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'boolean') {
      return value;
    }
  }

  return fallback;
}

function readConfidentiality(row: Record<string, unknown>): BtdAccessPolicy['confidentiality'] {
  const value = readOptionalStringField(row, 'confidentiality');
  if (value === 'public' || value === 'private' || value === 'public_proof_private_source') {
    return value;
  }

  return 'public_proof_private_source';
}

function toJsonSafe(value: unknown): unknown {
  if (typeof value === 'bigint') {
    return value.toString();
  }

  if (Array.isArray(value)) {
    return value.map((entry) => toJsonSafe(entry));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        toJsonSafe(entry),
      ]),
    );
  }

  return value;
}
