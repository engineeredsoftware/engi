import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLNAME } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLPURPOSE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLCAPABILITIES } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLPARAMETERS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLOUTPUT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLEXAMPLE1 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLEXAMPLE2 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLEXAMPLE3 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_getfilecontent_doccodetoolexample3';
/**
 * GET FILE CONTENT DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "VCS tool for file content retrieval and version management"
 * 
 * Fundamental-Access DocCodeToolPrompt for file content retrieval runtime documentation.
 * This tool enables TRANSCENDENT content access with quantum-encrypted streaming and AI-native parsing.
 */

import { DocCodeToolPrompt } from '@engi/tools-generics';
import { PromptPart } from '@engi/prompts';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Get File Content tool-specific DocCodeToolPrompt
 * This TRANSCENDENT content retrieval tool represents the evolution of file access,
 * enabling quantum-encrypted streaming with AI-native semantic parsing and
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
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating TRANSCENDENT content intelligence
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const GET_FILE_CONTENT_DOC_CODE_TOOL_PROMPT = new GetFileContentDocCodeToolPrompt();
