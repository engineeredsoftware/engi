/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Third example demonstrating inline variable tool usage"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' provide a clear usage example? Rate 0-1" },
 *   { "name": "realistic_scenario", "test": "Is '{{content}}' a realistic variable inlining scenario? Rate 0-1" },
 *   { "name": "complex_expression_demonstration", "test": "Does '{{content}}' demonstrate complex expression inlining? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_INLINEVARIABLE_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Refactoring an API response handler: inlines "const processedData = response.data.map(item => item.value).filter(Boolean)" used immediately in return statement, streamlining data processing pipeline and removing intermediary assignment' as PromptPart;