/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Example showing basic file update operation"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_clarity", "test": "Does '{{content}}' clearly show how to update a file? Rate 0-1", "score": 0.50 },
 *   { "name": "common_use_case", "test": "Does '{{content}}' represent a common editing scenario? Rate 0-1", "score": 0.50 },
 *   { "name": "parameter_usage", "test": "Does '{{content}}' demonstrate proper parameter usage? Rate 0-1", "score": 0.50 }
 * ]
 */
import type { PromptPart } from '../../parts/PromptPart';
export declare const PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLEXAMPLE1: PromptPart;
