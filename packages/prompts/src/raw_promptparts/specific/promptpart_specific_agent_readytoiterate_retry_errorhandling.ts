import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define RETRY step error handling for Ready to Iterate agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "error_categorization", "test": "Are errors categorized?", "score": 0.32 },
 *   { "name": "diagnostic_quality", "test": "Are diagnostics helpful?", "score": 0.31 },
 *   { "name": "recovery_precision", "test": "Is recovery precise?", "score": 0.30 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOITERATE_RETRY_ERRORHANDLING: PromptPart = 
  'Handle validation failures through: blocking reason documentation, prerequisite completion guidance, resource acquisition queuing, dependency resolution assistance, state recovery procedures, iteration deferral protocols' as PromptPart;