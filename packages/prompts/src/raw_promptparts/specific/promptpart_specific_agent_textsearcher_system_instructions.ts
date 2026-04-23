/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode repository-evidence search system instructions"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_boundary", "test": "Keeps evidence collection bounded and auditable", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_SYSTEM_INSTRUCTIONS: PromptPart =
  'Collect only bounded repository evidence. Preserve file, line, matched text, query intent, and gaps. Never mutate files, deliver artifacts, assert proof completion, infer canonical need meaning, or claim authority beyond source-grounding support.' as PromptPart;
