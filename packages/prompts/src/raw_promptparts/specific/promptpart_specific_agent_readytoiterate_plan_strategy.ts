import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step strategy for Ready to Iterate agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "strategy_effectiveness", "test": "Does it enable effective planning?", "score": 0.38 },
 *   { "name": "planning_precision", "test": "Is the planning approach precise?", "score": 0.37 },
 *   { "name": "scope_determination", "test": "Does it properly determine scope?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOITERATE_PLAN_STRATEGY: PromptPart = 
  'Plan readiness validation by identifying: prerequisite verification checklist, resource availability requirements, state consistency checks, dependency satisfaction criteria, blocking condition detection, continuation requirements' as PromptPart;