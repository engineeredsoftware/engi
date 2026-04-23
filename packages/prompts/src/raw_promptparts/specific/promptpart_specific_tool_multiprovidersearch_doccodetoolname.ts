/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for Bitcode multi-provider evidence search tool"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "name_clarity", "test": "Names provider search as Bitcode evidence support", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLNAME: PromptPart =
  'Bitcode Multi-Provider Evidence Search Tool' as PromptPart;
