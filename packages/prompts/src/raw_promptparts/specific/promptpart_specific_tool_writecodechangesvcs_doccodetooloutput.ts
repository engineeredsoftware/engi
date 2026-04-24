import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output contract for write_code_changes_to_vcs"
 * current_version: "V26.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_WRITECODECHANGESVCS_DOCCODETOOLOUTPUT: PromptPart =
  `Output:
- result (object): Raw GitHub API response (repository or file commit)
- metadata.operation (string): Operation performed
- metadata.sha (string | undefined): New file SHA when applicable` as PromptPart;