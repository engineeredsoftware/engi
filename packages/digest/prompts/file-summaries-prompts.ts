/*
 * Stable file-summary prompt re-export.
 * ------------------------------------------------------------------
 * Existing digest code expects two named exports from the
 * `@/digest/prompts/file-summaries-prompts` module:
 *   1. FILE_SUMMARIES_PROMPT
 *   2. FILE_SUMMARIES_TYPE_SPECIFIC_INSTRUCTIONS
 *
 * The canonical definitions live in `digest-prompts.js`; this module keeps
 * the named prompt exports explicit for digest callers.
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {
  BATCH_SUMMARY_PROMPT,
  TYPE_SPECIFIC_INSTRUCTIONS,
} = require('./digest-prompts');

export const FILE_SUMMARIES_PROMPT: string = BATCH_SUMMARY_PROMPT;

export const FILE_SUMMARIES_TYPE_SPECIFIC_INSTRUCTIONS: Record<string, string> =
  TYPE_SPECIFIC_INSTRUCTIONS;
