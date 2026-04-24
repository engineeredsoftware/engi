import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capabilities summary for code_design"
 * current_version: "V26.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_CODEDESIGN_DOCCODETOOLCAPABILITIES: PromptPart =
  `Capabilities:
- Decompose updates into numbered engineering tasks
- Generate diff-formatted TODO stubs per target file
- Reference the latest PRODUCT.md context to keep code aligned
- Capture guidance about missing file targets for follow-up planning` as PromptPart;