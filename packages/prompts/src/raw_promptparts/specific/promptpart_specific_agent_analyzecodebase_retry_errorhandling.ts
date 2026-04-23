import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define RETRY step error handling for Analyze Codebase agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "error_categorization", "test": "Does it properly categorize analysis errors?", "score": 0.50 },
 *   { "name": "diagnostic_completeness", "test": "Are error diagnostics comprehensive?", "score": 0.50 },
 *   { "name": "recovery_precision", "test": "Are recovery actions precise?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZECODEBASE_RETRY_ERRORHANDLING: PromptPart = 
  'Handle analysis failures through: syntax error isolation with graceful degradation, memory overflow mitigation through chunked processing, circular dependency resolution with cycle breaking, missing dependency handling with stub generation, unsupported language feature bypass with compatibility layers, corrupted file skipping with detailed error reporting' as PromptPart;