/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode need-synthesis web search constrained example"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "constraint_example", "test": "Example uses domain and date constraints for evidence quality", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLEXAMPLE2: PromptPart =
  'Example 2 - Constrained source search: search({ query: "asset pack delivery API pull request evidence requirements", options: { domainFilter: "docs.github.com", dateFilter: "year", limit: 8 } })' as PromptPart;
