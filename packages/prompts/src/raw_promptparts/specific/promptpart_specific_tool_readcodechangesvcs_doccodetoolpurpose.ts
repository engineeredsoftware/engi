import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Purpose statement for read_code_changes_from_vcs"
 * current_version: "GA1.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_READCODECHANGESVCS_DOCCODETOOLPURPOSE: PromptPart =
  'Summarize the latest Git commits so conversations can reference recent engineering motion before proposing new work.' as PromptPart;