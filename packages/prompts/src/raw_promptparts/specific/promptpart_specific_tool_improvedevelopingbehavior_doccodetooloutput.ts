import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output contract for improve_developing_behavior"
 * current_version: "GA1.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_IMPROVEDEVELOPINGBEHAVIOR_DOCCODETOOLOUTPUT: PromptPart =
  `Output:
- updates (string): Markdown snippet ready to append to .ai/AGENTS.md
- metadata: aiDocument reference, instruction/seeking counts, digest usage flags` as PromptPart;