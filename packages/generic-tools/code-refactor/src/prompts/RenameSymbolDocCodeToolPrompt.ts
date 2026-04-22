import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_renamesymbol_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_renamesymbol_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_renamesymbol_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_renamesymbol_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_renamesymbol_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_renamesymbol_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_renamesymbol_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_renamesymbol_doccodetoolexample3';
/**
 * RENAME SYMBOL DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Code refactoring tool for consistent symbol renaming across codebases"
 * 
 * Structured DocCodeToolPrompt for symbol renaming tool runtime documentation.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts directly from individual files









/**
 * Rename Symbol tool-specific DocCodeToolPrompt
 */
export class RenameSymbolDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLNAME);
    this.set('metadata:category', 'code-refactoring' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'medium' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLOUTPUT);
    
    // Add examples - these demonstrate common and diverse uses
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_RENAMESYMBOL_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const RENAME_SYMBOL_DOC_CODE_TOOL_PROMPT = new RenameSymbolDocCodeToolPrompt();