/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output description for deprecated git-interactor"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "error_clarity", "test": "Does '{{content}}' clearly indicate all operations throw errors? Rate 0-1" },
 *   { "name": "vcs_direction", "test": "Does '{{content}}' indicate errors direct to VCS tools? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLOUTPUT: PromptPart = 
  'DEPRECATED: All operations throw deprecation errors directing to VCS tools.' as PromptPart;