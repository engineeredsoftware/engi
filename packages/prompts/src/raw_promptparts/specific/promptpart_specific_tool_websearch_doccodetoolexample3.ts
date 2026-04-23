/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode need-synthesis web search corroboration example"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "corroboration_example", "test": "Example requests provider corroboration for source coverage", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLEXAMPLE3: PromptPart =
  'Example 3 - Corroborated search: search({ query: "sidechain bridge proof verification current standard", options: { providers: ["exa", "semantic-scholar"], requirePrimarySources: true, limit: 12 } })' as PromptPart;
