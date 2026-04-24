import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Purpose statement for write_code_changes_to_vcs"
 * current_version: "V26.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_WRITECODECHANGESVCS_DOCCODETOOLPURPOSE: PromptPart =
  'Perform scoped GitHub mutations—creating repositories or updating files—once the user confirms the desired write.' as PromptPart;