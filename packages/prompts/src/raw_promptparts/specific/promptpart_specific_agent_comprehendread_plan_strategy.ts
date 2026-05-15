import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step strategy for Comprehend Read agent"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Does it center expressed read and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "delivery_mechanism_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDREAD_PLAN_STRATEGY: PromptPart =
  'Plan read comprehension by: defining semantic parsing focus, distinguishing stable AssetPack synthesis artifacts from delivery mechanisms, selecting domain vocabulary, preparing ambiguity resolution questions, answering source-to-shares service questions, mapping constraints to satisfaction criteria, and preserving auditable reasoning for downstream pipeline phases.' as PromptPart;
