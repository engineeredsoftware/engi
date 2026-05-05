/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for the Git interactor and VCS tools relationship"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "boundary_clarity", "test": "Does the purpose '{{content}}' make the Git/VCS boundary clear? Rate 0-1" },
 *   { "name": "provider_path", "test": "Does '{{content}}' clearly indicate when to use VCS tools? Rate 0-1" },
 *   { "name": "git_specificity", "test": "Does '{{content}}' explain the concrete Git operation role? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLPURPOSE: PromptPart = 
  'Use VCS tools for provider-generic repository operations and Git interactor tools when the Bitcode workflow is concretely Git-shaped, such as AssetPack pull request delivery, branch evidence, file evidence, and repository anchor reads.' as PromptPart;
