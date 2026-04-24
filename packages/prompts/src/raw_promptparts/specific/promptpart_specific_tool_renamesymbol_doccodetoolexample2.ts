/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: example
 * intent: "Complex rename with conflict example"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "conflict_handling", "test": "Does '{{content}}' demonstrate how conflicts are handled? Rate 0-1" },
 *   { "name": "rollback_clarity", "test": "Is the rollback behavior clear from '{{content}}'? Rate 0-1" },
 *   { "name": "safety_demonstration", "test": "Does '{{content}}' show the safety features of atomic mode? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2: Rename with conflict detection\nInput: { filePath: "/src/models/User.ts", position: { line: 10, column: 6 }, newName: "id", atomic: true, validateReferences: true }\nOutput: Rename failed - conflict detected: Symbol "id" already exists in 3 locations. Rollback completed. Suggested alternatives: userId, identifier, userIdentifier' as PromptPart;