/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output description for move symbol tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_clarity", "test": "Does '{{content}}' clearly describe what the tool outputs? Rate 0-1" },
 *   { "name": "report_details", "test": "Are report details like updated files mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "dependency_status", "test": "Is dependency resolution status clearly described in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_MOVESYMBOL_DOCCODETOOLOUTPUT: PromptPart = 
  'Move operation report with updated files, import changes, and dependency resolution status' as PromptPart;