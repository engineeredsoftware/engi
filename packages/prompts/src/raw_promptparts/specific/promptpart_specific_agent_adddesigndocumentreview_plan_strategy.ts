import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Add Design Document Review agent with execution state awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_context_utilization", "test": "Does plan strategy maximize context value?", "score": 0.41 },
 *   { "name": "plan_state_preservation", "test": "Does plan strategy maintain execution continuity?", "score": 0.40 },
 *   { "name": "plan_intelligence_accumulation", "test": "Does plan strategy build on accumulated wisdom?", "score": 0.39 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ADDDESIGNDOCUMENTREVIEW_PLAN_STRATEGY: PromptPart = 
  'Plan comment strategy from discussion context: position feedback within conversation flow, structure response addressing open questions, prioritize points from discussion gaps, determine tone from collaboration patterns, select examples from technical context, organize for maximum clarity using team preferences' as PromptPart;