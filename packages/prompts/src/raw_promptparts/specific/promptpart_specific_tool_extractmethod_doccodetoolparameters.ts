/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter documentation for extract method tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_clarity", "test": "Does '{{content}}' clearly explain each parameter and its purpose? Rate 0-1" },
 *   { "name": "usage_guidance", "test": "Does '{{content}}' provide enough context for correct parameter usage? Rate 0-1" },
 *   { "name": "type_indication", "test": "Are parameter types and formats clear from '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLPARAMETERS: PromptPart = 
  'filePath: absolute path to the source file; startLine: beginning line number of code selection; endLine: ending line number of code selection; methodName: name for the extracted method (optional, will be generated if not provided); targetLocation: where to place the new method (before/after current method, or specific line); preserveComments: boolean to include comments in extraction' as PromptPart;