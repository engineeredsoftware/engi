/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: migration
 * intent: "Migration guide from deprecated git-interactor to VCS tools"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "import_replacement", "test": "Does '{{content}}' clearly specify the import replacement path? Rate 0-1" },
 *   { "name": "provider_support", "test": "Does '{{content}}' list all supported providers (GitHub, GitLab, Bitbucket)? Rate 0-1" },
 *   { "name": "api_consistency", "test": "Does '{{content}}' mention the consistent APIs benefit? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLMIGRATION: PromptPart = 
  'MIGRATION GUIDE: Replace all git-interactor imports with @engi/generic-tools/vcs. The VCS abstraction provides provider-agnostic operations supporting GitHub, GitLab, and Bitbucket with consistent APIs.' as PromptPart;