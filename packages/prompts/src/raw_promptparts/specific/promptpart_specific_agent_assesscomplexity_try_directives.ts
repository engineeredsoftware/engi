import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Assess Complexity agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_effectiveness", "test": "Is try execution effective?", "score": 0.33 },
 *   { "name": "try_clarity", "test": "Is try execution clear?", "score": 0.32 },
 *   { "name": "try_completeness", "test": "Is try execution complete?", "score": 0.31 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSESSCOMPLEXITY_TRY_DIRECTIVES: PromptPart = 
  'Execute complexity assessment through: cyclomatic complexity calculation, cognitive complexity scoring, maintainability index computation, dependency graph analysis, code duplication detection, technical debt quantification, hotspot identification' as PromptPart;