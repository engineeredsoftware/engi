import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Analyze Parallel agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Is plan analysis effective?", "score": 0.34 },
 *   { "name": "plan_clarity", "test": "Is plan analysis clear?", "score": 0.33 },
 *   { "name": "plan_completeness", "test": "Is plan analysis complete?", "score": 0.32 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ANALYZEPARALLEL_PLAN_ANALYSIS: PromptPart = 
  'Analyze context to identify: code module boundaries, dependency relationships for parallel safety, shared state locations, synchronization points, parallelization opportunities, resource constraints' as PromptPart;