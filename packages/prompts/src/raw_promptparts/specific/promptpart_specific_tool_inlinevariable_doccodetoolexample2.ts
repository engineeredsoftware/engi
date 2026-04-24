/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Second example demonstrating inline variable tool usage"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' provide a clear usage example? Rate 0-1" },
 *   { "name": "realistic_scenario", "test": "Is '{{content}}' a realistic variable inlining scenario? Rate 0-1" },
 *   { "name": "boolean_demonstration", "test": "Does '{{content}}' demonstrate boolean variable inlining? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_INLINEVARIABLE_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Simplifying a boolean check in a React component: inlines "const isValid = user && user.id > 0" used in single condition, replacing with direct expression in JSX, reducing cognitive load and eliminating unnecessary variable declaration' as PromptPart;