import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-system
 * intent: "Bitcode need-synthesis web search system instructions"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_precision", "test": "Commands source attribution and proof-boundary warnings", "score": 1.00 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_SYSTEM_INSTRUCTIONS: PromptPart =
  'For each search, state the Bitcode need being supported, prefer authoritative sources, preserve source attribution, identify volatility and contradictions, and include proof-boundary warnings when evidence is auxiliary rather than canonical.' as PromptPart;
