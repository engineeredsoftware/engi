import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameter description for write_code_changes_to_vcs"
 * current_version: "GA1.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_WRITECODECHANGESVCS_DOCCODETOOLPARAMETERS: PromptPart =
  `Parameters:
- operation (enum, required): 'createRepository' or 'createOrUpdateFile'
- accessToken (string, required): GitHub token with repo scope
- owner/repo/path/content/message (strings, conditional): Required for createOrUpdateFile
- branch (string, optional): Branch to commit against
- name/description/private (fields, optional): Used for createRepository` as PromptPart;