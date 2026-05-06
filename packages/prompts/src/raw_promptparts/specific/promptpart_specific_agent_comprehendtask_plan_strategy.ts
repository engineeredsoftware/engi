import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode PromptPart for former Comprehend Task plan strategy; content is canonical Bitcode comprehend-need semantics"
 * current_version: "V26.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained task-named consumers can use it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_PLAN_STRATEGY: PromptPart =
  "Plan need comprehension by: defining semantic parsing focus, distinguishing stable AssetPack synthesis artifacts from delivery mechanisms, selecting domain vocabulary, preparing ambiguity resolution questions, mapping constraints to satisfaction criteria, and preserving auditable reasoning for downstream pipeline phases." as PromptPart;
