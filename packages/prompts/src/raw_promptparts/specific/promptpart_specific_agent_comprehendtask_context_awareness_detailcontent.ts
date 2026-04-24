import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Compatibility PromptPart for former Comprehend Task context awareness detailcontent; content is canonical Bitcode comprehend-need semantics"
 * current_version: "V26.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained task-named consumers can use it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_CONTEXT_AWARENESS_DETAILCONTENT: PromptPart =
  "You comprehend expressed Bitcode needs by extracting user outcome, constraints, satisfaction criteria, written-asset expectations, and delivery-mechanism constraints for downstream asset-pack synthesis." as PromptPart;
