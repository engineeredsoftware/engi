import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode LSP measurement example for proof-replay hover evidence"
 * current_version: "0.50.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLEXAMPLE3: PromptPart =
  'Measure proof-replay hover evidence: getHover({ symbol: "AssetPackReceipt", file, position })' as PromptPart;
