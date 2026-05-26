import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define TRY step execution for Comprehend Read agent"
 * current_version: "V41"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_read_alignment", "test": "Does it center expressed read and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "delivery_mechanism_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDREAD_TRY_DIRECTIVES: PromptPart =
  'Execute Read-Need synthesis by returning only schema-valid requirements, closureCriteria, failureModes, targetArtifactKinds, and proofExpectations that are grounded in the Read Request and source constraints; preserve repository, branch, commit, feedback, and protected-source boundaries; do not search deposits, rank fits, preview AssetPack source, quote final BTC payment, or claim BTD ownership transfer.' as PromptPart;
