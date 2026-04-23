import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define TRY step execution for Analyze Codebase agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "execution_thoroughness", "test": "Does it enable thorough codebase analysis?", "score": 0.50 },
 *   { "name": "parsing_accuracy", "test": "Are parsing operations accurate?", "score": 0.50 },
 *   { "name": "metric_collection", "test": "Does it collect comprehensive metrics?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZECODEBASE_TRY_DIRECTIVES: PromptPart = 
  'Execute codebase analysis through: recursive file tree traversal with extension filtering, AST parsing for structural understanding, import/export graph construction for dependency mapping, cyclomatic complexity calculation for maintainability assessment, design pattern detection through structural matching, API surface area cataloging with visibility modifiers, test coverage mapping through test file correlation' as PromptPart;