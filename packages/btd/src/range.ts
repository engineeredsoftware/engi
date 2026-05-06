import {
  BTD_MAX_MINTABLE_SUPPLY,
  BtdTokenId,
  assertNonEmptyString,
  assertPositiveSafeInteger,
  toBigIntAmount,
} from './constants';
import { BtdSupplyState, advanceBtdSupply, assertBtdSupplyState } from './supply';

export interface BtdMintAdmissionInput {
  assetPackId: string;
  needId: string;
  acceptedNeed: true;
  acceptedFit: true;
  sourceManifestRoot: string;
  measurementReceiptRoot: string;
  fitReceiptRoot: string;
  proofRoot: string;
  dedupeReceiptRoot: string;
  settlementJournalRoot: string;
  exchangeReceiptRoot: string;
  accessPolicyId: string;
  accessPolicyHash: string;
  normalizedBitcodeVolume: bigint | number | string;
  tokenCount: number;
  mintedAtExchangeSequence: bigint;
}

export interface AssetPackRange {
  assetPackId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  tokenCount: number;
  normalizedBitcodeVolume: bigint;
  needId: string;
  fitReceiptRoot: string;
  proofRoot: string;
  sourceManifestRoot: string;
  settlementJournalRoot: string;
  dedupeReceiptRoot: string;
  mintedAtExchangeSequence: bigint;
}

export interface BtdRangeAllocationResult {
  previousSupply: BtdSupplyState;
  nextSupply: BtdSupplyState;
  range: AssetPackRange;
  accessPolicyId: string;
  accessPolicyHash: string;
  measurementReceiptRoot: string;
  exchangeReceiptRoot: string;
}

export interface BtdRangeAllocationOptions {
  existingRanges?: AssetPackRange[];
}

export function assertMintAdmission(input: BtdMintAdmissionInput): BtdMintAdmissionInput {
  if (input.acceptedNeed !== true) {
    throw new Error('BTD mint admission requires accepted Need.');
  }

  if (input.acceptedFit !== true) {
    throw new Error('BTD mint admission requires accepted Fit.');
  }

  assertNonEmptyString(input.assetPackId, 'assetPackId');
  assertNonEmptyString(input.needId, 'needId');
  assertNonEmptyString(input.sourceManifestRoot, 'sourceManifestRoot');
  assertNonEmptyString(input.measurementReceiptRoot, 'measurementReceiptRoot');
  assertNonEmptyString(input.fitReceiptRoot, 'fitReceiptRoot');
  assertNonEmptyString(input.proofRoot, 'proofRoot');
  assertNonEmptyString(input.dedupeReceiptRoot, 'dedupeReceiptRoot');
  assertNonEmptyString(input.settlementJournalRoot, 'settlementJournalRoot');
  assertNonEmptyString(input.exchangeReceiptRoot, 'exchangeReceiptRoot');
  assertNonEmptyString(input.accessPolicyId, 'accessPolicyId');
  assertNonEmptyString(input.accessPolicyHash, 'accessPolicyHash');
  assertPositiveSafeInteger(input.tokenCount, 'tokenCount');

  if (typeof input.mintedAtExchangeSequence !== 'bigint' || input.mintedAtExchangeSequence <= 0n) {
    throw new Error('mintedAtExchangeSequence must be a positive bigint.');
  }

  const volume = toBigIntAmount(input.normalizedBitcodeVolume, 'normalizedBitcodeVolume');
  if (volume <= 0n) {
    throw new Error('normalizedBitcodeVolume must be positive for mint admission.');
  }

  return input;
}

