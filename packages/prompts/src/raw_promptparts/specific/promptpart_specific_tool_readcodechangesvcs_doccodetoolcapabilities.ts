import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capabilities summary for read_code_changes_from_vcs"
 * current_version: "GA1.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_READCODECHANGESVCS_DOCCODETOOLCAPABILITIES: PromptPart =
  `Capabilities:
- Authenticate against GitHub using a repo-scoped token
- List recent commits for an owner/repo (optionally branch + limit)
- Return talking points describing author, SHA, message, and URL for each commit` as PromptPart;