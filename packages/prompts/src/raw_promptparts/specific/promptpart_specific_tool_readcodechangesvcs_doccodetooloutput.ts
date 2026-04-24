import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output contract for read_code_changes_from_vcs"
 * current_version: "V26.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_READCODECHANGESVCS_DOCCODETOOLOUTPUT: PromptPart =
  `Output:
- changes (string): Narrated summary plus bullet list of commits
- metadata.branch (string | null): Branch inspected
- metadata.commitCount (number): Number of commits returned
- metadata.urlSamples (string[]): Direct URLs to commit pages
- metadata.guidance (string): How to use the results in conversation` as PromptPart;