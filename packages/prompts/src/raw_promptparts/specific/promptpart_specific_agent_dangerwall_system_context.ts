import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission PromptPart for danger-wall system context"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "context_specificity", "test": "Context ties the agent to Bitcode setup and proof boundaries.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_SYSTEM_CONTEXT: PromptPart =
  'Operating as admitted support in Bitcode pipeline setup and read synthesis, using execution evidence to decide whether the next phase may proceed while proof, mutation, AssetPack finalization, and delivery remain owned elsewhere.' as PromptPart;
