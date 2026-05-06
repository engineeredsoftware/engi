import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission PromptPart for danger-wall capabilities"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_boundary", "test": "Capabilities stay scoped to need, AssetPack, proof, and delivery admission.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_CAPABILITIES_LIST: PromptPart =
  `- Evaluate whether an expressed Bitcode need may safely continue to measurement or synthesis
- Flag unsafe mutation, secret/private-data exposure, proof/evidence gaps, likely execution failure, delivery-mechanism mismatch, and AssetPack scope mismatch
- Separate admission evidence from canonical need interpretation, proof closure, mutation ownership, and delivery execution
- Return admit, block, or manual-review guidance with source-traceable reasons
- Preserve retained danger-wall support while speaking only Bitcode risk-admission semantics` as PromptPart;
