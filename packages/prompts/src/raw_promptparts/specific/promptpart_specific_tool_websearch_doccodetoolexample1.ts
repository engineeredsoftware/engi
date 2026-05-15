/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode read-synthesis web search basic example"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_example", "test": "Example searches for a Bitcode read-synthesis question", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLEXAMPLE1: PromptPart =
  'Example 1 - Bitcode source search: search({ query: "official protocol documentation settlement finality proof requirements", options: { limit: 10, sourceScope: "primary-first" } })' as PromptPart;
