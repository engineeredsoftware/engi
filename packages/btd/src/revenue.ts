import { BITCODE_FEE_ASSET, assertNonEmptyString, toBigIntAmount } from './constants';

export interface BtdRevenueRecipientInput {
  walletId: string;
  weight: bigint | number | string;
}

export interface BtdRevenueRecipientRoute {
  walletId: string;
  sats: bigint;
  weight: string;
}

export type BtdRevenueRouteCategory = 'direct' | 'ancestor' | 'treasury' | 'dispute_holdback';

export interface BtdRevenueRouteException {
  category: BtdRevenueRouteCategory;
  walletId?: string;
  sats: bigint;
  reason: string;
}

export interface BtdLicensedReadRevenueRouteReceipt {
  kind: 'btd.licensed_read_revenue_route';
  paymentId: string;
  assetPackId: string;
  priceAsset: typeof BITCODE_FEE_ASSET;
  grossSats: bigint;
  directSats: bigint;
  ancestorSats: bigint;
  treasurySats: bigint;
  disputeHoldbackSats: bigint;
  directRoutes: BtdRevenueRecipientRoute[];
  ancestorRoutes: BtdRevenueRecipientRoute[];
  treasuryRoutes: BtdRevenueRecipientRoute[];
  disputeHoldbackWalletId?: string;
  pendingRoutes: BtdRevenueRouteException[];
  failedRoutes: BtdRevenueRouteException[];
  routeState: 'settled' | 'pending' | 'failed';
  treasuryWalletId: string;
  exchangeSequence: bigint;
  issuedAt: string;
}

export function buildLicensedReadRevenueRoute(input: {
  paymentId: string;
  assetPackId: string;
  grossSats: bigint | number | string;
  directRecipients: BtdRevenueRecipientInput[];
  ancestorRecipients?: BtdRevenueRecipientInput[];
  treasuryWalletId: string;
  exchangeSequence: bigint;
  directSplitBps?: number;
  ancestorSplitBps?: number;
  treasurySplitBps?: number;
  disputeHoldbackBps?: number;
  disputeHoldbackWalletId?: string;
  pendingRoutes?: BtdRevenueRouteException[];
  failedRoutes?: BtdRevenueRouteException[];
  issuedAt?: string;
}): BtdLicensedReadRevenueRouteReceipt {
  const directSplitBps = assertBasisPoints(input.directSplitBps ?? 8_000, 'directSplitBps');
  const ancestorSplitBps = assertBasisPoints(
    input.ancestorSplitBps ?? 1_200,
    'ancestorSplitBps',
  );
  const treasurySplitBps = assertBasisPoints(input.treasurySplitBps ?? 800, 'treasurySplitBps');
  const disputeHoldbackBps = assertBasisPoints(
    input.disputeHoldbackBps ?? 0,
    'disputeHoldbackBps',
  );

  if (
    directSplitBps + ancestorSplitBps + treasurySplitBps + disputeHoldbackBps !==
    10_000
  ) {
    throw new Error('Revenue splits must sum to 10000 basis points.');
  }

  const grossSats = toBigIntAmount(input.grossSats, 'grossSats');
  if (grossSats <= 0n) {
    throw new Error('grossSats must be positive.');
  }

  const directSats = (grossSats * BigInt(directSplitBps)) / 10_000n;
  const requestedAncestorSats = (grossSats * BigInt(ancestorSplitBps)) / 10_000n;
  const disputeHoldbackSats = (grossSats * BigInt(disputeHoldbackBps)) / 10_000n;
  const hasAncestors = (input.ancestorRecipients ?? []).length > 0;
  const ancestorSats = hasAncestors ? requestedAncestorSats : 0n;
  const treasurySats = grossSats - directSats - ancestorSats - disputeHoldbackSats;
  const treasuryWalletId = assertNonEmptyString(input.treasuryWalletId, 'treasuryWalletId');
  const disputeHoldbackWalletId =
    disputeHoldbackSats > 0n
      ? assertNonEmptyString(
          input.disputeHoldbackWalletId,
          'disputeHoldbackWalletId',
        )
      : input.disputeHoldbackWalletId
        ? assertNonEmptyString(input.disputeHoldbackWalletId, 'disputeHoldbackWalletId')
        : undefined;
  const pendingRoutes = (input.pendingRoutes ?? []).map(assertRouteException);
  const failedRoutes = (input.failedRoutes ?? []).map(assertRouteException);
  const holdbackPendingRoutes =
    disputeHoldbackSats > 0n
      ? [
          ...pendingRoutes,
          {
            category: 'dispute_holdback' as const,
            walletId: disputeHoldbackWalletId,
            sats: disputeHoldbackSats,
            reason: 'dispute_holdback_pending',
          },
        ]
      : pendingRoutes;

  return {
    kind: 'btd.licensed_read_revenue_route',
    paymentId: assertNonEmptyString(input.paymentId, 'paymentId'),
    assetPackId: assertNonEmptyString(input.assetPackId, 'assetPackId'),
    priceAsset: BITCODE_FEE_ASSET,
    grossSats,
    directSats,
    ancestorSats,
    treasurySats,
    disputeHoldbackSats,
    directRoutes: splitSatsByWeight(directSats, input.directRecipients),
    ancestorRoutes: splitSatsByWeight(ancestorSats, input.ancestorRecipients ?? []),
    treasuryRoutes: [{ walletId: treasuryWalletId, sats: treasurySats, weight: '1' }],
    disputeHoldbackWalletId,
    pendingRoutes: holdbackPendingRoutes,
    failedRoutes,
    routeState: failedRoutes.length
      ? 'failed'
      : holdbackPendingRoutes.length
        ? 'pending'
        : 'settled',
    treasuryWalletId,
    exchangeSequence: assertPositiveExchangeSequence(input.exchangeSequence),
    issuedAt: input.issuedAt ?? new Date().toISOString(),
  };
}

