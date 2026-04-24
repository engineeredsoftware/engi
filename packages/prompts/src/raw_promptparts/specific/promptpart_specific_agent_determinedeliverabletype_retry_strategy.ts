import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode compatibility PromptPart for retrying delivery-mechanism selection"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "recovery_coverage", "test": "Does it cover recovery scenarios?", "score": 0.33 },
 *   { "name": "strategy_adaptability", "test": "Are strategies adaptive?", "score": 0.32 },
 *   { "name": "fallback_robustness", "test": "Are fallbacks robust?", "score": 0.31 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_RETRY_STRATEGY: PromptPart = 
  'Implement recovery strategies for delivery-mechanism selection: fall back to evidence-only Finish, ask for destination clarification, compare requested Shippables against supported connected interfaces, require manual confirmation for writes, and preserve AssetPack evidence when delivery remains unresolved' as PromptPart;
