import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_doccodetoolexample3';
/**
 * REPOSITORY SETUP DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Repository initialization tool for project scaffolding and configuration"
 * 
 * Structured DocCodeToolPrompt for repository setup tool runtime documentation.
 * This tool provides provider-agnostic repository cloning and analysis capabilities.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Repository Setup tool-specific DocCodeToolPrompt
 * Critical infrastructure tool that provides the foundation for all repository-based
 * operations through intelligent cloning, caching, and comprehensive analysis.
 */
export class RepositorySetupDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLNAME);
    this.set('metadata:category', 'repository-management' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating common and diverse uses
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const REPOSITORY_SETUP_DOC_CODE_TOOL_PROMPT = new RepositorySetupDocCodeToolPrompt();
