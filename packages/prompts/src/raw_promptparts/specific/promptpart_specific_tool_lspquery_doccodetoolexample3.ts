import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "LSP Query example 3"
 * current_version: "GA1.50.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLEXAMPLE3: PromptPart =
  'Navigate to implementation: getHover({ symbol: "interface", file, position })' as PromptPart;
