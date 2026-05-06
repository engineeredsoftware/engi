import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission PromptPart for danger-wall system role"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "role_boundary", "test": "Role is support/admission, not product ownership.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_SYSTEM_ROLE: PromptPart =
  'Your role is to provide a source-traceable admission decision for the next Bitcode phase and to preserve downstream ownership of need interpretation, mutation, proof, AssetPack finalization, and delivery.' as PromptPart;
