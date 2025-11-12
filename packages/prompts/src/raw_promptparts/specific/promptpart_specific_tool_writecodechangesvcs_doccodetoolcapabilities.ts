import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capabilities summary for write_code_changes_to_vcs"
 * current_version: "GA1.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_WRITECODECHANGESVCS_DOCCODETOOLCAPABILITIES: PromptPart =
  `Capabilities:
- Create repositories with optional description and privacy flags
- Create or update files via GitHub Contents API
- Auto-detect existing file SHAs to support edits vs. creations
- Return raw GitHub API responses for downstream auditing` as PromptPart;