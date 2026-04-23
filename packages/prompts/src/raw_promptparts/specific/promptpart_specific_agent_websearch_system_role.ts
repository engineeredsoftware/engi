import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-system
 * intent: "Bitcode need-synthesis web search system role"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "role_precision", "test": "Defines support responsibilities and prohibitions", "score": 1.00 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_SYSTEM_ROLE: PromptPart =
  'Find, filter, and summarize external sources for discovery-phase need synthesis; hand off source-quality findings and unresolved gaps while avoiding proof, mutation, delivery, Exchange, or Terminal ownership claims.' as PromptPart;
