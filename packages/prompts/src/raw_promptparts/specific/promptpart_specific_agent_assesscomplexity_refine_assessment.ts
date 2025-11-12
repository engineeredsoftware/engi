import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine assessment for Assess Complexity agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Is refine assessment effective?", "score": 0.31 },
 *   { "name": "refine_clarity", "test": "Is refine assessment clear?", "score": 0.30 },
 *   { "name": "refine_completeness", "test": "Is refine assessment complete?", "score": 0.29 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSESSCOMPLEXITY_REFINE_ASSESSMENT: PromptPart = 
  'Assess measurement quality by evaluating: metric reliability scores, correlation coefficients, prediction accuracy, threshold effectiveness, coverage completeness, insight value' as PromptPart;