import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Apply File agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry errorhandling enable effective execution?", "score": 0.50 },
 *   { "name": "retry_precision", "test": "Is retry errorhandling precisely defined?", "score": 0.50 },
 *   { "name": "retry_completeness", "test": "Is retry errorhandling comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_APPLYFILE_RETRY_ERRORHANDLING: PromptPart = 
  'Handle conquest failures through: syntax error correction, merge conflict resolution, encoding issue mitigation, permission error handling, size limitation management, corruption recovery procedures' as PromptPart;