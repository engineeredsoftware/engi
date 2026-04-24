import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry strategy for Finalize Shipment agent with execution state awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_context_utilization", "test": "Does retry strategy maximize context value?", "score": 0.36 },
 *   { "name": "retry_state_preservation", "test": "Does retry strategy maintain execution continuity?", "score": 0.35 },
 *   { "name": "retry_intelligence_accumulation", "test": "Does retry strategy build on accumulated wisdom?", "score": 0.34 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FINALIZESHIPMENT_RETRY_STRATEGY: PromptPart = 
  'Implement recovery using pipeline history: restore from deployment checkpoints, leverage validation cache for confirmation, reference execution history for state, apply learned patterns for resolution, utilize accumulated wisdom for decisions, maintain pipeline continuity through recovery' as PromptPart;