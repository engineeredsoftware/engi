import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Compatibility PromptPart for former Comprehend Task refine assessment; content is canonical Bitcode comprehend-need semantics"
 * current_version: "V26.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained task-named consumers can use it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_REFINE_ASSESSMENT: PromptPart =
  "Assess need-comprehension quality by evaluating: outcome coverage, written-asset specificity, delivery-mechanism separation, ambiguity closure, acceptance-criteria measurability, constraint feasibility, and confidence that the synthesized asset pack can satisfy the need." as PromptPart;
