import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step strategy for Initialize LSP agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "strategy_effectiveness", "test": "Does it enable effective planning?", "score": 0.38 },
 *   { "name": "planning_precision", "test": "Is the planning approach precise?", "score": 0.37 },
 *   { "name": "scope_determination", "test": "Does it properly determine scope?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_PLAN_STRATEGY: PromptPart = 
  'Plan LSP initialization by determining: language server requirements, capability negotiation strategy, workspace configuration needs, feature enablement priorities, connection parameters, fallback options' as PromptPart;