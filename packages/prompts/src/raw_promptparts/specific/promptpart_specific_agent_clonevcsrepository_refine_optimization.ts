import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define REFINE step optimization strategy for Clone VCS Repository agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "optimization_depth", "test": "Does it identify meaningful optimization opportunities?", "score": 0.45 },
 *   { "name": "refinement_precision", "test": "Are refinements specific and actionable?", "score": 0.44 },
 *   { "name": "performance_focus", "test": "Does it address performance bottlenecks?", "score": 0.43 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CLONEVCSREPOSITORY_REFINE_OPTIMIZATION: PromptPart = 
  'Refine clone operation through: bandwidth utilization analysis with adaptive chunk sizing, parallel object download optimization for multi-core systems, delta compression ratio evaluation for storage efficiency, authentication cache optimization to reduce token exchanges, sparse checkout configuration for partial repository needs, reference repository linking for reduced network transfer, packfile index optimization for faster object resolution' as PromptPart;