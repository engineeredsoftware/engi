/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode need-synthesis web search query analysis"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "query_need_alignment", "test": "Requires queries to be derived from Bitcode need context", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PLAN_QUERY_ANALYSIS: PromptPart =
  'Analyze the Bitcode need, proof gap, interface constraint, or AssetPack planning question first; derive only the web queries needed to resolve external source context for discovery-phase need synthesis.' as PromptPart;
