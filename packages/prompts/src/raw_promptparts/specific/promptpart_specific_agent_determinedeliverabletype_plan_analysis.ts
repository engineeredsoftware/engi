import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode compatibility PromptPart for analyzing delivery-mechanism template needs"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "analysis_depth", "test": "Does it enable deep analysis?", "score": 0.37 },
 *   { "name": "context_extraction", "test": "Does it extract relevant context?", "score": 0.36 },
 *   { "name": "requirement_identification", "test": "Are requirements identified?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_PLAN_ANALYSIS: PromptPart = 
  'Analyze request context for Bitcode delivery-mechanism planning: expressed Need, AssetPack scope, destination hints, Shippable form requested by the operator, source and attachment evidence, repository constraints, and proof or receipt requirements' as PromptPart;
