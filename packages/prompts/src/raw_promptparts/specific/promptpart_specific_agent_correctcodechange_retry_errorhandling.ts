import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Correct Code Change agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry errorhandling enable effective execution?", "score": 0.50 },
 *   { "name": "retry_precision", "test": "Is retry errorhandling precisely defined?", "score": 0.50 },
 *   { "name": "retry_completeness", "test": "Is retry errorhandling comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_RETRY_ERRORHANDLING: PromptPart = 
  'Handle correction failures through: test failure diagnosis, build error resolution, lint violation fixes, integration conflict handling, timeout management, resource exhaustion mitigation' as PromptPart;