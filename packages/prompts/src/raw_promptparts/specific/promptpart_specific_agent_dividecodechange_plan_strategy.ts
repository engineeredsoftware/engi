import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Divide Code Change agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan strategy enable effective execution?", "score": 0.50 },
 *   { "name": "plan_precision", "test": "Is plan strategy precisely defined?", "score": 0.50 },
 *   { "name": "plan_completeness", "test": "Is plan strategy comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_PLAN_STRATEGY: PromptPart = 
  'Plan division strategy by determining: decomposition granularity criteria, dependency analysis methodology, parallelization opportunities, risk assessment for each file, complexity estimation algorithms, execution ordering constraints' as PromptPart;