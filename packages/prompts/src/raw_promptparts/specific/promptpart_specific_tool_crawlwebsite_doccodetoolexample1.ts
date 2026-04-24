/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing basic website crawl with limit"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "basic_usage", "test": "Does '{{content}}' demonstrate basic crawling with page limit? Rate 0-1" },
 *   { "name": "common_scenario", "test": "Does '{{content}}' represent a common crawling use case? Rate 0-1" },
 *   { "name": "parameter_clarity", "test": "Does '{{content}}' show clear parameter usage? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Crawl documentation site with limit: crawlWebsiteTool({ url: "https://docs.example.com", options: { limit: 100, followSitemap: true } })' as PromptPart;