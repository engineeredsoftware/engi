import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "LSP Query example 2"
 * current_version: "GA1.50.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLEXAMPLE2: PromptPart =
  'Get symbol references: findReferences({ symbol: "MyClass", file, position })' as PromptPart;
