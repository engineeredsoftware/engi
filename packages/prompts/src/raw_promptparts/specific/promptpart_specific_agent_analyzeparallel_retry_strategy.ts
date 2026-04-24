import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry strategy for Analyze Parallel agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Is retry strategy effective?", "score": 0.30 },
 *   { "name": "retry_clarity", "test": "Is retry strategy clear?", "score": 0.29 },
 *   { "name": "retry_completeness", "test": "Is retry strategy complete?", "score": 0.28 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZEPARALLEL_RETRY_STRATEGY: PromptPart = 
  'Implement recovery strategies including: worker restart on failure, partial result aggregation, sequential fallback modes, result reconciliation protocols, checkpoint restoration, adaptive parallelism adjustment' as PromptPart;