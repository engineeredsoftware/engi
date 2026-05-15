import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode LSP measurement example for Read definition evidence"
 * current_version: "0.50.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLEXAMPLE1: PromptPart =
  'Measure Read definition evidence: getDefinition({ query: "settlement verifier", file, position })' as PromptPart;
