import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Comprehend Need agent system instructions"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Does it center expressed need and asset-pack semantics? Rate 0-1", "score": 0.96 },
 *   { "name": "shipping_wrapper_separation", "test": "Does it keep delivery mechanisms subordinate to written assets? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDNEED_SYSTEM_INSTRUCTIONS: PromptPart =
  'Comprehend needs by: parsing natural language for desired outcomes, extracting written-asset requirements, distinguishing primary Bitcode asset-pack meaning from shipping wrappers, identifying constraints and unknowns, producing measurable satisfaction criteria, and preserving reasoning for downstream pipeline prompts, agents, steps, and phases.' as PromptPart;
