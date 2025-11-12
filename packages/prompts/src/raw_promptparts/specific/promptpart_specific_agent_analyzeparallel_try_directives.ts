import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Analyze Parallel agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_effectiveness", "test": "Is try execution effective?", "score": 0.33 },
 *   { "name": "try_clarity", "test": "Is try execution clear?", "score": 0.32 },
 *   { "name": "try_completeness", "test": "Is try execution complete?", "score": 0.31 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZEPARALLEL_TRY_DIRECTIVES: PromptPart = 
  'Execute parallel analysis through: spawning analysis workers with load balancing, concurrent AST traversal across modules, parallel pattern matching and detection, distributed state analysis, synchronized result collection, race condition scanning, deadlock detection algorithms' as PromptPart;