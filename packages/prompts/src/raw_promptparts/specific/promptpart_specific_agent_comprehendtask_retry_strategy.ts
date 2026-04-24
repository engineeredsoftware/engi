import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Compatibility PromptPart for former Comprehend Task retry strategy; content is canonical Bitcode comprehend-need semantics"
 * current_version: "V26.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained task-named consumers can use it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_RETRY_STRATEGY: PromptPart =
  "Recover need comprehension by applying alternative domain parses, decomposing compound needs, inferring safe written-asset defaults only when evidence supports them, downgrading uncertain shipping-wrapper assumptions, and producing focused clarification prompts when confidence remains insufficient." as PromptPart;
