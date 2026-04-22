import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
/**
 * Deliverable Pipeline - Multimodal Processing Tool (Wrapper)
 *
 * Wraps the generic multimodalProcessingTool and attaches a Deliverables-specific
 * DocCodeToolPrompt overlay providing pipeline/phase metadata.
 */

import { Tool } from '@bitcode/tools-generics';
import type { Prompt } from '@bitcode/prompts/prompt';

import { multimodalProcessingTool } from '@bitcode/generic-tools-multimodal-processing';
import { multimodalProcessingDocCodeToolPrompt as MULTIMODAL_PROCESSING_DOC_CODE_TOOL_PROMPT } from '@bitcode/generic-tools-multimodal-processing';


import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_METADATA_PIPELINE as PROMPTPART_SPECIFIC_TOOL_DELIVERABLES_METADATA_PIPELINE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_deliverables_metadata_pipeline';
import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_METADATA_PHASE_SETUP as PROMPTPART_SPECIFIC_TOOL_DELIVERABLES_METADATA_PHASE_SETUP } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_deliverables_metadata_phase_setup';

const DELIVERABLES_MULTIMODAL_TOOL_OVERLAY_PROMPT: Prompt = (() => {
  const p = MULTIMODAL_PROCESSING_DOC_CODE_TOOL_PROMPT.clone();
  p.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL as any, 5);
  p.set('metadata:pipeline', PROMPTPART_SPECIFIC_TOOL_DELIVERABLES_METADATA_PIPELINE as any, 5);
  p.set('metadata:phase', PROMPTPART_SPECIFIC_TOOL_DELIVERABLES_METADATA_PHASE_SETUP as any, 5);
  return p;
})();

export const DELIVERABLES_MULTIMODAL_TOOL_PROMPT: Prompt = (() => {
  const merged = MULTIMODAL_PROCESSING_DOC_CODE_TOOL_PROMPT.clone();
  merged.merge(DELIVERABLES_MULTIMODAL_TOOL_OVERLAY_PROMPT);
  return merged;
})();

/**
 * @doc-code-tool
 * @prompt DELIVERABLES_MULTIMODAL_TOOL_PROMPT
 */
export class DeliverablePipelineMultimodalProcessingTool extends Tool<typeof multimodalProcessingTool.use> {
  use = (input: Parameters<typeof multimodalProcessingTool.use>[0]) => multimodalProcessingTool.use(input);
}

export const deliverablePipelineMultimodalProcessingTool = new DeliverablePipelineMultimodalProcessingTool();
(deliverablePipelineMultimodalProcessingTool as any).name = 'deliverable-pipeline-multimodal-processing-tool';
