import {
  BTD_MAX_MINTABLE_SUPPLY,
  BtdTokenId,
  assertNonEmptyString,
  assertPositiveBigInt,
  toBigIntAmount,
} from './constants';
import { SemanticVolumeMeasurementReceipt } from './semantic-volume';

export type BtdMeasureMintCurve = 'hyperbolic_saturation';
export type BtdMeasureMintTailPolicy = 'zero_cell_receipt_then_refit_only';
export type BtdZeroCellReason =
  | 'below_integer_threshold'
  | 'tail_exhausted'
  | 'refit_only_policy';

export interface BtdMeasureMintState {
  maxSupply: typeof BTD_MAX_MINTABLE_SUPPLY;
  totalMinted: number;
  nextTokenId: BtdTokenId;
  cumulativeAdmittedMeasurement: bigint;
  residualMintCredit: bigint;
  curve: BtdMeasureMintCurve;
  curveParameter: bigint;
  tailPolicy: BtdMeasureMintTailPolicy;
}

export interface BtdMeasureMintReceipt {
  kind: 'btd.measure_mint';
  assetPackId: string;
  normalizedBitcodeVolume: bigint;
  cumulativeMeasurementBefore: bigint;
  cumulativeMeasurementAfter: bigint;
  targetMintedBefore: number;
  targetMintedAfter: number;
  residualMintCreditBefore: bigint;
  residualMintCreditAfter: bigint;
  tokenCount: number;
  rangeStart?: BtdTokenId;
  rangeEndExclusive?: BtdTokenId;
  zeroCellReason?: BtdZeroCellReason;
  totalMintedBefore: number;
  totalMintedAfter: number;
  maxSupply: typeof BTD_MAX_MINTABLE_SUPPLY;
  proofRoot: string;
  settlementJournalRoot: string;
  accessPolicyHash: string;
  exchangeSequence: bigint;
  issuedAt: string;
}

export interface BtdMeasureMintResult {
  previousState: BtdMeasureMintState;
  nextState: BtdMeasureMintState;
  receipt: BtdMeasureMintReceipt;
}

export function createBtdMeasureMintState(input?: {
  totalMinted?: number;
  nextTokenId?: BtdTokenId;
  cumulativeAdmittedMeasurement?: bigint | number | string;
  curveParameter?: bigint | number | string;
}): BtdMeasureMintState {
  const cumulativeAdmittedMeasurement = toBigIntAmount(
    input?.cumulativeAdmittedMeasurement ?? 0n,
    'cumulativeAdmittedMeasurement',
  );
  const curveParameter = toBigIntAmount(input?.curveParameter ?? 21_000_000n, 'curveParameter');
  assertPositiveBigInt(curveParameter, 'curveParameter');

  const totalMinted = input?.totalMinted ?? targetMintedHyperbolic(
    cumulativeAdmittedMeasurement,
    curveParameter,
  ).targetMinted;
  const nextTokenId = input?.nextTokenId ?? totalMinted;

  if (!Number.isSafeInteger(totalMinted) || totalMinted < 0) {
    throw new Error('totalMinted must be a non-negative safe integer.');
  }

  if (totalMinted > BTD_MAX_MINTABLE_SUPPLY) {
    throw new Error('totalMinted cannot exceed maxSupply.');
  }

  if (nextTokenId !== totalMinted) {
    throw new Error('V27 measureminting allocator requires nextTokenId to equal totalMinted.');
  }

  return {
    maxSupply: BTD_MAX_MINTABLE_SUPPLY,
    totalMinted,
    nextTokenId,
    cumulativeAdmittedMeasurement,
    residualMintCredit: targetMintedHyperbolic(
      cumulativeAdmittedMeasurement,
      curveParameter,
    ).residualMintCredit,
    curve: 'hyperbolic_saturation',
    curveParameter,
    tailPolicy: 'zero_cell_receipt_then_refit_only',
  };
}

