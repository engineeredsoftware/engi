import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine assessment for Divide Code Change agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Does refine assessment enable effective execution?", "score": 0.50 },
 *   { "name": "refine_precision", "test": "Is refine assessment precisely defined?", "score": 0.50 },
 *   { "name": "refine_completeness", "test": "Is refine assessment comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_REFINE_ASSESSMENT: PromptPart = 
  'Assess division quality by evaluating: coverage completeness metrics, dependency accuracy scores, parallelization efficiency ratios, complexity distribution balance, risk mitigation coverage, execution path optimality' as PromptPart;