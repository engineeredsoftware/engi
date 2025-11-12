import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define RETRY step error handling for Danger Wall agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "error_categorization", "test": "Are errors categorized?", "score": 0.32 },
 *   { "name": "diagnostic_quality", "test": "Are diagnostics helpful?", "score": 0.31 },
 *   { "name": "recovery_precision", "test": "Is recovery precise?", "score": 0.30 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_RETRY_ERRORHANDLING: PromptPart = 
  'Handle analysis failures through: partial scan result aggregation, false positive filtering and validation, scan timeout management with incremental processing, memory-safe scanning for large codebases, fallback to signature-based detection, manual security review triggers' as PromptPart;