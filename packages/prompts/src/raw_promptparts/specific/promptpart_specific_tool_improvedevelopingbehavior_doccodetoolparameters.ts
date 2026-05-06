import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameter description for improve_developing_behavior"
 * current_version: "V26.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_IMPROVEDEVELOPINGBEHAVIOR_DOCCODETOOLPARAMETERS: PromptPart =
  `Parameters:
- behaviorImprovement (string, required): Notes about desired development behavior updates
- currentAgentsMd (string, optional): Existing AGENTS.md to edit
- regenerateFromDigest (boolean, optional): Rehydrate AGENTS.md from digest before merging changes` as PromptPart;