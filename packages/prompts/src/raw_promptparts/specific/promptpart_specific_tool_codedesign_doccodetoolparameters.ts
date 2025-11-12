import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameter description for code_design"
 * current_version: "GA1.00.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_CODEDESIGN_DOCCODETOOLPARAMETERS: PromptPart =
  `Parameters:
- update (string, required): High-level implementation plan or status
- latest_design (string, optional): PRODUCT.md excerpt to treat as the spec
- files[].path (string, optional): Explicit file to target
- files[].intent (string, optional): Why the change is needed per file` as PromptPart;