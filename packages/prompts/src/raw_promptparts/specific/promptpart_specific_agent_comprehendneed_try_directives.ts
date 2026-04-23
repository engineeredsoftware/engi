import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define TRY step execution for Comprehend Need agent"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Does it center expressed need and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "shipping_wrapper_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_TRY_DIRECTIVES: PromptPart =
  'Execute need comprehension through: entity and intent extraction, written-asset classification, constraint mapping, acceptance-criteria formulation, shipping-wrapper separation, dependency identification, ambiguity scoring, and structured need-model generation.' as PromptPart;
