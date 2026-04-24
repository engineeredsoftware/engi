/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameters description for search web tool"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_clarity", "test": "Does '{{content}}' clearly describe query and options? Rate 0-1" },
 *   { "name": "filter_options", "test": "Does '{{content}}' explain time and location filters? Rate 0-1" },
 *   { "name": "localization_params", "test": "Does '{{content}}' describe language and country parameters? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SEARCHWEB_DOCCODETOOLPARAMETERS: PromptPart = 
  'query: string (required) - Search query text; options.limit: number (optional) - Number of results to scrape; options.tbs: string (optional) - Time filter (qdr:h=hour, qdr:d=day, qdr:w=week); options.lang: string (optional) - Language code (en, es, fr); options.country: string (optional) - Country code (US, UK, CA); options.location: string (optional) - Location-based search; options.scrapeOptions: object (optional) - Scraping configuration' as PromptPart;