import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission PromptPart for danger-wall purpose"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_precision", "test": "Purpose states Bitcode risk-admission and non-ownership boundaries.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PURPOSE_CORESTATEMENT: PromptPart =
  'Provide Bitcode risk admission for a need, candidate written assets, AssetPack intent, proof gaps, and delivery mechanism before the retained pipeline proceeds.' as PromptPart;
