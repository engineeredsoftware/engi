/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for Bitcode source content retrieval tool"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "name_clarity", "test": "Names content retrieval as source evidence support", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';
export const PROMPTPART_SPECIFIC_TOOL_GETCONTENTS_DOCCODETOOLNAME: PromptPart =
  'Bitcode Source Content Retrieval Tool' as PromptPart;
