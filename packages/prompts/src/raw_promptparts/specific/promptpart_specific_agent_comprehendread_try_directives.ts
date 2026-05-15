import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define TRY step execution for Comprehend Read agent"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Does it center expressed read and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "delivery_mechanism_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDREAD_TRY_DIRECTIVES: PromptPart =
  'Execute read comprehension through: entity and intent extraction, written-asset classification, constraint mapping, acceptance-criteria formulation, delivery-mechanism separation, dependency identification, ambiguity scoring, appropriate tool calls, and structured Read-model generation.' as PromptPart;
