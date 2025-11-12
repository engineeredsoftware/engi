/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Example showing repository clone migration from deprecated to VCS"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "migration_clarity", "test": "Does '{{content}}' clearly show how to migrate from cloneRepositoryTool to vcsTools? Rate 0-1" },
 *   { "name": "parameter_mapping", "test": "Does '{{content}}' show the parameter mapping including provider specification? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Example 1 - DEPRECATED repository clone: Use vcsTools.cloneRepository({ provider: "github", owner, repo, branch }) instead of cloneRepositoryTool' as PromptPart;