export function applyBtdMeasureMint(input: {
  state: BtdMeasureMintState;
  assetPackId: string;
  semanticVolume: SemanticVolumeMeasurementReceipt | { normalizedBitcodeVolume: bigint };
  proofRoot: string;
  settlementJournalRoot: string;
  accessPolicyHash: string;
  exchangeSequence: bigint;
  issuedAt?: string;
}): BtdMeasureMintResult {
  const state = assertBtdMeasureMintState(input.state);
  const normalizedBitcodeVolume = toBigIntAmount(
    input.semanticVolume.normalizedBitcodeVolume,
    'normalizedBitcodeVolume',
  );

  if (normalizedBitcodeVolume <= 0n) {
    throw new Error('normalizedBitcodeVolume must be positive for measureminting.');
  }

  const before = targetMintedHyperbolic(
    state.cumulativeAdmittedMeasurement,
    state.curveParameter,
  );
  const cumulativeMeasurementAfter =
    state.cumulativeAdmittedMeasurement + normalizedBitcodeVolume;
  const after = targetMintedHyperbolic(cumulativeMeasurementAfter, state.curveParameter);
  const targetDelta = after.targetMinted - before.targetMinted;
  const availableCells = state.maxSupply - state.totalMinted;
  const tokenCount = Math.max(0, Math.min(targetDelta, availableCells));
  const totalMintedAfter = state.totalMinted + tokenCount;
  const rangeStart = tokenCount > 0 ? state.nextTokenId : undefined;
  const rangeEndExclusive = tokenCount > 0 ? state.nextTokenId + tokenCount : undefined;

  const nextState: BtdMeasureMintState = {
    ...state,
    totalMinted: totalMintedAfter,
    nextTokenId: totalMintedAfter,
    cumulativeAdmittedMeasurement: cumulativeMeasurementAfter,
    residualMintCredit: after.residualMintCredit,
  };

  return {
    previousState: state,
    nextState,
    receipt: {
      kind: 'btd.measure_mint',
      assetPackId: assertNonEmptyString(input.assetPackId, 'assetPackId'),
      normalizedBitcodeVolume,
      cumulativeMeasurementBefore: state.cumulativeAdmittedMeasurement,
      cumulativeMeasurementAfter,
      targetMintedBefore: before.targetMinted,
      targetMintedAfter: after.targetMinted,
      residualMintCreditBefore: state.residualMintCredit,
      residualMintCreditAfter: after.residualMintCredit,
      tokenCount,
      rangeStart,
      rangeEndExclusive,
      zeroCellReason: tokenCount === 0
        ? availableCells <= 0
          ? 'tail_exhausted'
          : 'below_integer_threshold'
        : undefined,
      totalMintedBefore: state.totalMinted,
      totalMintedAfter,
      maxSupply: BTD_MAX_MINTABLE_SUPPLY,
      proofRoot: assertNonEmptyString(input.proofRoot, 'proofRoot'),
      settlementJournalRoot: assertNonEmptyString(
        input.settlementJournalRoot,
        'settlementJournalRoot',
      ),
      accessPolicyHash: assertNonEmptyString(input.accessPolicyHash, 'accessPolicyHash'),
      exchangeSequence: input.exchangeSequence,
      issuedAt: input.issuedAt ?? new Date().toISOString(),
    },
  };
}

export function assertBtdMeasureMintState(state: BtdMeasureMintState): BtdMeasureMintState {
  if (state.maxSupply !== BTD_MAX_MINTABLE_SUPPLY) {
    throw new Error(`Measuremint maxSupply must be ${BTD_MAX_MINTABLE_SUPPLY}.`);
  }

  if (state.curve !== 'hyperbolic_saturation') {
    throw new Error('V27 implements hyperbolic_saturation measureminting only.');
  }

  if (state.tailPolicy !== 'zero_cell_receipt_then_refit_only') {
    throw new Error('V27 measureminting tail policy must be zero_cell_receipt_then_refit_only.');
  }

  assertPositiveBigInt(state.curveParameter, 'curveParameter');

  if (state.totalMinted < 0 || state.totalMinted > state.maxSupply) {
    throw new Error('Measuremint totalMinted is outside valid supply bounds.');
  }

  if (state.nextTokenId !== state.totalMinted) {
    throw new Error('V27 measureminting allocator requires nextTokenId to equal totalMinted.');
  }

  return state;
}

function targetMintedHyperbolic(
  cumulativeMeasurement: bigint,
  curveParameter: bigint,
): { targetMinted: number; residualMintCredit: bigint } {
  if (cumulativeMeasurement < 0n) {
    throw new Error('cumulativeMeasurement cannot be negative.');
  }

  assertPositiveBigInt(curveParameter, 'curveParameter');

  if (cumulativeMeasurement === 0n) {
    return { targetMinted: 0, residualMintCredit: 0n };
  }

  const denominator = cumulativeMeasurement + curveParameter;
  const numerator = BigInt(BTD_MAX_MINTABLE_SUPPLY) * cumulativeMeasurement;
  const targetMinted = numerator / denominator;

  if (targetMinted > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error('targetMinted exceeds JavaScript safe integer range.');
  }

  return {
    targetMinted: Number(targetMinted),
    residualMintCredit: numerator % denominator,
  };
}
