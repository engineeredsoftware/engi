/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Stable-path system instructions for Bitcode repository-evidence search"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "support_precision", "test": "Stable filename carries canonical Bitcode instructions", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXT_SEARCHER_SYSTEM_INSTRUCTIONS: PromptPart =
  'Search only for bounded repository evidence. Preserve traceable matches and gaps. Do not mutate, deliver, prove, or reinterpret Bitcode needs beyond source-grounding support.' as PromptPart;
