/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing domain-restricted crawl with depth control"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "domain_control", "test": "Does '{{content}}' demonstrate domain restriction features? Rate 0-1" },
 *   { "name": "depth_limitation", "test": "Does '{{content}}' show depth control usage? Rate 0-1" },
 *   { "name": "security_awareness", "test": "Does '{{content}}' demonstrate safe crawling practices? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Domain-restricted deep crawl: crawlWebsiteTool({ url: "https://blog.example.com", options: { allowedDomains: ["blog.example.com"], blockedDomains: ["ads.example.com"], maxDepth: 3, limit: 500 } })' as PromptPart;