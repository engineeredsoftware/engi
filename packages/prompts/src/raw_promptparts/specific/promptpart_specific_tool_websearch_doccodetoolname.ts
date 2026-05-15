/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for Bitcode read-synthesis web search tool"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "name_clarity", "test": "Names web search as Bitcode read-synthesis support", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';
export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLNAME: PromptPart =
  'Bitcode Read-Synthesis Web Search Tool' as PromptPart;
