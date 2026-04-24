import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createpullrequest_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createpullrequest_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createpullrequest_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createpullrequest_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createpullrequest_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createpullrequest_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createpullrequest_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createpullrequest_doccodetoolexample3';
/**
 * CREATE PULL REQUEST DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "VCS tool for pull request creation and code review workflows"
 * 
 * Critical DocCodeToolPrompt for pull request creation runtime documentation.
 * This tool enables intelligent cross-platform VCS integration with advanced automation.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Create Pull Request tool-specific DocCodeToolPrompt
 * This critical VCS tool represents the evolution of collaborative development,
 * enabling intelligent PR creation with cross-platform integration and
 * sophisticated workflow automation.
 */
export class CreatePullRequestDocCodeToolPrompt extends DocCodeToolPrompt {
  constructor() {
    super();
    
    // Set labels
    this.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL);
    this.set('purpose:label', PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL);
    this.set('capabilities:label', PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL);
    this.set('parameters:label', PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL);
    this.set('output:label', PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL);
    this.set('examples:label', PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL);
    
    // Set metadata directly
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLNAME);
    this.set('metadata:category', 'version-control' as PromptPart);
    this.set('metadata:version', 'V26.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating cross-platform VCS intelligence
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_CREATEPULLREQUEST_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const CREATE_PULL_REQUEST_DOC_CODE_TOOL_PROMPT = new CreatePullRequestDocCodeToolPrompt();
