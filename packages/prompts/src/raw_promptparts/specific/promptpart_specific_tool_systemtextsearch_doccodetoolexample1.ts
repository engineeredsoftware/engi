/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Demonstrates finding need and AssetPack source references before Bitcode synthesis"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "example_completeness", "test": "Does '{{content}}' provide a complete, realistic example? Rate 0-1", "score": 0.50 },
 *   { "name": "implementation_clarity", "test": "Can developers follow the example to implement the tool? Rate 0-1", "score": 0.50 },
 *   { "name": "practical_relevance", "test": "Does the example address common search scenarios? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Find need and AssetPack source references: simpleSystemTextSearch({ pattern: ["needDescription", "assetPack"], cwd: "/repo", maxResults: 50 })' as PromptPart;
