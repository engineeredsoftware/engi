/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for repository setup tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "name_clarity", "test": "Does '{{content}}' clearly indicate repo setup? Rate 0-1", "score": 0.5 },
 *   { "name": "init_signal", "test": "Does '{{content}}' imply initialization/configuration? Rate 0-1", "score": 0.5 }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';
export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLNAME: PromptPart =
  'Repository Setup Tool' as PromptPart;
