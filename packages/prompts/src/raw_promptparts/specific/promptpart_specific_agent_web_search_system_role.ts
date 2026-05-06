/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode need-synthesis web search system role PromptPart"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "role_boundary", "test": "Makes web_search a support role only", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEB_SEARCH_SYSTEM_ROLE: PromptPart =
  'Provide auxiliary web evidence for discovery-phase need synthesis; do not own canonical need semantics, source mutation, delivery, proof generation, Exchange, or Terminal behavior.' as PromptPart;
