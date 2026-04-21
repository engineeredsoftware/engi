/*
 * Lightweight unit tests for critical `$BTD` maths and reservation logic.
 * **NOTE** – These tests use Jest’s fake timers and a stub Supabase client so
 * they never touch a real database.  They are intended as documentation as
 * much as validation – CI may stub `@bitcode/supabase` with a local fake.
 */

import {
  calculateLlmBtdDebit,
  MODEL_PRICING_USD_PER_MILLION,
  InsufficientBtdBalanceError,
} from '../src';

describe('calculateLlmBtdDebit', () => {
  const table: Array<[
    model: string,
    input: number,
    output: number,
    expectedBtd: number,
  ]> = [
    ['gpt-3.5-turbo', 1000, 0, 1],
    ['gpt-3.5-turbo', 1000000, 0, 5],
    ['claude-3-opus', 0, 2000000, 1500],
  ];

  it.each(table)('%s in=%i out=%i', (model, input, output, expected) => {
    const { btdAmount } = calculateLlmBtdDebit(model, { inputTokens: input, outputTokens: output });
    expect(btdAmount).toBe(expected);
  });

  it('throws on unknown model', () => {
    expect(() =>
      calculateLlmBtdDebit('unknown-model', { inputTokens: 10, outputTokens: 10 }),
    ).toThrow();
  });
});

// -------------------------------------------------------------------------
// Example InsufficientBtdBalanceError usage – purely illustrative.
// -------------------------------------------------------------------------

describe('InsufficientBtdBalanceError', () => {
  it('has code=INSUFFICIENT_BTD_BALANCE', () => {
    const err = new InsufficientBtdBalanceError('nope');
    expect(err.code).toBe('INSUFFICIENT_BTD_BALANCE');
  });
});
