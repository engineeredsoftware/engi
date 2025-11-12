import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capabilities summary for depict_design_asset"
 * current_version: "GA1.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_DEPICTDESIGNASSET_DOCCODETOOLCAPABILITIES: PromptPart =
  `Capabilities:
- Narrate UI wireframes, flows, and diagrams from encoded assets
- Highlight layout, typography, and interaction affordances
- Preserve author-provided focus/notes for downstream reasoning
- Return deterministic prose suitable for PRODUCT.md citations` as PromptPart;