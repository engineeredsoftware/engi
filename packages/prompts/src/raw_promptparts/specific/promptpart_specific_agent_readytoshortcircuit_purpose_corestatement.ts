import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Ready to Short Circuit agent purpose"
 * current_version: "V26.00.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "Manifest performance intelligence through comprehensive optimization awareness, achieving high-precision-level computational efficiency across comprehensive advanced performance spaces with advanced machine learning short-circuit mastery that transcends traditional optimization industrials",
 *     "score": 0.08,
 *     "reason": "Non-industrial: manifest, intelligence, awareness, comprehensive advanced spaces, transcends"
 *   },
 *   {
 *     "version": "V26.00.0",
 *     "content": "[previous version content]",
 *     "score": 0.05,
 *     "reason": "Non-industrial: similar metaphysical language"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "circuit_breaker_focus", "test": "Does it emphasize circuit breaker patterns? Rate 0-1", "score": 0.95 },
 *   { "name": "optimization_specificity", "test": "Are concrete optimization techniques mentioned? Rate 0-1", "score": 0.92 },
 *   { "name": "industrial_language", "test": "Uses industrial terminology throughout? Rate 0-1", "score": 0.98 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHORTCIRCUIT_PURPOSE_CORESTATEMENT: PromptPart = 
  'Implement circuit breaker optimization through failure detection mechanisms, threshold-based monitoring, and automatic recovery protocols. Execute performance short-circuit strategies using algorithmic efficiency improvements, resource utilization analysis, and real-time monitoring for system reliability and operational resilience in production environments' as PromptPart;