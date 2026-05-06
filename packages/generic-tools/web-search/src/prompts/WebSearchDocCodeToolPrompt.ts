import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetoolexample3';
/**
 * BITCODE NEED-SYNTHESIS WEB SEARCH DOC-CODE-TOOL PROMPT
 * 
 * Structured DocCodeToolPrompt for web search tool runtime documentation.
 * All model-readable tool strings are imported PromptParts.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Bitcode need-synthesis web search tool-specific DocCodeToolPrompt
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Bitcode discovery-phase web search tool prompt for source-attributed need-synthesis evidence"
 * 
 * This support prompt injects web-search capabilities only as
 * bounded external evidence support for Bitcode need synthesis.
 */
export class WebSearchDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLNAME);
    this.set('metadata:category', 'bitcode-need-synthesis-web-search' as PromptPart);
    this.set('metadata:version', 'V26' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLOUTPUT);
    
    // Add examples scoped to Bitcode need-synthesis evidence use.
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_WEBSEARCH_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const WEB_SEARCH_DOC_CODE_TOOL_PROMPT = new WebSearchDocCodeToolPrompt();
