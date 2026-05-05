/**
 * `$BTD` wallet-read and measurement utilities.
 *
 * V26 treats `$BTD` as a non-fungible AssetPack share/read-right and measured
 * Bitcode content amount. It is not a fungible fee token. BTC pays fees.
 *
 * The persistence schema still exposes the historical `user_credits` table as
 * a storage carrier for aggregate read posture until the schema is re-cut, but
 * this package must not mutate that table as a credit bucket.
 */

import { supabaseAdmin } from '@bitcode/supabase';
import { getUsdPricingForApiModel } from '@bitcode/models/src/pricing';

export const BTD_ASSET_SEMANTICS = 'non_fungible_asset_pack_share_read_right' as const;
export const BITCODE_FEE_ASSET = 'BTC' as const;

export interface GenerationTokens {
  inputTokens: number;
  outputTokens: number;
}

export interface BtdHoldingRead {
  userId: string;
  btdBalance: number;
  semantics: typeof BTD_ASSET_SEMANTICS;
  source: 'wallet_read' | 'storage_read';
}

export interface BtcFeeEstimate {
  feeAsset: typeof BITCODE_FEE_ASSET;
  btcFeesPaid: number | null;
  btcFeeUsdEquivalent: number;
  feeStatus: 'estimated' | 'wallet_settled';
}

/**
 * Raised when a caller attempts to use `$BTD` as a fungible credit/debit token.
 */
export class BtdFungibleMutationRejectedError extends Error {
  public readonly code = 'BTD_IS_NON_FUNGIBLE';

  constructor(message = '$BTD is a non-fungible AssetPack share/read-right, not a spendable credit balance.') {
    super(message);
    this.name = 'BtdFungibleMutationRejectedError';
  }
}

export async function getBtdBalance(userId: string): Promise<number> {
  const { data, error } = await supabaseAdmin
    .from('user_credits')
    .select('balance')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Error fetching BTD holdings for user ${userId}: ${error.message}`);
  }

  return typeof data?.balance === 'number' ? data.balance : 0;
}

export const getBalance = getBtdBalance;

export async function readBtdHoldings(userId: string): Promise<BtdHoldingRead> {
  return {
    userId,
    btdBalance: await getBtdBalance(userId),
    semantics: BTD_ASSET_SEMANTICS,
    source: 'storage_read',
  };
}

export function rejectFungibleBtdMutation(): never {
  throw new BtdFungibleMutationRejectedError();
}

/** Rough estimate tokens from text (approximately four characters per token). */
export function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

/**
 * Computes the BTC-fee basis for a given generation.
 *
 * V26 has enough local information to calculate the USD-equivalent model cost.
 * The actual BTC payment transaction belongs to wallet/settlement surfaces, so
 * `btcFeesPaid` remains null until a wallet-settled value is supplied.
 * Extend `@bitcode/models` pricing when Bitcode supports new models or vendors.
 */
export function calculateLlmBtcFeeEstimate(
  model: string,
  tokens: GenerationTokens,
): BtcFeeEstimate {
  const pricing = getUsdPricingForApiModel(model);
  if (!pricing) {
    throw new Error(`Unsupported / unknown model for BTC fee calculation: ${model}`);
  }

  const usd =
    (tokens.inputTokens * pricing.input + tokens.outputTokens * pricing.output) / 1_000_000;

  return {
    feeAsset: BITCODE_FEE_ASSET,
    btcFeesPaid: null,
    btcFeeUsdEquivalent: Number(usd.toFixed(6)),
    feeStatus: 'estimated',
  };
}

export function calculateMeasuredBtdFromTokens(tokens: GenerationTokens): number {
  const total = Math.max(0, tokens.inputTokens) + Math.max(0, tokens.outputTokens);
  return Math.max(1, Math.ceil(total / 1000));
}

export function buildGenerationBitcodeAccounting(
  model: string,
  tokens: GenerationTokens,
): BtcFeeEstimate & {
  measuredBtd: number;
  btdSemantics: typeof BTD_ASSET_SEMANTICS;
} {
  return {
    ...calculateLlmBtcFeeEstimate(model, tokens),
    measuredBtd: calculateMeasuredBtdFromTokens(tokens),
    btdSemantics: BTD_ASSET_SEMANTICS,
  };
}

export * from './plans';
