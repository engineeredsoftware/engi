import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_multiprovidersearch_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_multiprovidersearch_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_multiprovidersearch_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_multiprovidersearch_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_multiprovidersearch_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_multiprovidersearch_doccodetoolexample1';
/**
 * MULTI-PROVIDER SEARCH DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Multi-provider search tool for comprehensive cross-platform search capabilities"
 * 
 * Structured DocCodeToolPrompt for multi-provider search tool runtime documentation.
 * This tool provides enterprise-grade search orchestration across multiple providers.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/







/**
 * Multi-Provider Search tool-specific DocCodeToolPrompt
 * Essential for enterprise-grade information discovery with automatic failover,
 * result aggregation, and provider optimization across multiple search services.
 */
export class MultiProviderSearchDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLNAME);
    this.set('metadata:category', 'web-search' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLOUTPUT);
    
    // Add examples
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLEXAMPLE1);
  }
}

// Export singleton instance
export const MULTI_PROVIDER_SEARCH_DOC_CODE_TOOL_PROMPT = new MultiProviderSearchDocCodeToolPrompt();
