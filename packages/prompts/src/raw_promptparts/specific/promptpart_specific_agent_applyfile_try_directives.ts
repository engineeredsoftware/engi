import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Apply File agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_effectiveness", "test": "Does try execution enable effective execution?", "score": 0.50 },
 *   { "name": "try_precision", "test": "Is try execution precisely defined?", "score": 0.50 },
 *   { "name": "try_completeness", "test": "Is try execution comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_APPLYFILE_TRY_DIRECTIVES: PromptPart = 
  'Execute conquest through: precise AST manipulation, syntax-aware text transformation, semantic-preserving refactoring, style-consistent code generation, import management and optimization, comment preservation and updates, diff generation and validation' as PromptPart;