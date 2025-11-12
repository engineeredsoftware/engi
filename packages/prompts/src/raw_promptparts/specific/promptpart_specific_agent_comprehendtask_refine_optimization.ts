import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define REFINE step optimization for Comprehend Task agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "optimization_effectiveness", "test": "Does it optimize comprehension?", "score": 0.50 },
 *   { "name": "clarity_improvement", "test": "Does it improve understanding clarity?", "score": 0.50 },
 *   { "name": "ambiguity_reduction", "test": "Are ambiguities reduced?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_REFINE_OPTIMIZATION: PromptPart = 
  'Refine comprehension by: cross-referencing extracted requirements for consistency, resolving conflicting interpretations through context analysis, enriching specifications with domain knowledge, clarifying ambiguous terms using contextual hints, validating requirement completeness against templates, enhancing success criteria with measurable metrics' as PromptPart;