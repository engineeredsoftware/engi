/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for web search tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "name_clarity", "test": "Does '{{content}}' clearly indicate web search functionality? Rate 0-1", "score": 0.5 },
 *   { "name": "domain_specificity", "test": "Does '{{content}}' suggest internet search (not local)? Rate 0-1", "score": 0.5 }
 * ]
 */

import { PromptPart } from '@engi/prompts';
export const PROMPTPART_SPECIFIC_TOOL_SEARCHWEB_DOCCODETOOLNAME: PromptPart =
  'Search Web Tool' as PromptPart;
