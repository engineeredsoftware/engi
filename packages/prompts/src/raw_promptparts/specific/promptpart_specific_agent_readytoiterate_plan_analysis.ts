import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step analysis for Ready to Iterate agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "analysis_depth", "test": "Does it enable deep analysis?", "score": 0.37 },
 *   { "name": "context_extraction", "test": "Does it extract relevant context?", "score": 0.36 },
 *   { "name": "requirement_identification", "test": "Are requirements identified?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOITERATE_PLAN_ANALYSIS: PromptPart = 
  'Analyze iteration context to determine: current execution state, completed prerequisites, pending dependencies, resource utilization, error conditions, performance metrics' as PromptPart;