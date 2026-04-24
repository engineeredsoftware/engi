import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define RETRY step strategy for Ready to Iterate agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "recovery_coverage", "test": "Does it cover recovery scenarios?", "score": 0.33 },
 *   { "name": "strategy_adaptability", "test": "Are strategies adaptive?", "score": 0.32 },
 *   { "name": "fallback_robustness", "test": "Are fallbacks robust?", "score": 0.31 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOITERATE_RETRY_STRATEGY: PromptPart = 
  'Implement recovery strategies including: partial readiness with warnings, conditional continuation paths, resource acquisition attempts, dependency resolution retries, state repair procedures, alternative iteration modes' as PromptPart;