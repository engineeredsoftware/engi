import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Create Code Change agent with execution state awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_context_utilization", "test": "Does plan analysis maximize context value?", "score": 0.40 },
 *   { "name": "plan_state_preservation", "test": "Does plan analysis maintain execution continuity?", "score": 0.39 },
 *   { "name": "plan_intelligence_accumulation", "test": "Does plan analysis build on accumulated wisdom?", "score": 0.38 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATECODECHANGE_PLAN_ANALYSIS: PromptPart = 
  'Analyze accumulated context to identify: implementation patterns from conquest phase, validation insights from test results, architectural impacts from file changes, performance implications from benchmarks, security considerations from danger wall, integration points from dependency analysis' as PromptPart;