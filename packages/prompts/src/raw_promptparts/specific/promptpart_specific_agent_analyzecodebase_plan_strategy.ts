import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step strategy for Analyze Codebase agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "strategy_comprehensiveness", "test": "Does it cover all analysis planning aspects?", "score": 0.50 },
 *   { "name": "planning_precision", "test": "Is the planning approach precise?", "score": 0.50 },
 *   { "name": "scope_determination", "test": "Does it properly determine analysis scope?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZECODEBASE_PLAN_STRATEGY: PromptPart = 
  'Develop analysis strategy by determining: entry points and critical paths through the codebase, language-specific parsing requirements and AST traversal patterns, dependency resolution order for optimal understanding, architectural layer boundaries and component isolation, test coverage scope and quality metric targets, performance bottleneck identification priorities' as PromptPart;