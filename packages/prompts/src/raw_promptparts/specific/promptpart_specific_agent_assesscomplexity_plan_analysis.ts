import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Assess Complexity agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Is plan analysis effective?", "score": 0.34 },
 *   { "name": "plan_clarity", "test": "Is plan analysis clear?", "score": 0.33 },
 *   { "name": "plan_completeness", "test": "Is plan analysis complete?", "score": 0.32 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSESSCOMPLEXITY_PLAN_ANALYSIS: PromptPart = 
  'Analyze codebase to identify: function and class structures, control flow patterns, nesting depths, coupling relationships, cohesion metrics, architectural layers' as PromptPart;