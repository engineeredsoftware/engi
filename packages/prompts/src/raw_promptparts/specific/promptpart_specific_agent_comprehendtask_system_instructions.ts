import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode PromptPart for former Comprehend Task system instructions; content is canonical Bitcode comprehend-need semantics"
 * current_version: "V26.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained task-named consumers can use it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_SYSTEM_INSTRUCTIONS: PromptPart =
  "Comprehend needs by: parsing natural language for desired outcomes, extracting written-asset requirements, distinguishing primary Bitcode asset-pack meaning from delivery mechanisms, identifying constraints and unknowns, producing measurable satisfaction criteria, and preserving reasoning for downstream pipeline prompts, agents, steps, and phases." as PromptPart;
