import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capabilities summary for design_code"
 * current_version: "V26.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_DESIGNCODE_DOCCODETOOLCAPABILITIES: PromptPart =
  `Capabilities:
- Normalize idea bullet points into PRODUCT.md sections
- Optionally refresh PRODUCT.md via repository digest before applying edits
- Deduplicate existing "Proposed Updates" bullets
- Track whether digest regeneration succeeded for downstream agents` as PromptPart;