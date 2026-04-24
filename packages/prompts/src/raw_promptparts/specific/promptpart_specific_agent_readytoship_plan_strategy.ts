import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Ready to Ship agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan strategy ensure production quality?", "score": 0.39 },
 *   { "name": "plan_reliability", "test": "Is plan strategy consistently reliable?", "score": 0.38 },
 *   { "name": "plan_completeness", "test": "Does plan strategy cover edge cases?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIP_PLAN_STRATEGY: PromptPart = 
  'Plan shipping-readiness orchestration by determining: validation aggregation method, risk assessment framework, written-asset readiness criteria, operational checklist, rollback validation requirements, decision matrix, and shipping authorization protocol' as PromptPart;
