import { Tool } from '@bitcode/tools-generics';
import type { Prompt } from '@bitcode/prompts';
import { multimodalProcessingTool } from '@bitcode/generic-tools-multimodal-processing';
import { multimodalProcessingDocCodeToolPrompt as MULTIMODAL_PROMPT } from '@bitcode/generic-tools-multimodal-processing';


import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_METADATA_PIPELINE as DP_PIPELINE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_deliverables_metadata_pipeline';
import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_METADATA_PHASE_SETUP as DP_PHASE_SETUP } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_deliverables_metadata_phase_setup';
import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_SPECIFIC_TOOL_DELIVERABLES_PDFCOMPREHENSION_DOCCODETOOL_CAPABILITIES_ADDENDUM } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_deliverables_pdfcomprehension_doccodetool_capabilities_addendum';

const OVERLAY: Prompt = (() => {
  const p = MULTIMODAL_PROMPT.clone();
  p.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL as any, 5);
  p.set('metadata:pipeline', DP_PIPELINE as any, 5);
  p.set('metadata:phase', DP_PHASE_SETUP as any, 5);
  p.set('capabilities:deliverables:addendum', PROMPTPART_SPECIFIC_TOOL_DELIVERABLES_PDFCOMPREHENSION_DOCCODETOOL_CAPABILITIES_ADDENDUM as any, 5);
  return p;
})();

export const DP_PDF_TOOL_PROMPT: Prompt = (() => {
  const m = MULTIMODAL_PROMPT.clone();
  m.merge(OVERLAY);
  return m;
})();

/**
 * @doc-code-tool
 * @prompt DP_PDF_TOOL_PROMPT
 */
export class DeliverablePipelinePDFComprehensionTool extends Tool<typeof multimodalProcessingTool.use> {
  use = (input: Parameters<typeof multimodalProcessingTool.use>[0]) => multimodalProcessingTool.use(input);
}

export const deliverablePipelinePDFComprehensionTool = new DeliverablePipelinePDFComprehensionTool();
(deliverablePipelinePDFComprehensionTool as any).name = 'deliverable-pipeline-pdf-comprehension-tool';
