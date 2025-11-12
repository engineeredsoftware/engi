import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Add Design Document Review agent with execution state awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_context_utilization", "test": "Does try execution maximize context value?", "score": 0.39 },
 *   { "name": "try_state_preservation", "test": "Does try execution maintain execution continuity?", "score": 0.38 },
 *   { "name": "try_intelligence_accumulation", "test": "Does try execution build on accumulated wisdom?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ADDDESIGNDOCUMENTREVIEW_TRY_DIRECTIVES: PromptPart = 
  'Execute comment with context awareness: compose response referencing discussion history, address specific concerns with analysis data, provide suggestions based on feasibility findings, cite examples from technical context, acknowledge previous contributions explicitly, advance discussion with new insights from accumulated knowledge, maintain collaborative tone from team patterns' as PromptPart;