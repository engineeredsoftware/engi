/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: example
 * intent: "Type/interface rename example showing cross-file impact"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "type_rename_clarity", "test": "Does '{{content}}' show how type renaming works across files? Rate 0-1" },
 *   { "name": "import_update_demonstration", "test": "Does '{{content}}' show import statement updates? Rate 0-1" },
 *   { "name": "scale_indication", "test": "Does '{{content}}' indicate the scale of changes possible? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3: Rename TypeScript interface with import updates\nInput: { filePath: "/src/types/api.ts", position: { line: 1, column: 18 }, newName: "APIResponse", atomic: true }\nOutput: Renamed interface Response to APIResponse: Updated 127 files, 384 import statements modified, 512 type references updated. All TypeScript compilation checks passed.' as PromptPart;