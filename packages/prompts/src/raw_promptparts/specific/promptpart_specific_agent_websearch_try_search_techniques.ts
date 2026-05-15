/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode read-synthesis web search techniques"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "technique_boundary", "test": "Techniques stay source-first and bounded", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_TRY_SEARCH_TECHNIQUES: PromptPart =
  'Use source-class filters, official-domain queries, date constraints, exact phrase checks, and URL content retrieval only when they improve traceable evidence for the current Bitcode read-synthesis question.' as PromptPart;
