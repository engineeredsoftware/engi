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

  const volume = toBigIntAmount(input.normalizedBitcodeVolume, 'normalizedBitcodeVolume');
  if (volume <= 0n) {
    throw new Error('normalizedBitcodeVolume must be positive for mint admission.');
  }

  return input;
}

export function allocateAssetPackRange(
  state: BtdSupplyState,
  input: BtdMintAdmissionInput,
): BtdRangeAllocationResult {
  assertBtdSupplyState(state);
  assertMintAdmission(input);

  const rangeStart = state.nextTokenId;
  const rangeEndExclusive = rangeStart + input.tokenCount;

  if (rangeEndExclusive > BTD_MAX_MINTABLE_SUPPLY) {
    throw new Error(`AssetPack range would exceed ${BTD_MAX_MINTABLE_SUPPLY}.`);
  }

  const nextSupply = advanceBtdSupply(state, input.tokenCount, input.mintedAtExchangeSequence);

  return {
    previousSupply: state,
    nextSupply,
    accessPolicyId: input.accessPolicyId,
    accessPolicyHash: input.accessPolicyHash,
    measurementReceiptRoot: input.measurementReceiptRoot,
    exchangeReceiptRoot: input.exchangeReceiptRoot,
    range: {
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
    },
  };
}
