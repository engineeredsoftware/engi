/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "First example demonstrating move symbol tool usage"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' provide a clear usage example? Rate 0-1" },
 *   { "name": "realistic_scenario", "test": "Is '{{content}}' a realistic symbol movement scenario? Rate 0-1" },
 *   { "name": "utility_demonstration", "test": "Does '{{content}}' demonstrate utility function movement? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_MOVESYMBOL_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Moving a utility function from main component file to shared utils module: relocates "formatCurrency" function, updates 8 import statements across project files, maintains all references and type safety' as PromptPart;