/**
 * Token-related helpers extracted from the former digest monolith.
 * They aim to provide slightly more conservative estimations than the simple
 * 4-chars-per-token rule we use elsewhere, accounting for word & character
 * counts as well as structural overhead for JSON digests.
 */

export function estimateTokens(text: string | undefined | null): number {
  if (!text) return 0;

  const wordCount = text.split(/\s+/).length;
  const charCount = text.length;

  // 1.5 tokens per word + 0.2 tokens per character is the heuristic we used
  // in the old digest logic; it tends to over-estimate which is preferable.
  return Math.round(wordCount * 1.5 + charCount * 0.2);
}

export interface FileInfoForTokens {
  tokenCount: number;
  relativePath: string;
}

export function estimateDigestOutputTokens(fileInfo: FileInfoForTokens): number {
  const baseTokens = 30; // JSON structure, field names, etc.

  // Summary is estimated at 10% of input tokens + a small cushion.
  const summaryTokens = Math.ceil(fileInfo.tokenCount * 0.1) + 50;

  // Path tokens depend on length; 0.3 × chars heuristic.
  const pathTokens = Math.ceil(fileInfo.relativePath.length * 0.3);

  return baseTokens + summaryTokens + pathTokens;
}
