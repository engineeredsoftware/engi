import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLNAME } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_lspquery_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLPURPOSE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_lspquery_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLCAPABILITIES } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_lspquery_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLPARAMETERS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_lspquery_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLOUTPUT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_lspquery_doccodetooloutput';
/**
 * LSP QUERY DOC-CODE-TOOL PROMPT
 * 
 * Structured DocCodeToolPrompt for LSP query tools runtime documentation.
 */

import { DocCodeToolPrompt } from '@engi/tools-generics';
import { PromptPart } from '@engi/prompts';

// Import generic labels from individual files






// Import specific PromptParts from /raw_promptparts/specific/






import { PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLEXAMPLE1 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_lspquery_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLEXAMPLE2 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_lspquery_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLEXAMPLE3 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_lspquery_doccodetoolexample3';

/**
 * LSP query tool-specific DocCodeToolPrompt
 * 
 * @doc-comment-developing-promptdevelopment
 * domain: tool
 * intent: "Language Server Protocol query tool for precise codebase analysis and symbol resolution"
 * current_version: "GA1.45.0"
 * dependencies: {
 *   "PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLNAME": "GA1.45.0",
 *   "PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLPURPOSE": "GA1.45.0",
 *   "PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL": "GA1.45.0"
 * }
 */
export class LspQueryDocCodeToolPrompt extends DocCodeToolPrompt {
  constructor() {
    super();
    
    // Labels
    this.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL);
    this.set('purpose:label', PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL);
    this.set('capabilities:label', PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL);
    this.set('parameters:label', PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL);
    this.set('output:label', PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL);
    this.set('examples:label', PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL);
    
    // Metadata
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLNAME);
    this.set('metadata:category', 'lsp' as PromptPart);
    this.set('metadata:version', 'GA1.50.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Purpose
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLPURPOSE);
    
    // Capabilities
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLCAPABILITIES);
    
    // Parameters
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLPARAMETERS);
    
    // Output
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLOUTPUT);
    
    // Examples
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_LSPQUERY_DOCCODETOOLEXAMPLE3);
    
    // Require all components
    this.require('metadata:name');
    this.require('sections:purpose:content');
    this.require('sections:capabilities:content');
    this.require('sections:parameters:content');
    this.require('sections:output:content');
  }
}

// Export instance for use
export const LSP_QUERY_DOC_CODE_TOOL_PROMPT = new LspQueryDocCodeToolPrompt();
