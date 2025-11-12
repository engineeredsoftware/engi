/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output description for crawl website tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_structure", "test": "Does '{{content}}' clearly describe the output structure? Rate 0-1" },
 *   { "name": "content_formats", "test": "Does '{{content}}' mention available content formats? Rate 0-1" },
 *   { "name": "statistics_inclusion", "test": "Does '{{content}}' describe crawl statistics? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CRAWLWEBSITE_DOCCODETOOLOUTPUT: PromptPart = 
  'Success status with data array containing each crawled page (url, markdown/html content, links, metadata with title/description/language), comprehensive crawl statistics (total/successful/failed pages, duration), and error details if any failures occur' as PromptPart;