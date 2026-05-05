/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameters description for VCS and Git interactor repository operations"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "boundary_notice", "test": "Does '{{content}}' start with a clear parameter boundary? Rate 0-1" },
 *   { "name": "vcs_redirect", "test": "Does '{{content}}' direct users to VCS tools documentation? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLPARAMETERS: PromptPart = 
  'Provide provider, authentication boundary, repository coordinates, and operation-specific fields. Use provider-generic VCS parameter names for VCS tools and Git-shaped field aliases only when calling the Git interactor bridge.' as PromptPart;
