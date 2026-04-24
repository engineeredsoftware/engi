import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';

import { PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_usecomputer_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_usecomputer_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_usecomputer_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_usecomputer_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_usecomputer_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_usecomputer_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_usecomputer_doccodetoolexample2';

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

/**
 * Use Computer tool-specific DocCodeToolPrompt
 *
 * @doc-comment-developing-promptdevelopment
 * domain: tool
 * intent: "Shell command execution tool documentation for runtime attachment via doc-code"
 * current_version: "V26.50.0"
 * versions: []
 * dependencies: {
 *   "PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLNAME": "V26.50.0",
 *   "PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLPURPOSE": "V26.50.0"
 * }
 */
export class UseComputerDocCodeToolPrompt extends DocCodeToolPrompt {
  constructor() {
    super();

    // Labels
    this.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL);
    this.set('purpose:label', PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL);
    this.set('capabilities:label', PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL);
    this.set('parameters:label', PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL);
    this.set('output:label', PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL);
    this.set('examples:label', PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL);

    // Metadata
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLNAME);
    this.set('metadata:category', 'system-execution' as PromptPart);
    this.set('metadata:version', 'V26.50.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);

    // Sections
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLOUTPUT);

    // Examples
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLEXAMPLE2);
  }
}

export const USE_COMPUTER_DOC_CODE_TOOL_PROMPT = new UseComputerDocCodeToolPrompt();

