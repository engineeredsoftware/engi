import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define REFINE step optimization for Analyze Codebase agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "optimization_effectiveness", "test": "Does it identify meaningful optimizations?", "score": 0.50 },
 *   { "name": "refinement_depth", "test": "Are refinements comprehensive?", "score": 0.50 },
 *   { "name": "insight_quality", "test": "Does it generate quality insights?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZECODEBASE_REFINE_OPTIMIZATION: PromptPart = 
  'Refine analysis through: deeper AST traversal for hidden dependencies, cross-reference validation for accuracy improvement, pattern clustering for architectural insight extraction, performance hotspot correlation with code complexity, dead code elimination recommendations, refactoring opportunity identification based on coupling metrics' as PromptPart;