import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry strategy for Create Design Document agent with execution state awareness"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_context_utilization", "test": "Does retry strategy maximize context value?", "score": 0.36 },
 *   { "name": "retry_state_preservation", "test": "Does retry strategy maintain execution continuity?", "score": 0.35 },
 *   { "name": "retry_intelligence_accumulation", "test": "Does retry strategy build on accumulated wisdom?", "score": 0.34 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENT_RETRY_STRATEGY: PromptPart = 
  'Implement recovery using context preservation: reconstruct from comprehension artifacts, leverage partial specifications, reference template patterns, apply team feedback history, utilize cached analysis data, maintain requirement traceability through context' as PromptPart;