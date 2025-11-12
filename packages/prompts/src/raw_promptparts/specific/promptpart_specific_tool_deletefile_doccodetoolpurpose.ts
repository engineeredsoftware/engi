import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Purpose for Delete File tool"
 * current_version: "GA1.50.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_DELETEFILE_DOCCODETOOLPURPOSE: PromptPart =
  'Remove a file atomically with safety checks, optional backup, and rollback capability for reliable file management' as PromptPart;
