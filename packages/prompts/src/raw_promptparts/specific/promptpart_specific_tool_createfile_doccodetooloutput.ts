import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output schema for Create File tool"
 * current_version: "GA1.50.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_CREATEFILE_DOCCODETOOLOUTPUT: PromptPart =
  'Returns: { success: boolean; createdPath?: string; transactionId?: string; error?: string }' as PromptPart;
