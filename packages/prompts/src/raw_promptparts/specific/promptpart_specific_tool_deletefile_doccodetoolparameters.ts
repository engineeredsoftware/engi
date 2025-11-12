import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameters for Delete File tool"
 * current_version: "GA1.50.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_DELETEFILE_DOCCODETOOLPARAMETERS: PromptPart =
  'path (string), backup (boolean, optional), transactionId (string, optional)' as PromptPart;
