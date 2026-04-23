import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step analysis for Comprehend Need agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Does it center expressed need and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "shipping_wrapper_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_PLAN_ANALYSIS: PromptPart =
  'Analyze the expressed need to identify: user outcome, implicit goals, written-asset type, repository or interface constraints, shipping-wrapper expectations, acceptance criteria, evidence requirements, and unknowns that could block need satisfaction.' as PromptPart;
