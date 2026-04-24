import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capabilities for Delete File tool"
 * current_version: "V26.50.0"
 * versions: []
 */
export const PROMPTPART_SPECIFIC_TOOL_DELETEFILE_DOCCODETOOLCAPABILITIES: PromptPart =
  'Atomic deletion, existence validation, optional backup creation, dependency checks, rollback on failure, and consistent transaction semantics' as PromptPart;
