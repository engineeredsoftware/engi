import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step analysis for Comprehend Read agent"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_alignment", "test": "Does it center expressed read and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "delivery_mechanism_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDREAD_PLAN_ANALYSIS: PromptPart =
  'Analyze the expressed read to identify: user outcome, implicit goals, written-asset type, repository or interface constraints, delivery-mechanism expectations, acceptance criteria, evidence requirements, and unknowns that could block read satisfaction before risk admission.' as PromptPart;
