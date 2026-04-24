import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry strategy for Add Design Document Review agent with execution state awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_context_utilization", "test": "Does retry strategy maximize context value?", "score": 0.36 },
 *   { "name": "retry_state_preservation", "test": "Does retry strategy maintain execution continuity?", "score": 0.35 },
 *   { "name": "retry_intelligence_accumulation", "test": "Does retry strategy build on accumulated wisdom?", "score": 0.34 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ADDDESIGNDOCUMENTREVIEW_RETRY_STRATEGY: PromptPart = 
  'Implement recovery preserving discussion context: reconstruct from conversation history, leverage previous comment attempts, reference accumulated feedback patterns, apply team communication preferences, utilize cached analysis results, maintain discussion thread continuity' as PromptPart;