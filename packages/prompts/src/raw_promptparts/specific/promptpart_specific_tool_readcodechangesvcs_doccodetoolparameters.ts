import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameter description for read_code_changes_from_vcs"
 * current_version: "V26.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_READCODECHANGESVCS_DOCCODETOOLPARAMETERS: PromptPart =
  `Parameters:
- accessToken (string, required): GitHub token with repo scope
- owner (string, required): Repository owner or organisation
- repo (string, required): Repository name
- branch (string, optional): Branch ref to inspect (default default branch)
- limit (number, optional): Maximum commits to include (1-50)` as PromptPart;