/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameters description for deprecated git-interactor"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "deprecation_notice", "test": "Does '{{content}}' start with deprecation notice? Rate 0-1" },
 *   { "name": "vcs_redirect", "test": "Does '{{content}}' direct users to VCS tools documentation? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_VCS_DOCCODETOOLPARAMETERS: PromptPart = 
  'DEPRECATED: Tool-specific parameters vary. See VCS tools documentation for modern equivalent operations.' as PromptPart;