import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Create Design Document agent with execution state awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_context_utilization", "test": "Does plan strategy maximize context value?", "score": 0.41 },
 *   { "name": "plan_state_preservation", "test": "Does plan strategy maintain execution continuity?", "score": 0.40 },
 *   { "name": "plan_intelligence_accumulation", "test": "Does plan strategy build on accumulated wisdom?", "score": 0.39 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENT_PLAN_STRATEGY: PromptPart = 
  'Plan issue creation from context understanding: structure template from project patterns, organize requirements from comprehension results, prioritize acceptance criteria from validation insights, determine milestone alignment from roadmap context, select labels from classification patterns, establish assignment from team topology' as PromptPart;