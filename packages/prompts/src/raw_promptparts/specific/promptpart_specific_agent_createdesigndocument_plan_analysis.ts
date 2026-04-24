import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Create Design Document agent with execution state awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_context_utilization", "test": "Does plan analysis maximize context value?", "score": 0.40 },
 *   { "name": "plan_state_preservation", "test": "Does plan analysis maintain execution continuity?", "score": 0.39 },
 *   { "name": "plan_intelligence_accumulation", "test": "Does plan analysis build on accumulated wisdom?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENT_PLAN_ANALYSIS: PromptPart = 
  'Analyze context to inform issue creation: requirement patterns from comprehension phase, feasibility constraints from technical analysis, risk factors from complexity assessment, dependency chains from architectural review, success patterns from historical issues, team preferences from collaboration data' as PromptPart;