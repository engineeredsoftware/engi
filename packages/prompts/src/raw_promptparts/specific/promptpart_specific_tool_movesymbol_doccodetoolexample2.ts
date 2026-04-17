/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Second example demonstrating move symbol tool usage"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' provide a clear usage example? Rate 0-1" },
 *   { "name": "realistic_scenario", "test": "Is '{{content}}' a realistic symbol movement scenario? Rate 0-1" },
 *   { "name": "class_demonstration", "test": "Does '{{content}}' demonstrate class movement? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_MOVESYMBOL_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Reorganizing architecture by moving "UserService" class to dedicated services directory: transfers class with all methods, updates 12 import statements, resolves circular dependencies, improves module organization and separation of concerns' as PromptPart;