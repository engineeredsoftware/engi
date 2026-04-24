import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define RETRY step strategy for Comprehend Need agent"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Does it center expressed need and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "delivery_mechanism_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_RETRY_STRATEGY: PromptPart =
  'Recover need comprehension by applying alternative domain parses, decomposing compound needs, inferring safe written-asset defaults only when evidence supports them, downgrading uncertain delivery-mechanism assumptions, and producing focused clarification prompts when confidence remains insufficient.' as PromptPart;
