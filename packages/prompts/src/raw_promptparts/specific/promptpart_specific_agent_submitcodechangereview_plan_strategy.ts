import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Submit Code Change Review agent with execution state awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_context_utilization", "test": "Does plan strategy maximize context value?", "score": 0.41 },
 *   { "name": "plan_state_preservation", "test": "Does plan strategy maintain execution continuity?", "score": 0.40 },
 *   { "name": "plan_intelligence_accumulation", "test": "Does plan strategy build on accumulated wisdom?", "score": 0.39 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SUBMITCODECHANGEREVIEW_PLAN_STRATEGY: PromptPart = 
  'Plan review submission using context insights: prioritize feedback from validation severity, structure comments using discovered patterns, determine approval stance from quality metrics, select examples from analysis artifacts, calibrate detail level from PR complexity, organize feedback using execution phases' as PromptPart;