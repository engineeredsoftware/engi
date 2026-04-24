/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: migration
 * intent: "Migration guide from deprecated git-interactor to VCS tools"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "import_replacement", "test": "Does '{{content}}' clearly specify the import replacement path? Rate 0-1" },
 *   { "name": "provider_support", "test": "Does '{{content}}' list all supported providers (GitHub, GitLab, Bitbucket)? Rate 0-1" },
 *   { "name": "api_consistency", "test": "Does '{{content}}' mention the consistent APIs benefit? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLMIGRATION: PromptPart = 
  'MIGRATION GUIDE: Replace all git-interactor imports with @bitcode/generic-tools/vcs. The VCS abstraction provides provider-agnostic operations supporting GitHub, GitLab, and Bitbucket with consistent APIs.' as PromptPart;