/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output description for organize imports tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_clarity", "test": "Does '{{content}}' clearly describe what the tool outputs? Rate 0-1" },
 *   { "name": "report_details", "test": "Are report details like removed imports and statistics mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "optimization_metrics", "test": "Are optimization metrics clearly described in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLOUTPUT: PromptPart = 
  'Import organization report with removed imports, reordered statements, and optimization statistics' as PromptPart;