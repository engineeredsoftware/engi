import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Correct Code Change agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan strategy enable effective execution?", "score": 0.50 },
 *   { "name": "plan_precision", "test": "Is plan strategy precisely defined?", "score": 0.50 },
 *   { "name": "plan_completeness", "test": "Is plan strategy comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_PLAN_STRATEGY: PromptPart = 
  'Plan correction strategy by determining: validation sequence ordering, test execution priorities, correction application methods, rollback checkpoints, success criteria thresholds, certification requirements' as PromptPart;