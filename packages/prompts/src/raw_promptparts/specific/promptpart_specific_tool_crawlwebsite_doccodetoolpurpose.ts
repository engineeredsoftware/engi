/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for crawl website tool"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "recursive_emphasis", "test": "Does '{{content}}' emphasize recursive crawling capability? Rate 0-1" },
 *   { "name": "content_extraction", "test": "Does '{{content}}' mention content extraction purpose? Rate 0-1" },
 *   { "name": "comprehensive_nature", "test": "Does '{{content}}' convey comprehensive website analysis? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLPURPOSE: PromptPart = 
  'Recursively crawl entire websites to extract structured content from all accessible pages for comprehensive web data collection and analysis' as PromptPart;