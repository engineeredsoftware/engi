/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Example showing basic file update operation"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' clearly show how to update a file? Rate 0-1", "score": 0.50 },
 *   { "name": "common_use_case", "test": "Does '{{content}}' represent a common editing scenario? Rate 0-1", "score": 0.50 },
 *   { "name": "parameter_usage", "test": "Does '{{content}}' demonstrate proper parameter usage? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Update configuration file: textEditorTool({ filePath: "/config/app.json", operation: "search_replace", pattern: "debug: false", content: "debug: true" })' as PromptPart;