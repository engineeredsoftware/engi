import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Plan Implementation agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Is plan analysis effective?", "score": 0.34 },
 *   { "name": "plan_clarity", "test": "Is plan analysis clear?", "score": 0.33 },
 *   { "name": "plan_completeness", "test": "Is plan analysis complete?", "score": 0.32 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_PLANIMPLEMENTATION_PLAN_ANALYSIS: PromptPart = 
  'Analyze requirements to identify: technical constraints, architectural requirements, integration points, dependency chains, resource needs, success metrics' as PromptPart;