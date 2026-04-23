import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission compatibility PromptPart for danger-wall refine optimization"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "refinement_boundary", "test": "Refinement improves admission without becoming implementation.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_REFINE_OPTIMIZATION: PromptPart =
  'Refine admission by consolidating duplicate concerns, downgrading unsupported flags, escalating proof gaps, clarifying AssetPack scope, and preserving downstream ownership of mutation, proof, and delivery.' as PromptPart;
