/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing filtered content extraction with tag exclusion"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "filtering_demo", "test": "Does '{{content}}' demonstrate tag-based content filtering? Rate 0-1" },
 *   { "name": "clean_extraction", "test": "Does '{{content}}' show excluding unwanted elements? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SCRAPEURL_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3 - Filtered content extraction: scrapeUrlTool({ url: "https://docs.example.com/api", options: { formats: ["html", "links"], excludeTags: ["nav", "footer", "script", "style"], includeTags: ["main", "article", "section"] } })' as PromptPart;