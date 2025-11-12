import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLNAME } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_multimodalprocessing_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLPURPOSE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_multimodalprocessing_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLCAPABILITIES } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_multimodalprocessing_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLPARAMETERS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_multimodalprocessing_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLOUTPUT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_multimodalprocessing_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLEXAMPLE1 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_multimodalprocessing_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLEXAMPLE2 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_multimodalprocessing_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLEXAMPLE3 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_multimodalprocessing_doccodetoolexample3';
/**
 * MULTIMODAL PROCESSING DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Content processing tool for multi-format data analysis and transformation"
 * 
 * Structured DocCodeToolPrompt for multimodal processing tool runtime documentation.
 * This tool processes and analyzes various content types including images, audio, video, and documents.
 */

import { DocCodeToolPrompt } from '@engi/tools-generics';
import { PromptPart } from '@engi/prompts';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Multimodal Processing tool-specific DocCodeToolPrompt
 * This tool is critical for processing and understanding diverse content types,
 * enabling comprehensive analysis across text, image, audio, and video modalities.
 */
export class MultimodalProcessingDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLNAME);
    this.set('metadata:category', 'media-processing' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating common and diverse uses
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_MULTIMODALPROCESSING_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const multimodalProcessingDocCodeToolPrompt = new MultimodalProcessingDocCodeToolPrompt();
export const MULTIMODAL_PROCESSING_DOC_CODE_TOOL_PROMPT = multimodalProcessingDocCodeToolPrompt;
