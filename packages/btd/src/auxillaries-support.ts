import { createHash } from 'crypto';

import { BITCODE_FEE_ASSET } from './constants';

export type BtdAuxillariesSignerState = 'verified' | 'manual' | 'pending' | 'missing' | 'invalid';
export type BtdAuxillariesSignerRequiredAction =
  | 'none'
  | 'connect_wallet'
  | 'verify_wallet_signature'
  | 'repair_wallet_binding';
export type BtdAuxillariesReadinessState = 'ready' | 'degraded' | 'blocked' | 'unknown';
export type BtdAuxillariesNetworkRequiredAction =
  | 'none'
  | 'connect_wallet'
  | 'verify_network'
  | 'repair_wallet_binding';
export type BtdAuxillariesReadRightState =
  | 'owner_read'
  | 'licensed_read'
  | 'pending_settlement'
  | 'denied'
  | 'unknown';

export interface BtdAuxillariesWalletInput {
  address?: string | null;
  provider?: string | null;
  verificationState?: string | null;
  connected?: boolean | null;
  valid?: boolean | null;
  network?: string | null;
}

export interface BtdAuxillariesAssetPackInput {
  assetPackId: string;
  rangeStart?: number | null;
  rangeEndExclusive?: number | null;
  readRightState?: BtdAuxillariesReadRightState | string | null;
  accessPolicyHash?: string | null;
  sourceSafePreviewRoot?: string | null;
  acquiredAt?: string | null;
}

export interface BtdWalletBtdSupportProjection {
  kind: 'btd.wallet_btd_support_projection';
  walletCapability: {
    hasBinding: boolean;
    provider: string | null;
    address: string | null;
    verificationState: string | null;
    network: string | null;
    noCustody: true;
    serverCustody: false;
    capabilities: Array<'message_sign' | 'psbt_sign' | 'rights_transfer'>;
    walletCapabilityRoot: string;
  };
  signerPosture: {
    ready: boolean;
    state: BtdAuxillariesSignerState;
    requiredAction: BtdAuxillariesSignerRequiredAction;
    canSignPsbt: boolean;
    canSignRightsTransfer: boolean;
    serverCustody: false;
  };
  networkReadiness: {
    state: BtdAuxillariesReadinessState;
    network: string | null;
    requiredAction: BtdAuxillariesNetworkRequiredAction;
    blocker: string | null;
  };
  btdReadRightSummary: {
    aggregateBtd: number;
    assetPackCount: number;
    recentAssetPackIds: string[];
    rangeCount: number;
    totalRangeCells: number;
    ownerReadCount: number;
    licensedReadCount: number;
    pendingSettlementCount: number;
    deniedCount: number;
    unknownCount: number;
    protectedSourceVisible: false;
    sourceSafePreviewRoots: string[];
  };
  treasurySummary: {
    btcFeeBalance: number | null;
    feeAsset: typeof BITCODE_FEE_ASSET;
    noCustody: true;
    treasuryScope: 'account';
    organizationTreasurySeparated: true;
    exchangeMarketState: 'not_exchange_market_state';
  };
  settlementReadiness: BtdAuxillariesReadinessState;
  settlementBlockers: string[];
  sourceSafetyClass: 'source_safe';
  btdSupportRoot: string;
}

