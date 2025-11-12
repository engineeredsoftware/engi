import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step strategy for Determine Deliverable Type agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "strategy_effectiveness", "test": "Does it enable effective planning?", "score": 0.38 },
 *   { "name": "planning_precision", "test": "Is the planning approach precise?", "score": 0.37 },
 *   { "name": "scope_determination", "test": "Does it properly determine scope?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_PLAN_STRATEGY: PromptPart = 
  'Plan type determination by identifying: classification criteria and patterns, request format indicators, content analysis requirements, routing decision trees, validation checkpoints, metadata extraction needs' as PromptPart;