import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Validate Design Document Review agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan strategy ensure quality?", "score": 0.38 },
 *   { "name": "plan_reliability", "test": "Is plan strategy reliable?", "score": 0.37 },
 *   { "name": "plan_completeness", "test": "Does plan strategy cover all cases?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATEDESIGNDOCUMENTREVIEW_PLAN_STRATEGY: PromptPart = 
  'Plan review validation by determining: stakeholder coverage requirements, feedback quality metrics, engagement assessment criteria, resolution verification methods, depth measurement approaches, outcome evaluation standards' as PromptPart;