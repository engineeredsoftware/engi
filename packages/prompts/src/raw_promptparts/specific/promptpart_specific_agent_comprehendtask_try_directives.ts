import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Compatibility PromptPart for former Comprehend Task try directives; content is canonical Bitcode comprehend-need semantics"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_alignment", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained task-named consumers can use it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_TRY_DIRECTIVES: PromptPart =
  "Execute need comprehension through: entity and intent extraction, written-asset classification, constraint mapping, acceptance-criteria formulation, shipping-wrapper separation, dependency identification, ambiguity scoring, and structured need-model generation." as PromptPart;
