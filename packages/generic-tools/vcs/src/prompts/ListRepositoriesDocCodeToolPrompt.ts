import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_vcslistrepositories_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_vcslistrepositories_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_vcslistrepositories_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_vcslistrepositories_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_vcslistrepositories_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_vcslistrepositories_doccodetoolexample1';
/**
 * LIST REPOSITORIES DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "VCS tool for repository discovery and listing operations"
 * 
 * Structured DocCodeToolPrompt for VCS list repositories tool runtime documentation.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/







/**
 * VCS List Repositories tool-specific DocCodeToolPrompt
 * Essential VCS integration tool providing unified repository discovery across
 * multiple version control providers with comprehensive filtering and sorting.
 */
export class ListRepositoriesDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLNAME);
    this.set('metadata:category', 'vcs-operations' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLOUTPUT);
    
    // Add examples
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLEXAMPLE1);
  }
}

// Export singleton instance
export const LIST_REPOSITORIES_DOC_CODE_TOOL_PROMPT = new ListRepositoriesDocCodeToolPrompt();
