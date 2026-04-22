/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output description for inline variable tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_clarity", "test": "Does '{{content}}' clearly describe what the tool outputs? Rate 0-1" },
 *   { "name": "report_details", "test": "Are report details like replacement count mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "validation_results", "test": "Are validation results clearly described in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_INLINEVARIABLE_DOCCODETOOLOUTPUT: PromptPart = 
  'Inline operation report with replacement count, affected locations, and validation results' as PromptPart;