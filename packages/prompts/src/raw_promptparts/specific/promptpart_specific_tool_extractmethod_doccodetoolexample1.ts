/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: example
 * intent: "Basic extraction example for extract method tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' clearly show how to use the extract method tool? Rate 0-1" },
 *   { "name": "common_use_case", "test": "Does '{{content}}' represent a typical extraction scenario? Rate 0-1" },
 *   { "name": "result_demonstration", "test": "Does '{{content}}' show expected output clearly? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1: Extract duplicate validation logic into a method\nInput: { filePath: "/src/user/validation.ts", startLine: 15, endLine: 22, methodName: "validateUserInput", targetLocation: "after" }\nOutput: Successfully extracted 8 lines into validateUserInput method with parameters (email: string, password: string) and return type boolean. Method placed after line 30.' as PromptPart;