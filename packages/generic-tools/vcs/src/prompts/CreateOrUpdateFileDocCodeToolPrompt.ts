import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createorupdatefile_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createorupdatefile_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createorupdatefile_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createorupdatefile_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createorupdatefile_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createorupdatefile_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createorupdatefile_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_createorupdatefile_doccodetoolexample3';
/**
 * CREATE OR UPDATE FILE DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "VCS tool for file creation and modification operations"
 * 
 * High-Impact DocCodeToolPrompt for file management runtime documentation.
 * This tool enables atomic file operations with intelligent content preservation.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Create Or Update File tool-specific DocCodeToolPrompt
 * This high-impact file management tool represents the evolution of content operations,
 * enabling atomic file manipulation with intelligent merging and metadata preservation
 * for sophisticated version control workflows.
 */
export class CreateOrUpdateFileDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLNAME);
    this.set('metadata:category', 'vcs-operations' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating atomic file operations
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const CREATE_OR_UPDATE_FILE_DOC_CODE_TOOL_PROMPT = new CreateOrUpdateFileDocCodeToolPrompt();
