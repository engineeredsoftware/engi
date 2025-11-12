import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameters for Create File tool"
 * current_version: "GA1.50.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_CREATEFILE_DOCCODETOOLPARAMETERS: PromptPart =
  'path (string), content (string, optional), permissions (string|number, optional), overwrite (boolean, optional)' as PromptPart;
