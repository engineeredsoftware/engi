/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Analyze Bitcode repository-evidence search failure modes"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "gap_visibility", "test": "Turns misses into explicit evidence gaps", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_RETRY_FAILURE_ANALYSIS: PromptPart =
  'Analyze evidence misses as scoped gaps: wrong package path, overly broad or narrow Bitcode term, support filename mismatch, absent proof owner, or unavailable repository source. Do not invent evidence.' as PromptPart;
