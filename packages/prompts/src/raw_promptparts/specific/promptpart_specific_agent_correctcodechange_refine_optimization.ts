import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine optimization for Correct Code Change agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Does refine optimization enable effective execution?", "score": 0.50 },
 *   { "name": "refine_precision", "test": "Is refine optimization precisely defined?", "score": 0.50 },
 *   { "name": "refine_completeness", "test": "Is refine optimization comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_REFINE_OPTIMIZATION: PromptPart = 
  'Refine corrections by: minimizing change footprint, optimizing performance impacts, improving code quality metrics, enhancing test coverage, strengthening error handling, consolidating corrections' as PromptPart;