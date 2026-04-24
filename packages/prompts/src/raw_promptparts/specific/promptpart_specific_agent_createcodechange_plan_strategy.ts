import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Create Code Change agent with execution state awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_context_utilization", "test": "Does plan strategy maximize context value?", "score": 0.41 },
 *   { "name": "plan_state_preservation", "test": "Does plan strategy maintain execution continuity?", "score": 0.40 },
 *   { "name": "plan_intelligence_accumulation", "test": "Does plan strategy build on accumulated wisdom?", "score": 0.39 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATECODECHANGE_PLAN_STRATEGY: PromptPart = 
  'Plan PR creation by examining execution state to determine: change narrative from implementation history, highlight extraction from conquest results, risk communication from validation findings, reviewer focus areas from complexity analysis, merge criteria from quality gates, commit message synthesis from file operations' as PromptPart;