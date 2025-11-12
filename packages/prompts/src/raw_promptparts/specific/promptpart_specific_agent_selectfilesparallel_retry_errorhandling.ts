import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Select Files Parallel agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Is retry errorhandling effective?", "score": 0.29 },
 *   { "name": "retry_clarity", "test": "Is retry errorhandling clear?", "score": 0.28 },
 *   { "name": "retry_completeness", "test": "Is retry errorhandling complete?", "score": 0.27 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SELECTFILESPARALLEL_RETRY_ERRORHANDLING: PromptPart = 
  'Handle selection failures through: scanner crash recovery, pattern error handling, timeout management, memory limitation mitigation, access permission resolution, incomplete scan recovery' as PromptPart;