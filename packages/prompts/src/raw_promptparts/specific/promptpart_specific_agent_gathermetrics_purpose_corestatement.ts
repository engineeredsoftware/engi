import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of gather metrics agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "metric_completeness", "test": "Gathers all relevant metrics?", "score": 0.95 },
 *   { "name": "accuracy", "test": "Accurate metric calculation?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_GATHERMETRICS_PURPOSE_CORESTATEMENT: PromptPart = 
  'Collect comprehensive pipeline metrics including execution times, agent performance, resource usage, and quality scores across all phases' as PromptPart;