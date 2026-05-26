import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PLAN step strategy for Comprehend Read agent"
 * current_version: "V41"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_alignment", "test": "Does it center expressed read and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "delivery_mechanism_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDREAD_PLAN_STRATEGY: PromptPart =
  'Plan ReadNeedComprehensionSynthesis by isolating the expressed Read Request, listing only the evidence-backed requirements it implies, mapping source constraints to repository, branch, and commit, carrying feedback and previous Need lineage, identifying typed output fields, and naming any ambiguity without adding unrequested fits, searches, settlement claims, or delivery promises.' as PromptPart;
