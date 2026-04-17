/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Third example demonstrating organize imports tool usage"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' provide a clear usage example? Rate 0-1" },
 *   { "name": "realistic_scenario", "test": "Is '{{content}}' a realistic import organization scenario? Rate 0-1" },
 *   { "name": "large_scale_demonstration", "test": "Does '{{content}}' demonstrate large-scale import organization? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Organizing imports across an entire project module with 25 files: applies consistent sorting rules, removes 18 unused imports, standardizes import syntax, groups external vs internal dependencies, reducing overall bundle size by 8% and improving build time by 15%' as PromptPart;