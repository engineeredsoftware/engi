import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define RETRY step strategy for Comprehend Read agent"
 * current_version: "V41"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_alignment", "test": "Does it center expressed read and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "delivery_mechanism_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDREAD_RETRY_STRATEGY: PromptPart =
  'Recover Read-Need comprehension by reducing the output to the safest evidence-backed Need: use deterministic defaults only when the Read Request or source context supports them, keep ambiguous or missing facts out of typed fields, carry feedback history for resynthesis, preserve the accepted-Need gate before Finding Fits, and fail closed rather than inventing fits, BTC settlement, BTD rights, or deliverable source.' as PromptPart;
