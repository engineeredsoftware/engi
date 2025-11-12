/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: example
 * intent: "Basic rename example for rename symbol tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' clearly show how to use the rename symbol tool? Rate 0-1" },
 *   { "name": "common_use_case", "test": "Does '{{content}}' represent a typical rename scenario? Rate 0-1" },
 *   { "name": "result_demonstration", "test": "Does '{{content}}' show expected output clearly? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1: Rename a function across the codebase\nInput: { filePath: "/src/utils/helpers.ts", position: { line: 5, column: 10 }, newName: "calculateTotalPrice", atomic: true }\nOutput: Successfully renamed getUserData to calculateTotalPrice in 15 files with 42 total occurrences updated. No conflicts detected.' as PromptPart;