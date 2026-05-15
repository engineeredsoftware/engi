/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode read-synthesis web search query analysis"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "query_read_alignment", "test": "Requires queries to be derived from Bitcode read context", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_PLAN_QUERY_ANALYSIS: PromptPart =
  'Analyze the Bitcode read, proof gap, interface constraint, or AssetPack planning question first; derive only the web queries needed to resolve external source context for discovery-phase read synthesis.' as PromptPart;
