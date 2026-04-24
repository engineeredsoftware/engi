import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine optimization for Plan Implementation agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Is refine optimization effective?", "score": 0.32 },
 *   { "name": "refine_clarity", "test": "Is refine optimization clear?", "score": 0.31 },
 *   { "name": "refine_completeness", "test": "Is refine optimization complete?", "score": 0.30 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_PLANIMPLEMENTATION_REFINE_OPTIMIZATION: PromptPart = 
  'Refine implementation plan by: optimizing task sequences, adjusting estimates, mitigating risks, improving architecture, clarifying milestones, enhancing strategies' as PromptPart;