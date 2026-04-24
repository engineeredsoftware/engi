/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameters description for crawl website tool"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_clarity", "test": "Does '{{content}}' clearly describe all parameters? Rate 0-1" },
 *   { "name": "option_coverage", "test": "Does '{{content}}' cover key crawling options? Rate 0-1" },
 *   { "name": "type_specification", "test": "Does '{{content}}' specify parameter types? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLPARAMETERS: PromptPart = 
  'url: string (required) - Starting URL for crawl; options.limit: number (optional) - Max pages to crawl; options.allowedDomains: string[] (optional) - Domains to include; options.blockedDomains: string[] (optional) - Domains to exclude; options.maxDepth: number (optional) - Max link depth; options.mode: "default"|"fast" (optional) - Crawling mode; options.followSitemap: boolean (optional) - Use sitemap.xml' as PromptPart;