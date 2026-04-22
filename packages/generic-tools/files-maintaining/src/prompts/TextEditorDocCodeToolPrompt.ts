import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_texteditor_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_texteditor_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_texteditor_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_texteditor_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_texteditor_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_texteditor_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_texteditor_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_texteditor_doccodetoolexample3';
/**
 * TEXT EDITOR DOC-CODE-TOOL PROMPT
 * 
 * Structured DocCodeToolPrompt for atomic file editing tool runtime documentation.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Text Editor tool-specific DocCodeToolPrompt
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Atomic file editing tool for precise text manipulation and file modification operations"
 */
export class TextEditorDocCodeToolPrompt extends DocCodeToolPrompt {
  constructor() {
    super();
    
    // Set labels
    this.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL);
    this.set('purpose:label', PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL);
    this.set('capabilities:label', PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL);
    this.set('parameters:label', PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL);
    this.set('output:label', PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL);
    this.set('examples:label', PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL);
    
    // Set metadata - only name is meaningful, rest are just metadata
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLNAME);
    this.set('metadata:category', 'file-editing' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'critical' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLOUTPUT);
    
    // Add examples - these demonstrate common and diverse uses
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_TEXTEDITOR_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const TEXT_EDITOR_DOC_CODE_TOOL_PROMPT = new TextEditorDocCodeToolPrompt();
