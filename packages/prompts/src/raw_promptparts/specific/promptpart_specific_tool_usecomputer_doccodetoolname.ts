import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Tool name for internal Bitcode Read-measurement computer-use shell primitive"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "clarity", "test": "Does '{{content}}' clearly identify the tool?", "score": 0.50 },
 *   { "name": "consistency", "test": "Is the name consistent with other tool names?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLNAME: PromptPart =
  'use-computer' as PromptPart;
