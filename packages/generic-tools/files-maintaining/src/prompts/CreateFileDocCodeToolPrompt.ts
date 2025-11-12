import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';

import { PROMPTPART_SPECIFIC_TOOL_CREATEFILE_DOCCODETOOLNAME } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_createfile_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_CREATEFILE_DOCCODETOOLPURPOSE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_createfile_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_CREATEFILE_DOCCODETOOLCAPABILITIES } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_createfile_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_CREATEFILE_DOCCODETOOLPARAMETERS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_createfile_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_CREATEFILE_DOCCODETOOLOUTPUT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_createfile_doccodetooloutput';

import { DocCodeToolPrompt } from '@engi/tools-generics';
import { PromptPart } from '@engi/prompts';

/**
 * Create File tool-specific DocCodeToolPrompt
 *
 * @doc-comment-developing-promptdevelopment
 * domain: tool
 * intent: "Atomic file creation tool documentation"
 * current_version: "GA1.50.0"
 * versions: []
 */
export class CreateFileDocCodeToolPrompt extends DocCodeToolPrompt {
  constructor() {
    super();

    this.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL);
    this.set('purpose:label', PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL);
    this.set('capabilities:label', PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL);
    this.set('parameters:label', PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL);
    this.set('output:label', PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL);

    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_CREATEFILE_DOCCODETOOLNAME);
    this.set('metadata:category', 'file-system' as PromptPart);
    this.set('metadata:version', 'GA1.50.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);

    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_CREATEFILE_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_CREATEFILE_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_CREATEFILE_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_CREATEFILE_DOCCODETOOLOUTPUT);
  }
}

export const CREATE_FILE_DOC_CODE_TOOL_PROMPT = new CreateFileDocCodeToolPrompt();

