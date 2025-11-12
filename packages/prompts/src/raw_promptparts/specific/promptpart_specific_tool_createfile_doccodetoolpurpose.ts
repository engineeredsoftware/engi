import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Purpose for Create File tool"
 * current_version: "GA1.50.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_CREATEFILE_DOCCODETOOLPURPOSE: PromptPart =
  'Create a new file with atomic safety, directory creation as needed, conflict detection, and optional initial content and permissions' as PromptPart;