export function buildBtdWalletBtdSupportProjection(input: {
  wallet?: BtdAuxillariesWalletInput | null;
  aggregateBtd?: number | null;
  btcFeeBalance?: number | null;
  recentAssetPacks?: BtdAuxillariesAssetPackInput[] | null;
}): BtdWalletBtdSupportProjection {
  const wallet = input.wallet ?? null;
  const address = readString(wallet?.address);
  const provider = readString(wallet?.provider);
  const verificationState = readString(wallet?.verificationState);
  const network = readString(wallet?.network);
  const connected = typeof wallet?.connected === 'boolean' ? wallet.connected : Boolean(address);
  const valid = typeof wallet?.valid === 'boolean' ? wallet.valid : verificationState === 'verified';
  const signerState = deriveSignerState({ address, connected, valid, verificationState });
  const signerReady = signerState === 'verified';
  const signerRequiredAction: BtdAuxillariesSignerRequiredAction = signerReady
    ? 'none'
    : signerState === 'missing'
      ? 'connect_wallet'
      : signerState === 'manual' || signerState === 'pending'
        ? 'verify_wallet_signature'
        : 'repair_wallet_binding';
  const capabilities = [
    address ? 'message_sign' : null,
    signerReady ? 'psbt_sign' : null,
    signerReady ? 'rights_transfer' : null,
  ].filter((capability): capability is 'message_sign' | 'psbt_sign' | 'rights_transfer' => Boolean(capability));
  const walletCapabilityWithoutRoot = {
    hasBinding: Boolean(address),
    provider,
    address,
    verificationState,
    network,
    noCustody: true as const,
    serverCustody: false as const,
    capabilities,
  };
  const networkReadiness = deriveNetworkReadiness({ address, network, signerState });
  const assetPacks = (input.recentAssetPacks ?? []).map(normalizeAssetPack).filter(Boolean) as NormalizedBtdAssetPack[];
  const readRightCounts = assetPacks.reduce(
    (counts, assetPack) => {
      counts[assetPack.readRightState] += 1;
      return counts;
    },
    {
      owner_read: 0,
      licensed_read: 0,
      pending_settlement: 0,
      denied: 0,
      unknown: 0,
    } satisfies Record<BtdAuxillariesReadRightState, number>,
  );
  const settlementBlockers = [
    signerReady ? null : `wallet.${signerRequiredAction}`,
    networkReadiness.state === 'blocked' ? networkReadiness.blocker : null,
  ].filter((entry): entry is string => Boolean(entry));
  const settlementReadiness: BtdAuxillariesReadinessState = settlementBlockers.length
    ? address
      ? 'degraded'
      : 'blocked'
    : 'ready';
  const withoutRoot = {
    kind: 'btd.wallet_btd_support_projection' as const,
    walletCapability: {
      ...walletCapabilityWithoutRoot,
      walletCapabilityRoot: stableRoot('btd-wallet-capability', walletCapabilityWithoutRoot),
    },
    signerPosture: {
      ready: signerReady,
      state: signerState,
      requiredAction: signerRequiredAction,
      canSignPsbt: signerReady,
      canSignRightsTransfer: signerReady,
      serverCustody: false as const,
    },
    networkReadiness,
    btdReadRightSummary: {
      aggregateBtd: readFiniteNumber(input.aggregateBtd) ?? 0,
      assetPackCount: assetPacks.length,
      recentAssetPackIds: assetPacks.map((assetPack) => assetPack.assetPackId),
      rangeCount: assetPacks.filter((assetPack) => assetPack.rangeCells > 0).length,
      totalRangeCells: assetPacks.reduce((sum, assetPack) => sum + assetPack.rangeCells, 0),
      ownerReadCount: readRightCounts.owner_read,
      licensedReadCount: readRightCounts.licensed_read,
      pendingSettlementCount: readRightCounts.pending_settlement,
      deniedCount: readRightCounts.denied,
      unknownCount: readRightCounts.unknown,
      protectedSourceVisible: false as const,
      sourceSafePreviewRoots: assetPacks
        .map((assetPack) => assetPack.sourceSafePreviewRoot)
        .filter((root): root is string => Boolean(root)),
    },
    treasurySummary: {
      btcFeeBalance: readFiniteNumber(input.btcFeeBalance),
      feeAsset: BITCODE_FEE_ASSET,
      noCustody: true as const,
      treasuryScope: 'account' as const,
      organizationTreasurySeparated: true as const,
      exchangeMarketState: 'not_exchange_market_state' as const,
    },
    settlementReadiness,
    settlementBlockers,
    sourceSafetyClass: 'source_safe' as const,
  };

  return {
    ...withoutRoot,
    btdSupportRoot: stableRoot('btd-wallet-btd-support-projection', withoutRoot),
  };
}

interface NormalizedBtdAssetPack {
  assetPackId: string;
  rangeCells: number;
  readRightState: BtdAuxillariesReadRightState;
  sourceSafePreviewRoot: string | null;
}

function normalizeAssetPack(value: BtdAuxillariesAssetPackInput): NormalizedBtdAssetPack | null {
  const assetPackId = readString(value.assetPackId);
  if (!assetPackId) return null;
  const rangeStart = readFiniteNumber(value.rangeStart);
  const rangeEndExclusive = readFiniteNumber(value.rangeEndExclusive);
  const rangeCells =
    typeof rangeStart === 'number' &&
    typeof rangeEndExclusive === 'number' &&
    rangeEndExclusive > rangeStart
      ? rangeEndExclusive - rangeStart
      : 0;

  return {
    assetPackId,
    rangeCells,
    readRightState: normalizeReadRightState(value.readRightState),
    sourceSafePreviewRoot: readString(value.sourceSafePreviewRoot),
  };
}

function deriveSignerState(input: {
  address: string | null;
  connected: boolean;
  valid: boolean;
  verificationState: string | null;
}): BtdAuxillariesSignerState {
  if (!input.address) return 'missing';
  if (input.valid || input.verificationState === 'verified') return 'verified';
  if (input.verificationState === 'pending') return 'pending';
  if (input.verificationState === 'manual') return 'manual';
  if (input.connected) return 'invalid';
  return 'missing';
}

function deriveNetworkReadiness(input: {
  address: string | null;
  network: string | null;
  signerState: BtdAuxillariesSignerState;
}): BtdWalletBtdSupportProjection['networkReadiness'] {
  if (!input.address) {
    return {
      state: 'blocked',
      network: null,
      requiredAction: 'connect_wallet',
      blocker: 'wallet.network_missing',
    };
  }

  if (!input.network) {
    return {
      state: input.signerState === 'verified' ? 'degraded' : 'blocked',
      network: null,
      requiredAction: 'verify_network',
      blocker: 'wallet.network_unverified',
    };
  }

  if (input.signerState === 'invalid') {
    return {
      state: 'blocked',
      network: input.network,
      requiredAction: 'repair_wallet_binding',
      blocker: 'wallet.binding_invalid',
    };
  }

  return {
    state: 'ready',
    network: input.network,
    requiredAction: 'none',
    blocker: null,
  };
}

function normalizeReadRightState(value: unknown): BtdAuxillariesReadRightState {
  const normalized = readString(value);
  if (
    normalized === 'owner_read' ||
    normalized === 'licensed_read' ||
    normalized === 'pending_settlement' ||
    normalized === 'denied' ||
    normalized === 'unknown'
  ) {
    return normalized;
  }

  return 'unknown';
}

function readString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function readFiniteNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function stableRoot(label: string, value: unknown) {
  return createHash('sha256')
    .update(`${label}:`)
    .update(stableSerialize(value))
    .digest('hex');
}

function stableSerialize(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableSerialize).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value as Record<string, unknown>)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableSerialize((value as Record<string, unknown>)[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}
