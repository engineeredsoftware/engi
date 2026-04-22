/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for search web tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "search_emphasis", "test": "Does '{{content}}' emphasize web search capability? Rate 0-1" },
 *   { "name": "scraping_integration", "test": "Does '{{content}}' mention automatic content extraction? Rate 0-1" },
 *   { "name": "workflow_clarity", "test": "Does '{{content}}' convey the integrated search-and-scrape workflow? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SEARCHWEB_DOCCODETOOLPURPOSE: PromptPart = 
  'Search the web and automatically extract content from top results with integrated scraping for comprehensive information gathering' as PromptPart;