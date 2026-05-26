import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Comprehend Read agent system instructions"
 * current_version: "V41"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_alignment", "test": "Does it center expressed read and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "delivery_mechanism_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDREAD_SYSTEM_INSTRUCTIONS: PromptPart =
  'Synthesize a reviewable Read-Need exactly and only from the reader\'s Read Request, no more and no less: preserve repository, branch, commit, policy, feedback, and target artifact context; state requirements, closure criteria, failure modes, target artifact kinds, proof expectations, and pricing-measurement inputs; keep Finding Fits, BTC settlement, BTD rights transfer, and AssetPack delivery outside Need comprehension until the Need is accepted; never reveal protected source, unpaid AssetPack source, credentials, or raw provider responses.' as PromptPart;
