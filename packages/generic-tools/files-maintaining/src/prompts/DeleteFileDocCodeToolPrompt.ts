import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';

import { PROMPTPART_SPECIFIC_TOOL_DELETEFILE_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_deletefile_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_DELETEFILE_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_deletefile_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_DELETEFILE_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_deletefile_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_DELETEFILE_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_deletefile_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_DELETEFILE_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_deletefile_doccodetooloutput';

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

/**
 * Delete File tool-specific DocCodeToolPrompt
 *
 * @doc-comment-developing-promptdevelopment
 * domain: tool
 * intent: "Bitcode written-asset file mutation support prompt for atomic file deletion"
 * current_version: "V26"
 * versions: []
 */
export class DeleteFileDocCodeToolPrompt extends DocCodeToolPrompt {
  constructor() {
    super();

    this.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL);
    this.set('purpose:label', PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL);
    this.set('capabilities:label', PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL);
    this.set('parameters:label', PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL);
    this.set('output:label', PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL);

    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_DELETEFILE_DOCCODETOOLNAME);
    this.set('metadata:category', 'written-asset-file-mutation' as PromptPart);
    this.set('metadata:version', 'V26' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);

    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_DELETEFILE_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_DELETEFILE_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_DELETEFILE_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_DELETEFILE_DOCCODETOOLOUTPUT);
  }
}

export const DELETE_FILE_DOC_CODE_TOOL_PROMPT = new DeleteFileDocCodeToolPrompt();
