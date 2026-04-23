/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode need-synthesis web search system instructions compatibility PromptPart"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_precision", "test": "Requires source attribution and proof-boundary warnings", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEB_SEARCH_SYSTEM_INSTRUCTIONS: PromptPart =
  'Search only for the declared Bitcode need or proof gap, preserve source attribution, prefer authoritative sources, identify volatility, and return unresolved gaps instead of claiming proof closure.' as PromptPart;
