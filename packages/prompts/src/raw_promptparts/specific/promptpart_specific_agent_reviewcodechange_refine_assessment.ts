import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine assessment for Review Code Change agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Does refine assessment enable effective execution?", "score": 0.50 },
 *   { "name": "refine_precision", "test": "Is refine assessment precisely defined?", "score": 0.50 },
 *   { "name": "refine_completeness", "test": "Is refine assessment comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_REVIEWCODECHANGE_REFINE_ASSESSMENT: PromptPart = 
  'Assess review quality by evaluating: issue detection accuracy, feedback actionability scores, false positive rates, coverage completeness, suggestion value metrics, review thoroughness indicators' as PromptPart;