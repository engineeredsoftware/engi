import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode InitializeLSP Retry strategy for proofable measurement fallback"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "recovery_coverage", "test": "Does it cover recovery scenarios?", "score": 0.33 },
 *   { "name": "strategy_adaptability", "test": "Are strategies adaptive?", "score": 0.32 },
 *   { "name": "fallback_robustness", "test": "Are fallbacks robust?", "score": 0.31 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_RETRY_STRATEGY: PromptPart = 
  'Implement measurement recovery with server restart backoff, alternative server selection, reduced evidence capability modes, connection pooling, session restoration, and explicit proofable degradation paths' as PromptPart;
