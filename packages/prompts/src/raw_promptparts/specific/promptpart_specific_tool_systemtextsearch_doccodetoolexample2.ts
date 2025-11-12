/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Demonstrates regex pattern for class definitions search"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "regex_accuracy", "test": "Does '{{content}}' show accurate regex pattern usage? Rate 0-1", "score": 0.50 },
 *   { "name": "pattern_effectiveness", "test": "Is the pattern effective for finding class definitions? Rate 0-1", "score": 0.50 },
 *   { "name": "educational_value", "test": "Does the example teach useful regex techniques? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Find class definitions: simpleSystemTextSearch({ pattern: "^class\\s+\\w+", caseSensitive: true })' as PromptPart;