/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for scrape URL tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "single_page_emphasis", "test": "Does '{{content}}' emphasize single webpage extraction? Rate 0-1" },
 *   { "name": "format_diversity", "test": "Does '{{content}}' mention multiple output formats? Rate 0-1" },
 *   { "name": "content_structure", "test": "Does '{{content}}' mention structured content extraction? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SCRAPEURL_DOCCODETOOLPURPOSE: PromptPart = 
  'Extract clean, structured content from a single webpage including text, markdown, HTML, screenshots, and comprehensive metadata' as PromptPart;