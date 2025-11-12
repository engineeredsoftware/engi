import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capabilities for Create File tool"
 * current_version: "GA1.50.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_CREATEFILE_DOCCODETOOLCAPABILITIES: PromptPart =
  'Atomic file creation, parent directory creation, content initialization, permission setting, conflict detection, and rollback on failure' as PromptPart;
