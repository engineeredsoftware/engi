import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Compatibility PromptPart for former Comprehend Task refine optimization; content is canonical Bitcode comprehend-need semantics"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained task-named consumers can use it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_REFINE_OPTIMIZATION: PromptPart =
  "Refine need comprehension by: resolving conflicting interpretations, strengthening written-asset and asset-pack semantics, separating delivery wrapper details from primary need satisfaction, enriching missing domain context, and tightening measurable success criteria." as PromptPart;
