import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_METADATA_PIPELINE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_deliverables_metadata_pipeline';
import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_METADATA_PHASE_SETUP } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_deliverables_metadata_phase_setup';
import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_PURPOSE_ADDENDUM } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_deliverables_purpose_addendum';
import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_CAPABILITIES_ADDENDUM } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_deliverables_capabilities_addendum';
/**
 * Deliverable Pipeline - Clone VCS Repository Tool (Wrapper)
 *
 * Wraps the generic cloneRepositoryTool and attaches a Deliverables-specific
 * DocCodeToolPrompt. Prompt registry supports two operations: override and
 * append. Here we append Deliverables-specific entries to the generic
 * RepositorySetup prompt.
 */

import { Tool } from '@bitcode/tools-generics';
import type { Prompt } from '@bitcode/prompts';

// Base generic tool + its DocCodeToolPrompt
import {
  cloneRepositoryTool,
  REPOSITORY_SETUP_DOC_CODE_TOOL_PROMPT,
} from '@bitcode/generic-tools-repository-setup';

// PromptParts for Deliverables overlay



// Build an append Prompt in-place using the Prompt API
const DELIVERABLES_CLONE_REPOSITORY_TOOL_OVERLAY_PROMPT: Prompt = (() => {
  const p = REPOSITORY_SETUP_DOC_CODE_TOOL_PROMPT.clone();
  // Deliverables-specific cumulative additions under child paths (append semantics)
  p.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL as any, 5);
  p.set('metadata:pipeline', PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_METADATA_PIPELINE as any, 5);
  p.set('metadata:phase', PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_METADATA_PHASE_SETUP as any, 5);
  p.set('purpose:deliverables:addendum', PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_PURPOSE_ADDENDUM as any, 5);
  p.set('capabilities:deliverables:addendum', PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_CAPABILITIES_ADDENDUM as any, 5);
  return p;
})();

// Merge by cloning base and appending entries (registry capability)
export const DELIVERABLES_CLONE_REPOSITORY_TOOL_PROMPT: Prompt = (() => {
  const merged = REPOSITORY_SETUP_DOC_CODE_TOOL_PROMPT.clone();
  merged.merge(DELIVERABLES_CLONE_REPOSITORY_TOOL_OVERLAY_PROMPT);
  return merged;
})();

/**
 * Deliverables wrapper – delegates to the generic tool implementation,
 * but carries Deliverables-specific doc-code prompt via @doc-code-tool.
 */
/**
 * @doc-code-tool
 * @prompt DELIVERABLES_CLONE_REPOSITORY_TOOL_PROMPT
 */
export class DeliverablePipelineCloneVCSRepositoryTool extends Tool<typeof cloneRepositoryTool.use> {
  use = (...args: Parameters<typeof cloneRepositoryTool.use>) => cloneRepositoryTool.use(...args as any);
}

// Create instance and assign a stable registry key used by agents
export const deliverablePipelineCloneVCSRepositoryTool = new DeliverablePipelineCloneVCSRepositoryTool();
// Ensure initializeDeliverablePipeline registers this tool under a clear name
(deliverablePipelineCloneVCSRepositoryTool as any).name = 'deliverable-pipeline-clone-vcs-repository-tool';
