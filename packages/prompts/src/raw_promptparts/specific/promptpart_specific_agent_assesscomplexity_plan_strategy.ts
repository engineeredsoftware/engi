import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Assess Complexity agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Is plan strategy effective?", "score": 0.35 },
 *   { "name": "plan_clarity", "test": "Is plan strategy clear?", "score": 0.34 },
 *   { "name": "plan_completeness", "test": "Is plan strategy complete?", "score": 0.33 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSESSCOMPLEXITY_PLAN_STRATEGY: PromptPart = 
  'Plan complexity assessment by determining: metric calculation priorities, analysis scope boundaries, threshold configurations, reporting granularity, aggregation strategies, visualization requirements' as PromptPart;