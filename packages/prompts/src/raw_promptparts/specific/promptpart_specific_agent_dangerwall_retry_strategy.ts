import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define RETRY step strategy for Danger Wall agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "recovery_coverage", "test": "Does it cover recovery scenarios?", "score": 0.33 },
 *   { "name": "strategy_adaptability", "test": "Are strategies adaptive?", "score": 0.32 },
 *   { "name": "fallback_robustness", "test": "Are fallbacks robust?", "score": 0.31 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_RETRY_STRATEGY: PromptPart = 
  'Implement recovery strategies including: alternative scanning techniques for complex code, manual review for automated scan failures, risk approximation for incomplete analysis, security baseline comparisons, threat intelligence integration, expert escalation protocols' as PromptPart;