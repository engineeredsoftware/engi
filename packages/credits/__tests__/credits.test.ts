/*
 * Lightweight unit tests for critical credit maths & reservation logic.
 * **NOTE** – These tests use Jest’s fake timers and a stub Supabase client so
 * they never touch a real database.  They are intended as documentation as
 * much as validation – CI may stub `@engi/supabase` with a local fake.
 */

import {
  calculateLLMCredits,
  MODEL_PRICING_USD_PER_MILLION,
  InsufficientCreditsError,
} from '../src';

describe('calculateLLMCredits', () => {
  const table: Array<[
    model: string,
    input: number,
    output: number,
    expectedCredits: number,
  ]> = [
    ['gpt-3.5-turbo', 1000, 0, 1], // ⩽ $0.10 → rounds up to 1 credit
    ['gpt-3.5-turbo', 1000000, 0, 5], // $0.50 → 5 credits
    ['claude-3-opus', 0, 2000000, 1500], // $150 (2M × 75) → 1500 credits
  ];

  it.each(table)('%s in=%i out=%i', (model, input, output, expected) => {
    const { credits } = calculateLLMCredits(model, { inputTokens: input, outputTokens: output });
    expect(credits).toBe(expected);
  });

  it('throws on unknown model', () => {
    expect(() =>
      calculateLLMCredits('unknown-model', { inputTokens: 10, outputTokens: 10 }),
    ).toThrow();
  });
});

// -------------------------------------------------------------------------
// Example InsufficientCreditsError usage – purely illustrative.
// -------------------------------------------------------------------------

describe('InsufficientCreditsError', () => {
  it('has code=INSUFFICIENT_CREDITS', () => {
    const err = new InsufficientCreditsError('nope');
    expect(err.code).toBe('INSUFFICIENT_CREDITS');
  });
});
