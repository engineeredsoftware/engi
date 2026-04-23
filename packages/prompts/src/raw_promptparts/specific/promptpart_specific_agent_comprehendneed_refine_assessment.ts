import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define REFINE step assessment for Comprehend Need agent"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Does it center expressed need and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "shipping_wrapper_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_REFINE_ASSESSMENT: PromptPart =
  'Assess need-comprehension quality by evaluating: outcome coverage, written-asset specificity, shipping-wrapper separation, ambiguity closure, acceptance-criteria measurability, constraint feasibility, and confidence that the synthesized asset pack can satisfy the need.' as PromptPart;
