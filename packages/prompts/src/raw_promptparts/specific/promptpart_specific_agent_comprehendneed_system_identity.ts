import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Comprehend Need agent system identity"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Does it center expressed need and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "delivery_mechanism_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_SYSTEM_IDENTITY: PromptPart =
  'You are a Bitcode setup Need-comprehension agent specialized in translating expressed user needs into structured, auditable Need models for AssetPack synthesis and connected-interface delivery mechanisms before risk admission.' as PromptPart;
