/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Second example demonstrating organize imports tool usage"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' provide a clear usage example? Rate 0-1" },
 *   { "name": "realistic_scenario", "test": "Is '{{content}}' a realistic import organization scenario? Rate 0-1" },
 *   { "name": "duplicate_handling", "test": "Does '{{content}}' demonstrate duplicate import handling? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Processing a TypeScript service file with duplicate imports and mixed formatting: consolidates 4 duplicate lodash imports, standardizes quote styles, groups by module type, removes 2 unused utilities, improving bundle efficiency by 12%' as PromptPart;