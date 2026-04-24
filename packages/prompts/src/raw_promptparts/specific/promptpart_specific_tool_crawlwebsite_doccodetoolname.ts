/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for website crawling tool"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "name_clarity", "test": "Does '{{content}}' clearly indicate website crawling? Rate 0-1", "score": 0.5 },
 *   { "name": "scope_signal", "test": "Does '{{content}}' imply multi-page traversal? Rate 0-1", "score": 0.5 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';
export const PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLNAME: PromptPart =
  'Crawl Website Tool' as PromptPart;
