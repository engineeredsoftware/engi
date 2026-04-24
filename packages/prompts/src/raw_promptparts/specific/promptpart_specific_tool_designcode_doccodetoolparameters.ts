import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameter description for design_code"
 * current_version: "V26.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_DESIGNCODE_DOCCODETOOLPARAMETERS: PromptPart =
  `Parameters:
- ideas (string, required): New requirements or observations, one per line
- currentProductMd (string, optional): Snapshot of existing PRODUCT.md to diff against
- regenerateFromDigest (boolean, optional): Force a fresh digest render before merging ideas` as PromptPart;