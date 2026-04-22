/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "First example demonstrating organize imports tool usage"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' provide a clear usage example? Rate 0-1" },
 *   { "name": "realistic_scenario", "test": "Is '{{content}}' a realistic import organization scenario? Rate 0-1" },
 *   { "name": "cleanup_demonstration", "test": "Does '{{content}}' demonstrate import cleanup capabilities? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Cleaning up a React component file with 15 mixed imports: organizes into groups (React, third-party, internal), removes 3 unused imports, sorts alphabetically within groups, resulting in 40% cleaner import section' as PromptPart;