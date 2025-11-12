/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for deprecated git-interactor explaining migration"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "deprecation_clarity", "test": "Does the purpose '{{content}}' make it immediately clear this is deprecated? Rate 0-1" },
 *   { "name": "migration_path", "test": "Does '{{content}}' clearly indicate where to find the modern replacement (VCS tools)? Rate 0-1" },
 *   { "name": "github_limitation", "test": "Does '{{content}}' explain the GitHub-specific limitation that led to deprecation? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLPURPOSE: PromptPart = 
  'DEPRECATED: Legacy GitHub-specific Git operations. All functionality has been migrated to VCS tools for multi-provider support. Use @engi/generic-tools/vcs instead.' as PromptPart;