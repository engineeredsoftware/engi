import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output contract for depict_design_asset"
 * current_version: "GA1.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_DEPICTDESIGNASSET_DOCCODETOOLOUTPUT: PromptPart =
  `Output:
- depiction (string): Natural language description of the asset
- metadata.focus (string | null): Echoed focus directive
- metadata.bytes (number): Estimated payload size for provenance` as PromptPart;