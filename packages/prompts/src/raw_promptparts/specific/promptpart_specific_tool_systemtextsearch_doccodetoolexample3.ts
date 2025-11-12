/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Demonstrates package import search with directory targeting for dependency analysis"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "targeting_precision", "test": "Does '{{content}}' show precise directory targeting? Rate 0-1", "score": 0.50 },
 *   { "name": "import_pattern_accuracy", "test": "Is the import pattern accurate and comprehensive? Rate 0-1", "score": 0.50 },
 *   { "name": "dependency_analysis_value", "test": "Does the example support effective dependency analysis? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Example 3 - Find imports from specific package: simpleSystemTextSearch({ pattern: "from.*@engi/prompts", directory: "/packages" })' as PromptPart;