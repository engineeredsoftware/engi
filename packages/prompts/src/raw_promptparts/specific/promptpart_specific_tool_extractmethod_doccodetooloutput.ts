/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output format description for extract method tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_clarity", "test": "Does '{{content}}' clearly describe what the tool returns? Rate 0-1" },
 *   { "name": "format_specification", "test": "Does '{{content}}' specify the output structure and format? Rate 0-1" },
 *   { "name": "success_indication", "test": "Does '{{content}}' explain how to identify successful extraction? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLOUTPUT: PromptPart = 
  'Returns extraction result with success status, generated method name, parameter list, return type, method location details, modified file content, and any warnings or conflicts detected during the refactoring process' as PromptPart;