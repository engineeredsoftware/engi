import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step analysis for Comprehend Task agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "analysis_thoroughness", "test": "Is the pre-analysis thorough?", "score": 0.50 },
 *   { "name": "context_extraction", "test": "Does it extract relevant context?", "score": 0.50 },
 *   { "name": "requirement_identification", "test": "Are requirements properly identified?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_PLAN_ANALYSIS: PromptPart = 
  'Analyze task context to identify: user intent patterns and implicit goals, technical constraints from description, referenced systems or components, assumed knowledge prerequisites, environmental dependencies, quality expectations and performance requirements' as PromptPart;