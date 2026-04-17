/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capabilities description for crawl website tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "feature_completeness", "test": "Does '{{content}}' cover all major crawling features? Rate 0-1" },
 *   { "name": "control_options", "test": "Does '{{content}}' explain crawl control options (depth, domains, limits)? Rate 0-1" },
 *   { "name": "performance_features", "test": "Does '{{content}}' mention performance optimizations like fast mode? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Recursive website crawling with configurable depth and page limits, domain-based scoping with allow/block lists, sitemap.xml support for efficient discovery, subdomain inclusion control, fast mode optimization, automatic duplicate detection, rate limit handling, progress tracking, and content extraction in markdown/HTML formats with metadata' as PromptPart;