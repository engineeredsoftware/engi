import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Ready to Ship Design Document agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan strategy ensure production quality?", "score": 0.39 },
 *   { "name": "plan_reliability", "test": "Is plan strategy consistently reliable?", "score": 0.38 },
 *   { "name": "plan_completeness", "test": "Does plan strategy cover edge cases?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPDESIGNDOCUMENT_PLAN_STRATEGY: PromptPart = 
  'Plan design certification by determining: completeness criteria, stakeholder approval matrix, technical review requirements, resource verification needs, risk assessment thresholds, timeline validation methods' as PromptPart;