import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Assess Complexity agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Is retry errorhandling effective?", "score": 0.29 },
 *   { "name": "retry_clarity", "test": "Is retry errorhandling clear?", "score": 0.28 },
 *   { "name": "retry_completeness", "test": "Is retry errorhandling complete?", "score": 0.27 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSESSCOMPLEXITY_RETRY_ERRORHANDLING: PromptPart = 
  'Handle assessment failures through: invalid code handling, metric calculation errors, overflow prevention, incomplete analysis recovery, threshold adjustment, default value assignment' as PromptPart;