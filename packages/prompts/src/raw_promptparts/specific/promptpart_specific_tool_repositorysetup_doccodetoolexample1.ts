/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing basic GitHub repository clone"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "basic_usage", "test": "Does '{{content}}' demonstrate basic repository cloning? Rate 0-1" },
 *   { "name": "common_scenario", "test": "Does '{{content}}' represent a common GitHub cloning use case? Rate 0-1" },
 *   { "name": "parameter_clarity", "test": "Does '{{content}}' show clear parameter usage? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - Clone GitHub repository: cloneRepositoryTool({ provider: "github", owner: "microsoft", name: "typescript", ref: "main", connectionId: 12345 })' as PromptPart;