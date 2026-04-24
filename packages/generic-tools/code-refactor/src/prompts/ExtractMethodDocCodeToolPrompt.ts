import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractmethod_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractmethod_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractmethod_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractmethod_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractmethod_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractmethod_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractmethod_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_extractmethod_doccodetoolexample3';
/**
 * EXTRACT METHOD DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Code refactoring tool for method extraction and code organization"
 * 
 * Structured DocCodeToolPrompt for extract method tool runtime documentation.
 * This tool enables extraction of code blocks into reusable methods with semantic analysis.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Extract Method tool-specific DocCodeToolPrompt
 * Essential for code organization and maintainability, this tool transforms
 * complex code blocks into well-structured methods with automatic parameter
 * detection and scope analysis.
 */
export class ExtractMethodDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLNAME);
    this.set('metadata:category', 'code-refactoring' as PromptPart);
    this.set('metadata:version', 'V26.00.0' as PromptPart);
    this.set('metadata:priority', 'medium' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating common and diverse uses
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const EXTRACT_METHOD_DOC_CODE_TOOL_PROMPT = new ExtractMethodDocCodeToolPrompt();