/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing shallow clone with specific commit"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "shallow_clone_demo", "test": "Does '{{content}}' demonstrate shallow cloning features? Rate 0-1" },
 *   { "name": "commit_specificity", "test": "Does '{{content}}' show cloning specific commits? Rate 0-1" },
 *   { "name": "performance_optimization", "test": "Does '{{content}}' illustrate performance optimization options? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2 - Shallow clone specific commit: cloneRepositoryTool({ provider: "gitlab", owner: "gitlab-org", name: "gitlab", ref: "abc123def", connectionId: 67890, shallow: true, depth: 10 })' as PromptPart;