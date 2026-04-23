/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for Bitcode need-synthesis web search tool"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "name_clarity", "test": "Names web search as Bitcode need-synthesis support", "score": 1.00 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';
export const PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLNAME: PromptPart =
  'Bitcode Need-Synthesis Web Search Tool' as PromptPart;
