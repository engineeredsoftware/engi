import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define RETRY step error handling for Determine Deliverable Type agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "error_categorization", "test": "Are errors categorized?", "score": 0.32 },
 *   { "name": "diagnostic_quality", "test": "Are diagnostics helpful?", "score": 0.31 },
 *   { "name": "recovery_precision", "test": "Is recovery precise?", "score": 0.30 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_RETRY_ERRORHANDLING: PromptPart = 
  'Handle determination failures through: ambiguous type flagging with options, partial type assignment with constraints, type negotiation protocols, classification confidence reporting, manual override mechanisms, type evolution handling' as PromptPart;