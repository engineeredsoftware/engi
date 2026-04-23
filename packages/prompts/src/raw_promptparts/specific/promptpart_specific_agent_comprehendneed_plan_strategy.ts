import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step strategy for Comprehend Need agent"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Does it center expressed need and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "shipping_wrapper_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_PLAN_STRATEGY: PromptPart =
  'Plan need comprehension by: defining semantic parsing focus, distinguishing stable written assets from delivery mechanisms, selecting domain vocabulary, preparing ambiguity resolution questions, mapping constraints to satisfaction criteria, and preserving auditable reasoning for downstream pipeline phases.' as PromptPart;
