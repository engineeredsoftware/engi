/*
 * Compatibility bridge until all import paths are updated.
 * ------------------------------------------------------------------
 * Existing digest code expects two named exports from the
 * `@/digest/prompts/file-summaries-prompts` module:
 *   1. FILE_SUMMARIES_PROMPT
 *   2. FILE_SUMMARIES_TYPE_SPECIFIC_INSTRUCTIONS
 *
 * During the refactor the original definitions were moved to
 * `digest-prompts.js`.  To avoid touching a large number of call-sites we
 * simply re-export the constants from the new file here.
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {
  BATCH_SUMMARY_PROMPT,
  TYPE_SPECIFIC_INSTRUCTIONS,
} = require('./digest-prompts');

export const FILE_SUMMARIES_PROMPT: string = BATCH_SUMMARY_PROMPT;

export const FILE_SUMMARIES_TYPE_SPECIFIC_INSTRUCTIONS: Record<string, string> =
  TYPE_SPECIFIC_INSTRUCTIONS;
