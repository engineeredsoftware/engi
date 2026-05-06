import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output contract for design_code"
 * current_version: "V26.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_DESIGNCODE_DOCCODETOOLOUTPUT: PromptPart =
  `Output:
- update (string): Markdown section describing the proposed changes
- latest_design (string): Fully updated PRODUCT.md content
- metadata: taskCount, created flag, digestUsed, digestError, evidenceDocument, prepared context info` as PromptPart;