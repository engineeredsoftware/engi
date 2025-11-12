/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for get contents tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "url_extraction_emphasis", "test": "Does '{{content}}' emphasize URL/webpage content extraction? Rate 0-1" },
 *   { "name": "format_flexibility", "test": "Does '{{content}}' indicate multiple format support? Rate 0-1" },
 *   { "name": "clarity_of_purpose", "test": "Is '{{content}}' clear about retrieving web content vs searching? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_GETCONTENTS_DOCCODETOOLPURPOSE: PromptPart = 
  'Retrieve and extract content from specific URLs or webpages with support for multiple formats including markdown, HTML, and plain text' as PromptPart;