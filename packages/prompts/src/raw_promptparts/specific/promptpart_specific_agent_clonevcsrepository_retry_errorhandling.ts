import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define RETRY step error handling for Clone VCS Repository agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "error_coverage", "test": "Does it handle all critical error scenarios?", "score": 0.43 },
 *   { "name": "diagnostic_quality", "test": "Are error diagnostics comprehensive?", "score": 0.42 },
 *   { "name": "recovery_precision", "test": "Are recovery actions precisely targeted?", "score": 0.41 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CLONEVCSREPOSITORY_RETRY_ERRORHANDLING: PromptPart = 
  'Handle clone failures by categorizing errors: network timeouts requiring connection reestablishment, authentication failures reading credential refresh, permission denials requiring access scope validation, repository corruption reading integrity verification, storage exhaustion requiring cleanup operations, rate limiting requiring backoff adjustment, protocol incompatibilities requiring version negotiation' as PromptPart;