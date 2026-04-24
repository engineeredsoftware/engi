/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output description for search web tool"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_structure", "test": "Does '{{content}}' clearly describe the output array structure? Rate 0-1" },
 *   { "name": "content_extraction", "test": "Does '{{content}}' mention scraped content formats? Rate 0-1" },
 *   { "name": "metadata_inclusion", "test": "Does '{{content}}' describe result metadata? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SEARCHWEB_DOCCODETOOLOUTPUT: PromptPart = 
  'Success status with search results array containing url, title, description, extracted markdown/HTML content, metadata with source URL/language/date, original query, total results count, and error details if search or scraping fails' as PromptPart;