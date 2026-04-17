/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool semantic unit: Createcomment Doccodetoolname"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';
export const PROMPTPART_SPECIFIC_TOOL_CREATECOMMENT_DOCCODETOOLNAME: PromptPart =
  'Create Comment Tool' as PromptPart;
