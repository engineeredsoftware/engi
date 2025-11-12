import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output schema for Delete File tool"
 * current_version: "GA1.50.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_DELETEFILE_DOCCODETOOLOUTPUT: PromptPart =
  'Returns: { success: boolean; backupPath?: string; transactionId?: string; error?: string }' as PromptPart;
