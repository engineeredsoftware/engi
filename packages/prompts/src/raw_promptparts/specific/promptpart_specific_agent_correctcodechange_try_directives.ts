import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Correct Code Change agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_effectiveness", "test": "Does try execution enable effective execution?", "score": 0.50 },
 *   { "name": "try_precision", "test": "Is try execution precisely defined?", "score": 0.50 },
 *   { "name": "try_completeness", "test": "Is try execution comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_TRY_DIRECTIVES: PromptPart = 
  'Execute correction through: multi-file syntax validation, automated test execution, lint rule application, build process verification, integration testing, correction patch generation, success metric calculation' as PromptPart;