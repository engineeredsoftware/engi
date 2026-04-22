/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for Git interaction tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "name_clarity", "test": "Does '{{content}}' clearly indicate Git operations? Rate 0-1", "score": 0.5 },
 *   { "name": "vcs_signal", "test": "Does '{{content}}' unambiguously communicate VCS/Git? Rate 0-1", "score": 0.5 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';
export const PROMPTPART_SPECIFIC_TOOL_GITINTERACTOR_DOCCODETOOLNAME: PromptPart =
  'Git Interactor Tool' as PromptPart;
