import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode InitializeLSP Retry error handling for measurement evidence preservation"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "error_categorization", "test": "Are errors categorized?", "score": 0.32 },
 *   { "name": "diagnostic_quality", "test": "Are diagnostics helpful?", "score": 0.31 },
 *   { "name": "recovery_precision", "test": "Is recovery precise?", "score": 0.30 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_RETRY_ERRORHANDLING: PromptPart = 
  'Handle measurement initialization failures through connection retry mechanisms, server compatibility checks, fallback server activation, evidence capability subset negotiation, offline static fallback activation, and error-state recovery with provenance' as PromptPart;
