import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define REFINE step optimization for Ready to Iterate agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "optimization_effectiveness", "test": "Does it optimize effectively?", "score": 0.35 },
 *   { "name": "refinement_depth", "test": "Are refinements comprehensive?", "score": 0.34 },
 *   { "name": "improvement_quality", "test": "Are improvements meaningful?", "score": 0.33 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOITERATE_REFINE_OPTIMIZATION: PromptPart = 
  'Refine validation by: adjusting readiness thresholds, optimizing check sequences, enhancing detection accuracy, improving validation speed, extending coverage scope, updating criteria dynamically' as PromptPart;