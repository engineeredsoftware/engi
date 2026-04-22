import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractrequirements_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractrequirements_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractrequirements_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractrequirements_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractrequirements_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractrequirements_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractrequirements_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractrequirements_doccodetoolexample3';
/**
 * EXTRACT REQUIREMENTS DOC-CODE-TOOL PROMPT
 * 
 * Analytical DocCodeToolPrompt for requirement extraction runtime documentation.
 * This tool enables multi-dimensional requirement parsing and structuring.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Extract Requirements tool-specific DocCodeToolPrompt
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Analytical cognitive tool for multi-modal requirement parsing and implicit specification inference"
 * 
 * This analytical cognitive tool represents the evolution of requirement understanding,
 * enabling multi-modal parsing and implicit specification inference that feeds
 * sophisticated planning through transcendent pattern recognition.
 */
export class ExtractRequirementsDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLNAME);
    this.set('metadata:category', 'task-analysis' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating analytical requirement extraction
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const EXTRACT_REQUIREMENTS_DOC_CODE_TOOL_PROMPT = new ExtractRequirementsDocCodeToolPrompt();
