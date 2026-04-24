/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Example showing file creation with content"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "creation_clarity", "test": "Does '{{content}}' clearly show how to create a new file? Rate 0-1", "score": 0.50 },
 *   { "name": "content_specification", "test": "Does '{{content}}' demonstrate content provision for new files? Rate 0-1", "score": 0.50 },
 *   { "name": "path_handling", "test": "Does '{{content}}' show proper file path handling? Rate 0-1", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3 - Create new component file: textEditorTool({ filePath: "/src/components/NewFeature.tsx", operation: "create", content: "import React from \'react\';\n\nexport const NewFeature: React.FC = () => {\n  return <div>New Feature</div>;\n};" })' as PromptPart;