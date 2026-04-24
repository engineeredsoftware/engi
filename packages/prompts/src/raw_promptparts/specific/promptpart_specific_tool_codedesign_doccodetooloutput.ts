import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output contract for code_design"
 * current_version: "V26.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_CODEDESIGN_DOCCODETOOLOUTPUT: PromptPart =
  `Output:
- update (string): Markdown summary containing task list and diff stubs
- latest_design (string | null): PRODUCT.md snapshot used for planning
- metadata: taskCount, fileCount, aiDocument, prepared context stats` as PromptPart;