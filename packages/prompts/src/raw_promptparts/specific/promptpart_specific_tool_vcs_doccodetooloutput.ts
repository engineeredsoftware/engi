/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output description for VCS and Git interactor repository operations"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "error_clarity", "test": "Does '{{content}}' clearly indicate all operations throw errors? Rate 0-1" },
 *   { "name": "vcs_direction", "test": "Does '{{content}}' indicate errors direct to VCS tools? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLOUTPUT: PromptPart = 
  'Return provider-normalized repository, branch, file, pull request, issue, comment, or commit records. Unsupported provider capabilities fail closed with explicit current-boundary errors.' as PromptPart;
