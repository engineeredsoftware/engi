/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output description for get contents tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_structure", "test": "Does '{{content}}' clearly describe the output structure? Rate 0-1" },
 *   { "name": "content_formats", "test": "Does '{{content}}' mention available content formats? Rate 0-1" },
 *   { "name": "metadata_inclusion", "test": "Does '{{content}}' describe metadata fields? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_GETCONTENTS_DOCCODETOOLOUTPUT: PromptPart = 
  'Extracted content in requested format (markdown/HTML/text), page metadata including title, description, author, and publish date, extracted links array, detected images, and success/error status' as PromptPart;