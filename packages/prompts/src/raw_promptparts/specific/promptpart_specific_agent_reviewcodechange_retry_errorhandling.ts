import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Review Code Change agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry errorhandling enable effective execution?", "score": 0.50 },
 *   { "name": "retry_precision", "test": "Is retry errorhandling precisely defined?", "score": 0.50 },
 *   { "name": "retry_completeness", "test": "Is retry errorhandling comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_REVIEWCODECHANGE_RETRY_ERRORHANDLING: PromptPart = 
  'Handle review failures through: incomplete diff handling, large PR chunking, timeout management, tool failure recovery, access permission resolution, partial review compilation' as PromptPart;