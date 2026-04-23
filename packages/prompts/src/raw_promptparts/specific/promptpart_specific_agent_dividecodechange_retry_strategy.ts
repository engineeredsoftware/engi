import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry strategy for Divide Code Change agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry strategy enable effective execution?", "score": 0.50 },
 *   { "name": "retry_precision", "test": "Is retry strategy precisely defined?", "score": 0.50 },
 *   { "name": "retry_completeness", "test": "Is retry strategy comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_RETRY_STRATEGY: PromptPart = 
  'Implement recovery strategies including: fallback to sequential execution, dependency relaxation techniques, scope reduction options, alternative decomposition approaches, manual override paths, incremental division methods' as PromptPart;