import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode compatibility PromptPart for planning delivery-mechanism template selection"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "strategy_effectiveness", "test": "Does it enable effective planning?", "score": 0.38 },
 *   { "name": "planning_precision", "test": "Is the planning approach precise?", "score": 0.37 },
 *   { "name": "scope_determination", "test": "Does it properly determine scope?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_PLAN_STRATEGY: PromptPart = 
  'Plan delivery-mechanism template selection by identifying destination requirements, requested Shippable shape, AssetPack evidence dependencies, validation checkpoints, metadata needed for receipts, and fail-closed conditions when the Need does not justify delivery' as PromptPart;
