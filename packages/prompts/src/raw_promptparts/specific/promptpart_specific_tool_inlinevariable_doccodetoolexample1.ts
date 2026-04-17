/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "First example demonstrating inline variable tool usage"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' provide a clear usage example? Rate 0-1" },
 *   { "name": "realistic_scenario", "test": "Is '{{content}}' a realistic variable inlining scenario? Rate 0-1" },
 *   { "name": "simplification_demonstration", "test": "Does '{{content}}' demonstrate code simplification? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_INLINEVARIABLE_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Inlining a temporary variable in a calculation function: replaces "const result = data.length * 2" used once with direct expression, removing unnecessary intermediate variable and improving code flow readability' as PromptPart;