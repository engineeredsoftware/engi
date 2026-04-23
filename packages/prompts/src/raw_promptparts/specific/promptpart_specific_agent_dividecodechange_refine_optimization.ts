import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine optimization for Divide Code Change agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Does refine optimization enable effective execution?", "score": 0.50 },
 *   { "name": "refine_precision", "test": "Is refine optimization precisely defined?", "score": 0.50 },
 *   { "name": "refine_completeness", "test": "Is refine optimization comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_REFINE_OPTIMIZATION: PromptPart = 
  'Refine division by: rebalancing workload distribution, optimizing dependency chains, reducing coupling points, improving parallelization potential, adjusting complexity estimates, enhancing execution order' as PromptPart;