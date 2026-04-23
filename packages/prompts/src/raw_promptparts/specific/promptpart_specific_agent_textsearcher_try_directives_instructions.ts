/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Try directives for Bitcode repository-evidence search"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "execution_boundary", "test": "Executes search as evidence collection only", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_TEXTSEARCHER_TRY_DIRECTIVES_INSTRUCTIONS: PromptPart =
  'Use simpleSystemTextSearch to collect exact or regex repository evidence inside the allowed scope. Return matched file paths and lines, record misses, and avoid reading outside the requested repository/package boundary.' as PromptPart;
