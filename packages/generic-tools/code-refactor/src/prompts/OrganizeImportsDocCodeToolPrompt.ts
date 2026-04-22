import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_organizeimports_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_organizeimports_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_organizeimports_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_organizeimports_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_organizeimports_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_organizeimports_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_organizeimports_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_organizeimports_doccodetoolexample3';
/**
 * ORGANIZE IMPORTS DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Code refactoring tool for import statement organization and optimization"
 * 
 * Structured DocCodeToolPrompt for organize imports tool runtime documentation.
 * This tool optimizes import statements for cleaner, more maintainable code.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Organize Imports tool-specific DocCodeToolPrompt
 * Critical for maintaining clean codebases, reducing bundle sizes, and
 * improving build performance through optimized import statements.
 */
export class OrganizeImportsDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLNAME);
    this.set('metadata:category', 'code-refactoring' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating common and diverse uses
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const ORGANIZE_IMPORTS_DOC_CODE_TOOL_PROMPT = new OrganizeImportsDocCodeToolPrompt();