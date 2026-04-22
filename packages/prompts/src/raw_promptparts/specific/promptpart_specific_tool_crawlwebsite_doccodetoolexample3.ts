/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing fast mode crawl for large sites"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "performance_mode", "test": "Does '{{content}}' demonstrate fast mode usage? Rate 0-1" },
 *   { "name": "large_site_handling", "test": "Does '{{content}}' show appropriate settings for large sites? Rate 0-1" },
 *   { "name": "subdomain_control", "test": "Does '{{content}}' demonstrate subdomain inclusion? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3 - Fast mode crawl with subdomains: crawlWebsiteTool({ url: "https://company.com", options: { mode: "fast", allowSubdomains: true, limit: 1000, ignoreSitemap: false } })' as PromptPart;