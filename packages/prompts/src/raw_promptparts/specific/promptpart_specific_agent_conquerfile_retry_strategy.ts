import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry strategy for Conquer File agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry strategy enable effective execution?", "score": 0.50 },
 *   { "name": "retry_precision", "test": "Is retry strategy precisely defined?", "score": 0.50 },
 *   { "name": "retry_completeness", "test": "Is retry strategy comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_RETRY_STRATEGY: PromptPart = 
  'Implement recovery strategies including: alternative modification approaches, incremental change application, rollback and retry mechanisms, manual intervention points, simplified transformations, compatibility mode operations' as PromptPart;