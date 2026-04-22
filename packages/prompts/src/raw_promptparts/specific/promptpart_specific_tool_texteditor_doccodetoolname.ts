/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for text editor tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "name_clarity", "test": "Does the name '{{content}}' clearly indicate this is a text/file editing tool? Rate 0-1", "score": 0.50 },
 *   { "name": "atomic_indication", "test": "Does '{{content}}' suggest atomic operations for file editing? Rate 0-1", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLNAME: PromptPart = 
  'Text Editor Tool' as PromptPart;