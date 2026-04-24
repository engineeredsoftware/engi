import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Section label for patterns and best practices in Digest Code Styles prompt"
 * current_version: "V26.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "label_precision", "test": "Does it describe abstractions/error handling/logging/tests/API patterns? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_PATTERNS_LABEL: PromptPart =
  'Patterns & Best Practices: Common abstractions, error handling, logging, tests, API route patterns.' as PromptPart;
