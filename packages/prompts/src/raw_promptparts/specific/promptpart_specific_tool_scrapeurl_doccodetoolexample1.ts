/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing basic webpage scraping for markdown content"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "basic_usage", "test": "Does '{{content}}' demonstrate simple markdown extraction? Rate 0-1" },
 *   { "name": "common_scenario", "test": "Does '{{content}}' represent a typical documentation scraping use case? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SCRAPEURL_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Extract markdown from article: scrapeUrlTool({ url: "https://blog.example.com/article", options: { formats: ["markdown"], onlyMainContent: true } })' as PromptPart;