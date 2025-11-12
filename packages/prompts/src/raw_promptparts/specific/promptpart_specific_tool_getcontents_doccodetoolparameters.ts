/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameters description for get contents tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_clarity", "test": "Does '{{content}}' clearly describe URL parameter? Rate 0-1" },
 *   { "name": "format_options", "test": "Does '{{content}}' explain format selection? Rate 0-1" },
 *   { "name": "option_coverage", "test": "Does '{{content}}' mention additional options? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_GETCONTENTS_DOCCODETOOLPARAMETERS: PromptPart = 
  'url: string (required) - Target webpage URL to extract content from; format: "markdown"|"html"|"text" (optional) - Desired output format; options: object (optional) - Additional extraction options including timeout, headers, and content filters' as PromptPart;