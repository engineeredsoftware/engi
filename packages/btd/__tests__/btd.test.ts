/*
 * Lightweight unit tests for `$BTD` measurement and BTC fee-basis logic.
 * **NOTE** – These tests use Jest’s fake timers and a stub Supabase client so
 * they never touch a real database.  They are intended as documentation as
 * much as validation – CI may stub `@bitcode/supabase` with a local fake.
 */

import {
  BtdFungibleMutationRejectedError,
  BTD_MAX_MINTABLE_SUPPLY,
  BITCODE_FEE_ASSET,
  assertBtdMintableSupplyLimit,
  calculateLlmBtcFeeEstimate,
  calculateMeasuredBtdFromTokens,
} from '../src';

describe('calculateLlmBtcFeeEstimate', () => {
  const table: Array<[
    model: string,
    input: number,
    output: number,
    expectedUsd: number,
  ]> = [
    ['gemini-2.5-flash', 1000, 0, 0.00035],
    ['gemini-2.5-flash', 0, 1000, 0.0014],
    ['sonnet-4', 1_000_000, 0, 3],
  ];

  it.each(table)('%s in=%i out=%i', (model, input, output, expected) => {
    const estimate = calculateLlmBtcFeeEstimate(model, { inputTokens: input, outputTokens: output });
    expect(estimate.feeAsset).toBe(BITCODE_FEE_ASSET);
    expect(estimate.btcFeesPaid).toBeNull();
    expect(estimate.btcFeeUsdEquivalent).toBe(expected);
  });

  it('throws on unknown model', () => {
    expect(() =>
      calculateLlmBtcFeeEstimate('unknown-model', { inputTokens: 10, outputTokens: 10 }),
    ).toThrow();
  });
});

describe('calculateMeasuredBtdFromTokens', () => {
  it('measures content amount without implying spend', () => {
    expect(calculateMeasuredBtdFromTokens({ inputTokens: 1200, outputTokens: 50 })).toBe(2);
  });
});

describe('BTD mintable supply ceiling', () => {
  it('records the V27+ fixed measured BTD mint ceiling', () => {
    expect(BTD_MAX_MINTABLE_SUPPLY).toBe(21_000_000);
  });

  it('fails closed when a proposed mint would exceed the ceiling', () => {
    expect(assertBtdMintableSupplyLimit(20_999_999, 1)).toBe(21_000_000);
    expect(() => assertBtdMintableSupplyLimit(21_000_000, 1)).toThrow(/21,000,000/);
  });
});

describe('BtdFungibleMutationRejectedError', () => {
  it('makes fungible BTD mutation attempts fail closed', () => {
    const err = new BtdFungibleMutationRejectedError('nope');
    expect(err.code).toBe('BTD_IS_NON_FUNGIBLE');
  });
});
