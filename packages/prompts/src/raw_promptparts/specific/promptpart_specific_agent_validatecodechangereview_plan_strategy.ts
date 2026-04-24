import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Validate Code Change Review agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan strategy ensure production quality?", "score": 0.39 },
 *   { "name": "plan_reliability", "test": "Is plan strategy consistently reliable?", "score": 0.38 },
 *   { "name": "plan_completeness", "test": "Does plan strategy cover edge cases?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATECODECHANGEREVIEW_PLAN_STRATEGY: PromptPart = 
  'Plan review validation by determining: coverage assessment criteria, feedback quality metrics, compliance checkpoints, depth measurement methods, tone analysis approach, completeness indicators' as PromptPart;