import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Purpose statement for the Bitcode design_code tool"
 * current_version: "GA1.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_DESIGNCODE_DOCCODETOOLPURPOSE: PromptPart =
  'Capture raw product ideas and fold them into `.ai/PRODUCT.md`, regenerating the baseline design document when requested.' as PromptPart;
