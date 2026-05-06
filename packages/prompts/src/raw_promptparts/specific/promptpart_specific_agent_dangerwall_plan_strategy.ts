import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission PromptPart for danger-wall plan strategy"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "strategy_scope", "test": "Plan strategy distinguishes admission from proof or delivery ownership.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PLAN_STRATEGY: PromptPart =
  'Plan admission by ranking risks that can stop the next Bitcode phase, risks that require manual operator review, and risks that must be handed to downstream proof, mutation, AssetPack, or delivery owners.' as PromptPart;
