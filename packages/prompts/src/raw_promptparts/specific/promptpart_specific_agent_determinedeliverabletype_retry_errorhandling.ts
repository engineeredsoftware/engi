import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode compatibility PromptPart for delivery-mechanism template retry handling"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "error_categorization", "test": "Are errors categorized?", "score": 0.32 },
 *   { "name": "diagnostic_quality", "test": "Are diagnostics helpful?", "score": 0.31 },
 *   { "name": "recovery_precision", "test": "Is recovery precise?", "score": 0.30 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_RETRY_ERRORHANDLING: PromptPart = 
  'Handle delivery-mechanism selection failures through ambiguity flags, explicit operator clarification, safe no-delivery defaults, confidence reporting, destination constraint disclosure, and manual-review handoff without changing the canonical AssetPack synthesis kind' as PromptPart;
