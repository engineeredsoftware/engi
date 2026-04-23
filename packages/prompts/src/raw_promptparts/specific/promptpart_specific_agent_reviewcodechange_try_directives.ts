import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Review Code Change agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_effectiveness", "test": "Does try execution enable effective execution?", "score": 0.50 },
 *   { "name": "try_precision", "test": "Is try execution precisely defined?", "score": 0.50 },
 *   { "name": "try_completeness", "test": "Is try execution comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_REVIEWCODECHANGE_TRY_DIRECTIVES: PromptPart = 
  'Execute review through: line-by-line code analysis, logic flow verification, bug pattern detection, performance profiling, security vulnerability scanning, test coverage analysis, feedback generation' as PromptPart;