export function allocateAssetPackRange(
  state: BtdSupplyState,
  input: BtdMintAdmissionInput,
  options: BtdRangeAllocationOptions = {},
): BtdRangeAllocationResult {
  assertBtdSupplyState(state);
  assertMintAdmission(input);

  const rangeStart = state.nextTokenId;
  const rangeEndExclusive = rangeStart + input.tokenCount;

  if (rangeEndExclusive > BTD_MAX_MINTABLE_SUPPLY) {
    throw new Error(`AssetPack range would exceed ${BTD_MAX_MINTABLE_SUPPLY}.`);
  }

  const nextSupply = advanceBtdSupply(state, input.tokenCount, input.mintedAtExchangeSequence);
  const range = assertAssetPackRangeIntegrity({
    assetPackId: input.assetPackId,
    rangeStart,
    rangeEndExclusive,
    tokenCount: input.tokenCount,
    normalizedBitcodeVolume: toBigIntAmount(
      input.normalizedBitcodeVolume,
      'normalizedBitcodeVolume',
    ),
    needId: input.needId,
    fitReceiptRoot: input.fitReceiptRoot,
    proofRoot: input.proofRoot,
    sourceManifestRoot: input.sourceManifestRoot,
    settlementJournalRoot: input.settlementJournalRoot,
    dedupeReceiptRoot: input.dedupeReceiptRoot,
    mintedAtExchangeSequence: input.mintedAtExchangeSequence,
  });

  assertAssetPackRangePlacement(options.existingRanges ?? [], range);

  return {
    previousSupply: state,
    nextSupply,
    accessPolicyId: input.accessPolicyId,
    accessPolicyHash: input.accessPolicyHash,
    measurementReceiptRoot: input.measurementReceiptRoot,
    exchangeReceiptRoot: input.exchangeReceiptRoot,
    range,
  };
}

export function assertAssetPackRangeIntegrity(range: AssetPackRange): AssetPackRange {
  assertNonEmptyString(range.assetPackId, 'assetPackId');
  assertNonEmptyString(range.needId, 'needId');
  assertNonEmptyString(range.fitReceiptRoot, 'fitReceiptRoot');
  assertNonEmptyString(range.proofRoot, 'proofRoot');
  assertNonEmptyString(range.sourceManifestRoot, 'sourceManifestRoot');
  assertNonEmptyString(range.settlementJournalRoot, 'settlementJournalRoot');
  assertNonEmptyString(range.dedupeReceiptRoot, 'dedupeReceiptRoot');
  assertPositiveSafeInteger(range.tokenCount, 'tokenCount');

  if (range.rangeStart < 0 || !Number.isSafeInteger(range.rangeStart)) {
    throw new Error('rangeStart must be a non-negative safe integer.');
  }

  if (range.rangeEndExclusive !== range.rangeStart + range.tokenCount) {
    throw new Error('AssetPack range boundaries must conserve tokenCount.');
  }

  if (range.rangeEndExclusive > BTD_MAX_MINTABLE_SUPPLY) {
    throw new Error(`AssetPack range would exceed ${BTD_MAX_MINTABLE_SUPPLY}.`);
  }

  if (range.normalizedBitcodeVolume <= 0n) {
    throw new Error('normalizedBitcodeVolume must be positive for AssetPack ranges.');
  }

  return range;
}

export function assertAssetPackRangePlacement(
  existingRanges: AssetPackRange[],
  candidate: AssetPackRange,
): AssetPackRange {
  const candidateRange = assertAssetPackRangeIntegrity(candidate);

  for (const existing of existingRanges) {
    const existingRange = assertAssetPackRangeIntegrity(existing);

    if (existingRange.assetPackId === candidateRange.assetPackId) {
      throw new Error(`AssetPack ${candidateRange.assetPackId} already has a primary BTD range.`);
    }

    if (rangesOverlap(existingRange, candidateRange)) {
      throw new Error(
        `AssetPack range ${candidateRange.rangeStart}-${candidateRange.rangeEndExclusive} overlaps ${existingRange.rangeStart}-${existingRange.rangeEndExclusive}.`,
      );
    }
  }

  return candidateRange;
}

function rangesOverlap(left: AssetPackRange, right: AssetPackRange): boolean {
  return left.rangeStart < right.rangeEndExclusive && right.rangeStart < left.rangeEndExclusive;
}
