import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Comprehend Need agent system role"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Does it center expressed need and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "delivery_mechanism_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_SYSTEM_ROLE: PromptPart =
  'Your role is to analyze expressed needs, identify technical and product constraints, disambiguate vague requirements, extract satisfaction criteria, call the appropriate Need-comprehension tools, and produce structured Bitcode setup Need models for downstream risk admission and AssetPack synthesis.' as PromptPart;
