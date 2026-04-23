import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Ready to Ship Code Change agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan strategy ensure production quality?", "score": 0.39 },
 *   { "name": "plan_reliability", "test": "Is plan strategy consistently reliable?", "score": 0.38 },
 *   { "name": "plan_completeness", "test": "Does plan strategy cover edge cases?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPCODECHANGE_PLAN_STRATEGY: PromptPart = 
  'Plan code written-asset readiness assessment by determining: certification checklist items, go/no-go criteria, risk assessment factors, rollback validation requirements, documentation standards, and shipping sign-off procedures' as PromptPart;
