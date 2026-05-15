import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode LSP measurement example for AssetPack reference evidence"
 * current_version: "0.50.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLEXAMPLE2: PromptPart =
  'Measure AssetPack reference evidence: findReferences({ symbol: "ReadDescriptor", file, position })' as PromptPart;
