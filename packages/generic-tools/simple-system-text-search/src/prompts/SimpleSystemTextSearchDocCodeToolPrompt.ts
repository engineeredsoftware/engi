import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_systemtextsearch_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_systemtextsearch_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_systemtextsearch_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_systemtextsearch_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_systemtextsearch_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_systemtextsearch_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_systemtextsearch_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_systemtextsearch_doccodetoolexample3';
/**
 * SIMPLE SYSTEM TEXT SEARCH DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Text search tool for efficient system-wide content discovery"
 * 
 * Structured DocCodeToolPrompt for system text search tool runtime documentation.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Simple System Text Search tool-specific DocCodeToolPrompt
 * Essential codebase discovery tool providing comprehensive text search capabilities
 * for pattern matching, content analysis, and code navigation across entire projects.
 */
export class SimpleSystemTextSearchDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLNAME);
    this.set('metadata:category', 'text-search' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating common and diverse uses
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const SIMPLE_SYSTEM_TEXT_SEARCH_DOC_CODE_TOOL_PROMPT = new SimpleSystemTextSearchDocCodeToolPrompt();
