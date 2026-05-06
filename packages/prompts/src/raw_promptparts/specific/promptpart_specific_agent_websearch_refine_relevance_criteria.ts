/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode need-synthesis web search relevance criteria"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "relevance_precision", "test": "Defines relevance against need synthesis rather than generic search ranking", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_REFINE_RELEVANCE_CRITERIA: PromptPart =
  'Score relevance by direct connection to the active Bitcode need, proof-gap question, interface constraint, source authority, time-aware freshness, and usefulness to downstream AssetPack planning.' as PromptPart;
