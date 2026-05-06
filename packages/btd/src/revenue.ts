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

export interface BtdLicensedReadRevenueRouteReceipt {
  kind: 'btd.licensed_read_revenue_route';
  paymentId: string;
  assetPackId: string;
  priceAsset: typeof BITCODE_FEE_ASSET;
  grossSats: bigint;
  directSats: bigint;
  ancestorSats: bigint;
  treasurySats: bigint;
  directRoutes: BtdRevenueRecipientRoute[];
  ancestorRoutes: BtdRevenueRecipientRoute[];
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
  issuedAt?: string;
}): BtdLicensedReadRevenueRouteReceipt {
  const directSplitBps = assertBasisPoints(input.directSplitBps ?? 8_000, 'directSplitBps');
  const ancestorSplitBps = assertBasisPoints(
    input.ancestorSplitBps ?? 1_200,
    'ancestorSplitBps',
  );
  const treasurySplitBps = assertBasisPoints(input.treasurySplitBps ?? 800, 'treasurySplitBps');

  if (directSplitBps + ancestorSplitBps + treasurySplitBps !== 10_000) {
    throw new Error('Revenue splits must sum to 10000 basis points.');
  }

  const grossSats = toBigIntAmount(input.grossSats, 'grossSats');
  if (grossSats <= 0n) {
    throw new Error('grossSats must be positive.');
  }

  const directSats = (grossSats * BigInt(directSplitBps)) / 10_000n;
  const requestedAncestorSats = (grossSats * BigInt(ancestorSplitBps)) / 10_000n;
  const hasAncestors = (input.ancestorRecipients ?? []).length > 0;
  const ancestorSats = hasAncestors ? requestedAncestorSats : 0n;
  const treasurySats = grossSats - directSats - ancestorSats;

  return {
    kind: 'btd.licensed_read_revenue_route',
    paymentId: assertNonEmptyString(input.paymentId, 'paymentId'),
    assetPackId: assertNonEmptyString(input.assetPackId, 'assetPackId'),
    priceAsset: BITCODE_FEE_ASSET,
    grossSats,
    directSats,
    ancestorSats,
    treasurySats,
    directRoutes: splitSatsByWeight(directSats, input.directRecipients),
    ancestorRoutes: splitSatsByWeight(ancestorSats, input.ancestorRecipients ?? []),
    treasuryWalletId: assertNonEmptyString(input.treasuryWalletId, 'treasuryWalletId'),
    exchangeSequence: input.exchangeSequence,
    issuedAt: input.issuedAt ?? new Date().toISOString(),
  };
}

export function assertLicensedReadRevenueRouteConserved(
  receipt: BtdLicensedReadRevenueRouteReceipt,
): BtdLicensedReadRevenueRouteReceipt {
  const directTotal = receipt.directRoutes.reduce((sum, route) => sum + route.sats, 0n);
  const ancestorTotal = receipt.ancestorRoutes.reduce((sum, route) => sum + route.sats, 0n);

  if (receipt.priceAsset !== BITCODE_FEE_ASSET) {
    throw new Error('Licensed-read revenue must route BTC sats.');
  }

  if (directTotal !== receipt.directSats) {
    throw new Error('Direct revenue routes do not conserve direct sats.');
  }

  if (ancestorTotal !== receipt.ancestorSats) {
    throw new Error('Ancestor revenue routes do not conserve ancestor sats.');
  }

  if (receipt.directSats + receipt.ancestorSats + receipt.treasurySats !== receipt.grossSats) {
    throw new Error('Revenue route receipt does not conserve gross sats.');
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

function assertBasisPoints(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 0 || value > 10_000) {
    throw new Error(`${label} must be an integer from 0 to 10000.`);
  }

  return value;
}
