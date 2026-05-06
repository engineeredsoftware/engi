import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetoolexample3';
/**
 * GET FILE CONTENT DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "VCS tool for file content retrieval and version management"
 * 
 * Fundamental-Access DocCodeToolPrompt for file content retrieval runtime documentation.
 * This tool enables ADVANCED content access with encrypted streaming and AI-native parsing.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Get File Content tool-specific DocCodeToolPrompt
 * This ADVANCED content retrieval tool represents the evolution of file access,
 * enabling encrypted streaming with AI-native semantic parsing and
 * autonomous system evolution for paradigm-transcending content intelligence.
 */
export class GetFileContentDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLNAME);
    this.set('metadata:category', 'vcs-operations' as PromptPart);
    this.set('metadata:version', 'V26.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating ADVANCED content intelligence
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const GET_FILE_CONTENT_DOC_CODE_TOOL_PROMPT = new GetFileContentDocCodeToolPrompt();
