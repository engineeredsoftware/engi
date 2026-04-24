import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_listbranches_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_listbranches_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_listbranches_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_listbranches_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_listbranches_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_listbranches_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_listbranches_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_listbranches_doccodetoolexample3';
/**
 * LIST BRANCHES DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "VCS tool for branch enumeration and management operations"
 * 
 * Core-Discovery DocCodeToolPrompt for branch listing runtime documentation.
 * This tool enables intelligent branch discovery with predictive analytics.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * List Branches tool-specific DocCodeToolPrompt
 * This core discovery tool represents the evolution of repository navigation,
 * enabling intelligent branch discovery with predictive analytics and
 * workflow optimization for sophisticated development patterns.
 */
export class ListBranchesDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLNAME);
    this.set('metadata:category', 'vcs-operations' as PromptPart);
    this.set('metadata:version', 'V26.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating intelligent branch discovery
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_LISTBRANCHES_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const LIST_BRANCHES_DOC_CODE_TOOL_PROMPT = new ListBranchesDocCodeToolPrompt();
