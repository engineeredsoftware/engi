import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool name for Create File"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "clarity", "test": "Does '{{content}}' clearly identify the tool?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_CREATEFILE_DOCCODETOOLNAME: PromptPart =
  'create-file' as PromptPart;
