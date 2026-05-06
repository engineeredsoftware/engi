import {
  BTD_MAX_MINTABLE_SUPPLY,
  BtdTokenId,
  assertNonNegativeSafeInteger,
  assertPositiveBigInt,
  assertPositiveSafeInteger,
  toBigIntAmount,
} from './constants';
import type { BtdMeasureMintCurve, BtdMeasureMintTailPolicy } from './measuremint';

export interface BtdSupplyState {
  maxSupply: typeof BTD_MAX_MINTABLE_SUPPLY;
  totalMinted: number;
  nextTokenId: BtdTokenId;
  cumulativeAdmittedMeasurement: bigint;
  residualMintCredit: bigint;
  curve: BtdMeasureMintCurve;
  curveParameter: bigint;
  tailPolicy: BtdMeasureMintTailPolicy;
  exhaustedAtExchangeSequence?: bigint;
}

export function createBtdSupplyState(input?: {
  totalMinted?: number;
  nextTokenId?: BtdTokenId;
  cumulativeAdmittedMeasurement?: bigint | number | string;
  residualMintCredit?: bigint | number | string;
  curveParameter?: bigint | number | string;
  exhaustedAtExchangeSequence?: bigint;
}): BtdSupplyState {
  const totalMinted = assertNonNegativeSafeInteger(input?.totalMinted ?? 0, 'totalMinted');
  const nextTokenId = assertNonNegativeSafeInteger(input?.nextTokenId ?? totalMinted, 'nextTokenId');
  const cumulativeAdmittedMeasurement = toBigIntAmount(
    input?.cumulativeAdmittedMeasurement ?? 0n,
    'cumulativeAdmittedMeasurement',
  );
  const residualMintCredit = toBigIntAmount(input?.residualMintCredit ?? 0n, 'residualMintCredit');
  const curveParameter = toBigIntAmount(input?.curveParameter ?? 21_000_000n, 'curveParameter');
  assertPositiveBigInt(curveParameter, 'curveParameter');

  if (totalMinted > BTD_MAX_MINTABLE_SUPPLY) {
    throw new Error(`totalMinted cannot exceed ${BTD_MAX_MINTABLE_SUPPLY}.`);
  }

  if (nextTokenId !== totalMinted) {
    throw new Error('V27 contiguous allocator requires nextTokenId to equal totalMinted.');
  }

  return {
    maxSupply: BTD_MAX_MINTABLE_SUPPLY,
    totalMinted,
    nextTokenId,
    cumulativeAdmittedMeasurement,
    residualMintCredit,
    curve: 'hyperbolic_saturation',
    curveParameter,
    tailPolicy: 'zero_cell_receipt_then_refit_only',
    exhaustedAtExchangeSequence: input?.exhaustedAtExchangeSequence,
  };
}

export function assertBtdSupplyState(state: BtdSupplyState): BtdSupplyState {
  if (state.maxSupply !== BTD_MAX_MINTABLE_SUPPLY) {
    throw new Error(`$BTD maxSupply must be ${BTD_MAX_MINTABLE_SUPPLY}.`);
  }

  assertNonNegativeSafeInteger(state.totalMinted, 'totalMinted');
  assertNonNegativeSafeInteger(state.nextTokenId, 'nextTokenId');

  if (state.totalMinted > state.maxSupply) {
    throw new Error('totalMinted cannot exceed maxSupply.');
  }

  if (state.nextTokenId !== state.totalMinted) {
    throw new Error('V27 contiguous allocator requires nextTokenId to equal totalMinted.');
  }

  if (state.cumulativeAdmittedMeasurement < 0n) {
    throw new Error('cumulativeAdmittedMeasurement cannot be negative.');
  }

  if (state.residualMintCredit < 0n) {
    throw new Error('residualMintCredit cannot be negative.');
  }

  if (state.curve !== 'hyperbolic_saturation') {
    throw new Error('V27 supply curve must be hyperbolic_saturation.');
  }

  assertPositiveBigInt(state.curveParameter, 'curveParameter');

  if (state.tailPolicy !== 'zero_cell_receipt_then_refit_only') {
    throw new Error('V27 supply tail policy must be zero_cell_receipt_then_refit_only.');
  }

  return state;
}

export function assertCanMintBtdRange(
  state: BtdSupplyState,
  tokenCount: number,
): number {
  assertBtdSupplyState(state);
  const count = assertPositiveSafeInteger(tokenCount, 'tokenCount');
  const totalMintedAfter = state.totalMinted + count;

  if (totalMintedAfter > state.maxSupply) {
    throw new Error(
      `$BTD minting is capped at ${state.maxSupply.toLocaleString()} measured non-fungible shares.`,
    );
  }

  return totalMintedAfter;
}

export function advanceBtdSupply(
  state: BtdSupplyState,
  tokenCount: number,
  exchangeSequence?: bigint,
): BtdSupplyState {
  const totalMintedAfter = assertCanMintBtdRange(state, tokenCount);

  return {
    ...state,
    totalMinted: totalMintedAfter,
    nextTokenId: totalMintedAfter,
    exhaustedAtExchangeSequence:
      totalMintedAfter === state.maxSupply
        ? exchangeSequence ?? state.exhaustedAtExchangeSequence
        : state.exhaustedAtExchangeSequence,
  };
}
