import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Finalize Shipment agent with execution state awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_context_utilization", "test": "Does retry errorhandling maximize context value?", "score": 0.35 },
 *   { "name": "retry_state_preservation", "test": "Does retry errorhandling maintain execution continuity?", "score": 0.34 },
 *   { "name": "retry_intelligence_accumulation", "test": "Does retry errorhandling build on accumulated wisdom?", "score": 0.33 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FINALIZESHIPMENT_RETRY_ERRORHANDLING: PromptPart = 
  'Handle finalization failures with context preservation: recover from deployment errors using checkpoints, resolve issues with validation history, reconstruct state from execution artifacts, activate rollback using preserved context, maintain pipeline integrity through failure, leverage complete intelligence for resolution' as PromptPart;