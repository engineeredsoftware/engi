import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "LSP Query example 1"
 * current_version: "GA1.50.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLEXAMPLE1: PromptPart =
  'Find all function definitions: getDefinition({ query: "function", file, position })' as PromptPart;
