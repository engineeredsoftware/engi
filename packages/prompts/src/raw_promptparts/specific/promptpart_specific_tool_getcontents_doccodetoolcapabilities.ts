/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capabilities description for get contents tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "extraction_features", "test": "Does '{{content}}' cover content extraction capabilities? Rate 0-1" },
 *   { "name": "format_support", "test": "Does '{{content}}' mention multiple output formats? Rate 0-1" },
 *   { "name": "metadata_extraction", "test": "Does '{{content}}' include metadata extraction capabilities? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_GETCONTENTS_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Direct URL content extraction with markdown conversion, HTML parsing, plain text extraction, metadata retrieval including title and description, link extraction, image detection, and intelligent content cleaning for optimal readability' as PromptPart;