import {
  BtdTokenId,
  assertNonEmptyString,
  assertNonNegativeSafeInteger,
  assertPositiveSafeInteger,
  toBigIntAmount,
} from './constants';

export interface BtdContributorMeasure {
  contributorId: string;
  walletId: string;
  normalizedContributionVolume: bigint | number | string;
  fitBps: number;
  qualityBps: number;
  provenanceBps: number;
  noveltyBps: number;
  antiNoiseBps: number;
}

export interface BtdContributorAllocation {
  contributorId: string;
  walletId: string;
  tokenCount: number;
  rangeStart?: BtdTokenId;
  rangeEndExclusive?: BtdTokenId;
  weight: string;
}

export interface BtdContributorAllocationReceipt {
  kind: 'btd.contributor_allocation';
  assetPackId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  tokenCount: number;
  allocationMethod: 'hare_niemeyer_weighted_fit';
  allocations: BtdContributorAllocation[];
  issuedAt: string;
}

export function allocateBtdContributorCells(input: {
  assetPackId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  contributors: BtdContributorMeasure[];
  issuedAt?: string;
}): BtdContributorAllocationReceipt {
  const assetPackId = assertNonEmptyString(input.assetPackId, 'assetPackId');
  const rangeStart = assertNonNegativeSafeInteger(input.rangeStart, 'rangeStart');
  const rangeEndExclusive = assertPositiveSafeInteger(
    input.rangeEndExclusive,
    'rangeEndExclusive',
  );

  if (rangeEndExclusive <= rangeStart) {
    throw new Error('Allocation range must be non-empty.');
  }

  const tokenCount = rangeEndExclusive - rangeStart;
  const seenContributorIds = new Set<string>();
  const weighted = input.contributors.map((contributor) => {
    const contributorId = assertNonEmptyString(contributor.contributorId, 'contributorId');
    if (seenContributorIds.has(contributorId)) {
      throw new Error(`Duplicate contributor allocation id: ${contributorId}.`);
    }
    seenContributorIds.add(contributorId);

    const normalizedContributionVolume = toBigIntAmount(
      contributor.normalizedContributionVolume,
      'normalizedContributionVolume',
    );
    if (normalizedContributionVolume <= 0n) {
      throw new Error('Contributor normalizedContributionVolume must be positive.');
    }

    return {
      contributorId,
      walletId: assertNonEmptyString(contributor.walletId, 'walletId'),
      weight:
        normalizedContributionVolume *
        BigInt(assertBasisPoints(contributor.fitBps, 'fitBps')) *
        BigInt(assertBasisPoints(contributor.qualityBps, 'qualityBps')) *
        BigInt(assertBasisPoints(contributor.provenanceBps, 'provenanceBps')) *
        BigInt(assertBasisPoints(contributor.noveltyBps, 'noveltyBps')) *
        BigInt(assertBasisPoints(contributor.antiNoiseBps, 'antiNoiseBps')),
    };
  });

  if (weighted.length === 0) {
    throw new Error('Contributor allocation requires at least one contributor.');
  }

  const totalWeight = weighted.reduce((sum, contributor) => sum + contributor.weight, 0n);
  if (totalWeight <= 0n) {
    throw new Error('Contributor allocation total weight must be positive.');
  }

  const preliminary = weighted.map((contributor) => {
    const numerator = BigInt(tokenCount) * contributor.weight;
    return {
      ...contributor,
      base: Number(numerator / totalWeight),
      remainder: numerator % totalWeight,
    };
  });

  const baseTotal = preliminary.reduce((sum, contributor) => sum + contributor.base, 0);
  let remaining = tokenCount - baseTotal;
  const sortedForRemainder = [...preliminary].sort((left, right) => {
    if (left.remainder === right.remainder) {
      return left.contributorId.localeCompare(right.contributorId);
    }

    return left.remainder > right.remainder ? -1 : 1;
  });
  const extraByContributor = new Map<string, number>();

  for (const contributor of sortedForRemainder) {
    if (remaining <= 0) break;
    extraByContributor.set(contributor.contributorId, 1);
    remaining -= 1;
  }

  let cursor = rangeStart;
  const allocations = [...preliminary]
    .sort((left, right) => left.contributorId.localeCompare(right.contributorId))
    .map((contributor): BtdContributorAllocation => {
      const count = contributor.base + (extraByContributor.get(contributor.contributorId) ?? 0);
      const allocation: BtdContributorAllocation = {
        contributorId: contributor.contributorId,
        walletId: contributor.walletId,
        tokenCount: count,
        rangeStart: count > 0 ? cursor : undefined,
        rangeEndExclusive: count > 0 ? cursor + count : undefined,
        weight: contributor.weight.toString(),
      };
      cursor += count;
      return allocation;
    });

  const allocated = allocations.reduce((sum, allocation) => sum + allocation.tokenCount, 0);
  if (allocated !== tokenCount || cursor !== rangeEndExclusive) {
    throw new Error('Contributor allocation failed to conserve the AssetPack range.');
  }

  return {
    kind: 'btd.contributor_allocation',
    assetPackId,
    rangeStart,
    rangeEndExclusive,
    tokenCount,
    allocationMethod: 'hare_niemeyer_weighted_fit',
    allocations,
    issuedAt: input.issuedAt ?? new Date().toISOString(),
  };
}

function assertBasisPoints(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 0 || value > 10_000) {
    throw new Error(`${label} must be an integer from 0 to 10000.`);
  }

  return value;
}
