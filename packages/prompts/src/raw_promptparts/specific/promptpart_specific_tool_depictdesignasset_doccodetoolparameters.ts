import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameter description for depict_design_asset"
 * current_version: "GA1.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_DEPICTDESIGNASSET_DOCCODETOOLPARAMETERS: PromptPart =
  `Parameters:
- assetData (string, required): Base64 or UTF-8 encoded asset payload
- focus (string, optional): Emphasize a specific UX or component detail
- notes (string, optional): Freeform hints from the author to include inline` as PromptPart;