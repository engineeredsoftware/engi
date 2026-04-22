/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output description for scrape URL tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_structure", "test": "Does '{{content}}' clearly describe the output structure? Rate 0-1" },
 *   { "name": "format_variety", "test": "Does '{{content}}' mention all possible output formats? Rate 0-1" },
 *   { "name": "metadata_completeness", "test": "Does '{{content}}' describe rich metadata extraction? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SCRAPEURL_DOCCODETOOLOUTPUT: PromptPart = 
  'Success status with extracted content in requested formats (markdown, HTML, screenshot base64, links array), comprehensive metadata including title, description, language, OpenGraph properties (ogTitle, ogDescription, ogUrl, ogImage), source URL, HTTP status code, and error details if extraction fails' as PromptPart;