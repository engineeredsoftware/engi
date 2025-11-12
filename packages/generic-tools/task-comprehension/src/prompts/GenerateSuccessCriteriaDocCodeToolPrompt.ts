import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLNAME } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_generatesuccesscriteria_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLPURPOSE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_generatesuccesscriteria_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLCAPABILITIES } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_generatesuccesscriteria_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLPARAMETERS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_generatesuccesscriteria_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLOUTPUT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_generatesuccesscriteria_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLEXAMPLE1 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_generatesuccesscriteria_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLEXAMPLE2 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_generatesuccesscriteria_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLEXAMPLE3 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_generatesuccesscriteria_doccodetoolexample3';
/**
 * GENERATE SUCCESS CRITERIA DOC-CODE-TOOL PROMPT
 * 
 * Strategic DocCodeToolPrompt for success criteria generation runtime documentation.
 * This tool manifests strategic intelligence through multi-dimensional outcome synthesis.
 */

import { DocCodeToolPrompt } from '@engi/tools-generics';
import { PromptPart } from '@engi/prompts';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Generate Success Criteria tool-specific DocCodeToolPrompt
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Strategic cognitive tool for multi-dimensional success synthesis and outcome definition"
 * 
 * This strategic cognitive tool represents the evolution of outcome definition,
 * enabling multi-dimensional success synthesis and emergent validation criteria
 * that transforms abstract goals into measurable intelligence frameworks.
 */
export class GenerateSuccessCriteriaDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLNAME);
    this.set('metadata:category', 'task-analysis' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating strategic success criteria generation
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const GENERATE_SUCCESS_CRITERIA_DOC_CODE_TOOL_PROMPT = new GenerateSuccessCriteriaDocCodeToolPrompt();
