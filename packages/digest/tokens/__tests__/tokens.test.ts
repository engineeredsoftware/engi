import { describe, it, expect } from '@jest/globals';
import { estimateTokens, estimateDigestOutputTokens } from '../index';

describe('estimateTokens', () => {
  it('returns 0 for null or empty text', () => {
    expect(estimateTokens(null)).toBe(0);
    expect(estimateTokens(undefined)).toBe(0);
    expect(estimateTokens('')).toBe(0);
  });

  it('estimates tokens by word and character counts', () => {
    const text = 'one two three';
    const wordCount = 3;
    const charCount = text.length;
    const expected = Math.round(wordCount * 1.5 + charCount * 0.2);
    expect(estimateTokens(text)).toBe(expected);
  });
});

describe('estimateDigestOutputTokens', () => {
  it('calculates digest output tokens correctly', () => {
    const fileInfo = { tokenCount: 100, relativePath: 'path/to/file.txt' };
    const baseTokens = 30;
    const summaryTokens = Math.ceil(fileInfo.tokenCount * 0.1) + 50;
    const pathTokens = Math.ceil(fileInfo.relativePath.length * 0.3);
    const expected = baseTokens + summaryTokens + pathTokens;
    expect(estimateDigestOutputTokens(fileInfo)).toBe(expected);
  });
});
