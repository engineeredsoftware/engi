import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine assessment for Understand Requirements agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Is refine assessment effective?", "score": 0.31 },
 *   { "name": "refine_clarity", "test": "Is refine assessment clear?", "score": 0.30 },
 *   { "name": "refine_completeness", "test": "Is refine assessment complete?", "score": 0.29 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_UNDERSTANDREQUIREMENTS_REFINE_ASSESSMENT: PromptPart = 
  'Assess understanding quality by evaluating: extraction accuracy, completeness metrics, consistency scores, clarity indices, traceability coverage, validation rates' as PromptPart;