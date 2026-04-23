/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Demonstrates locating prompt/tool owners as repository evidence that grounds a Bitcode inference run"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "regex_accuracy", "test": "Does '{{content}}' show accurate regex pattern usage? Rate 0-1", "score": 0.50 },
 *   { "name": "owner_grounding", "test": "Is the pattern effective for finding prompt/tool owners? Rate 0-1", "score": 0.50 },
 *   { "name": "evidence_value", "test": "Does the example teach need-grounding evidence collection? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Locate prompt/tool owners as repository evidence: simpleSystemTextSearch({ pattern: "DocCodeToolPrompt|ToolExecution|PromptPart", cwd: "/repo/packages", ignoreCase: false, maxResults: 100 })' as PromptPart;