export function assertLicensedReadRevenueRouteConserved(
  receipt: BtdLicensedReadRevenueRouteReceipt,
): BtdLicensedReadRevenueRouteReceipt {
  const directTotal = receipt.directRoutes.reduce((sum, route) => sum + route.sats, 0n);
  const ancestorTotal = receipt.ancestorRoutes.reduce((sum, route) => sum + route.sats, 0n);
  const treasuryTotal = receipt.treasuryRoutes.reduce((sum, route) => sum + route.sats, 0n);

  if (receipt.priceAsset !== BITCODE_FEE_ASSET) {
    throw new Error('Licensed-read revenue must route BTC sats.');
  }

  if (directTotal !== receipt.directSats) {
    throw new Error('Direct revenue routes do not conserve direct sats.');
  }

  if (ancestorTotal !== receipt.ancestorSats) {
    throw new Error('Ancestor revenue routes do not conserve ancestor sats.');
  }

  if (treasuryTotal !== receipt.treasurySats) {
    throw new Error('Treasury revenue routes do not conserve treasury sats.');
  }

  if (
    receipt.directSats +
      receipt.ancestorSats +
      receipt.treasurySats +
      receipt.disputeHoldbackSats !==
    receipt.grossSats
  ) {
    throw new Error('Revenue route receipt does not conserve gross sats.');
  }

  for (const route of [...receipt.pendingRoutes, ...receipt.failedRoutes]) {
    assertRouteException(route);
  }

  return receipt;
}

function splitSatsByWeight(
  sats: bigint,
  recipients: BtdRevenueRecipientInput[],
): BtdRevenueRecipientRoute[] {
  if (sats === 0n) {
    return recipients.map((recipient) => ({
      walletId: assertNonEmptyString(recipient.walletId, 'walletId'),
      sats: 0n,
      weight: toBigIntAmount(recipient.weight, 'weight').toString(),
    }));
  }

  if (recipients.length === 0) {
    if (sats > 0n) {
      throw new Error('Cannot route nonzero sats without recipients.');
    }
    return [];
  }

  const weighted = recipients.map((recipient) => {
    const weight = toBigIntAmount(recipient.weight, 'weight');
    if (weight <= 0n) {
      throw new Error('Revenue recipient weight must be positive.');
    }

    return {
      walletId: assertNonEmptyString(recipient.walletId, 'walletId'),
      weight,
    };
  });
  const totalWeight = weighted.reduce((sum, recipient) => sum + recipient.weight, 0n);
  const preliminary = weighted.map((recipient) => {
    const numerator = sats * recipient.weight;
    return {
      ...recipient,
      base: numerator / totalWeight,
      remainder: numerator % totalWeight,
    };
  });
  let remaining = sats - preliminary.reduce((sum, recipient) => sum + recipient.base, 0n);
  const extraByWallet = new Map<string, bigint>();

  for (const recipient of [...preliminary].sort((left, right) => {
    if (left.remainder === right.remainder) {
      return left.walletId.localeCompare(right.walletId);
    }

    return left.remainder > right.remainder ? -1 : 1;
  })) {
    if (remaining <= 0n) break;
    extraByWallet.set(recipient.walletId, 1n);
    remaining -= 1n;
  }

  return preliminary
    .sort((left, right) => left.walletId.localeCompare(right.walletId))
    .map((recipient) => ({
      walletId: recipient.walletId,
      sats: recipient.base + (extraByWallet.get(recipient.walletId) ?? 0n),
      weight: recipient.weight.toString(),
    }));
}

function assertRouteException(route: BtdRevenueRouteException): BtdRevenueRouteException {
  if (
    route.category !== 'direct' &&
    route.category !== 'ancestor' &&
    route.category !== 'treasury' &&
    route.category !== 'dispute_holdback'
  ) {
    throw new Error(`Unsupported revenue route category: ${route.category}.`);
  }

  const sats = toBigIntAmount(route.sats, 'routeException.sats');
  if (sats < 0n) {
    throw new Error('routeException.sats must be non-negative.');
  }

  if (route.walletId) {
    assertNonEmptyString(route.walletId, 'routeException.walletId');
  }

  assertNonEmptyString(route.reason, 'routeException.reason');

  return {
    category: route.category,
    walletId: route.walletId,
    sats,
    reason: route.reason,
  };
}

function assertPositiveExchangeSequence(value: bigint): bigint {
  if (typeof value !== 'bigint' || value <= 0n) {
    throw new Error('exchangeSequence must be a positive bigint.');
  }

  return value;
}

function assertBasisPoints(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 0 || value > 10_000) {
    throw new Error(`${label} must be an integer from 0 to 10000.`);
  }

  return value;
}
