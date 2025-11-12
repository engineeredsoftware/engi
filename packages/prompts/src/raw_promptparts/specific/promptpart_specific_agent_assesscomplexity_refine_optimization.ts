import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine optimization for Assess Complexity agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Is refine optimization effective?", "score": 0.32 },
 *   { "name": "refine_clarity", "test": "Is refine optimization clear?", "score": 0.31 },
 *   { "name": "refine_completeness", "test": "Is refine optimization complete?", "score": 0.30 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSESSCOMPLEXITY_REFINE_OPTIMIZATION: PromptPart = 
  'Refine assessment by: calibrating thresholds, improving metric accuracy, correlating multiple metrics, identifying patterns, enhancing visualizations, adjusting weights' as PromptPart;