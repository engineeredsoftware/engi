import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode compatibility PromptPart for refining delivery-mechanism template selection"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "optimization_effectiveness", "test": "Does it optimize effectively?", "score": 0.35 },
 *   { "name": "refinement_depth", "test": "Are refinements comprehensive?", "score": 0.34 },
 *   { "name": "improvement_quality", "test": "Are improvements meaningful?", "score": 0.33 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_REFINE_OPTIMIZATION: PromptPart = 
  'Refine delivery-mechanism selection by cross-validating destination hints, resolving ambiguous Shippable requests, tightening receipt fields, separating AssetPack synthesis from delivery, adjusting confidence thresholds, and recording manual-review triggers' as PromptPart;
