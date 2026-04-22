/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing authenticated scraping with custom headers"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "authentication_demo", "test": "Does '{{content}}' demonstrate header-based authentication? Rate 0-1" },
 *   { "name": "multiple_formats", "test": "Does '{{content}}' show requesting multiple output formats? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SCRAPEURL_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Authenticated scrape with screenshot: scrapeUrlTool({ url: "https://app.example.com/dashboard", options: { formats: ["markdown", "screenshot"], headers: { "Authorization": "Bearer token123" }, waitFor: 2000 } })' as PromptPart;