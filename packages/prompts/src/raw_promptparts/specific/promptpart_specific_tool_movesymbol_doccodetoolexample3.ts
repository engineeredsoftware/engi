/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Third example demonstrating move symbol tool usage"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' provide a clear usage example? Rate 0-1" },
 *   { "name": "realistic_scenario", "test": "Is '{{content}}' a realistic symbol movement scenario? Rate 0-1" },
 *   { "name": "interface_demonstration", "test": "Does '{{content}}' demonstrate interface/type movement? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_MOVESYMBOL_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Extracting shared TypeScript interfaces to common types file: moves "ApiResponse" and "UserProfile" interfaces from component files to types module, updates 15 import statements across frontend and backend, consolidates type definitions for better maintainability' as PromptPart;