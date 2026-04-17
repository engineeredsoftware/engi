/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: example
 * intent: "Error handling example for extract method tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "error_demonstration", "test": "Does '{{content}}' show error handling and edge cases? Rate 0-1" },
 *   { "name": "validation_showcase", "test": "Does '{{content}}' demonstrate tool validation capabilities? Rate 0-1" },
 *   { "name": "failure_guidance", "test": "Does '{{content}}' provide guidance for failed extractions? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3: Extraction with dependency conflicts\nInput: { filePath: "/src/data/processor.ts", startLine: 78, endLine: 85, methodName: "processData" }\nOutput: Warning: Selected code contains unresolvable dependencies on local variables (tempCache, connectionPool). Suggest expanding selection to include variable declarations or refactor variable scope before extraction.' as PromptPart;