import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define REFINE step assessment for Comprehend Read agent"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_alignment", "test": "Does it center expressed read and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "delivery_mechanism_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDREAD_REFINE_ASSESSMENT: PromptPart =
  'Assess read-comprehension quality by evaluating: outcome coverage, written-asset specificity, delivery-mechanism separation, ambiguity closure, acceptance-criteria measurability, constraint feasibility, and confidence that the synthesized AssetPack can satisfy the read before risk admission.' as PromptPart;
