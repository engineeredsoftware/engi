/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameters description for scrape URL tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_clarity", "test": "Does '{{content}}' clearly describe required and optional parameters? Rate 0-1" },
 *   { "name": "format_options", "test": "Does '{{content}}' explain format selection options? Rate 0-1" },
 *   { "name": "filtering_options", "test": "Does '{{content}}' describe tag filtering parameters? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SCRAPEURL_DOCCODETOOLPARAMETERS: PromptPart = 
  'url: string (required) - Target webpage URL; options.formats: string[] (optional) - Output formats ["markdown", "html", "screenshot", "links"]; options.timeout: number (optional) - Request timeout ms; options.waitFor: number (optional) - Page load wait ms; options.headers: object (optional) - Custom HTTP headers; options.includeTags: string[] (optional) - Tags to include; options.excludeTags: string[] (optional) - Tags to exclude; options.onlyMainContent: boolean (optional) - Extract main content only' as PromptPart;