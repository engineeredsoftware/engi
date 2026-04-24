import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_cloudflaremcp_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_cloudflaremcp_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_cloudflaremcp_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_cloudflaremcp_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_cloudflaremcp_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_cloudflaremcp_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_cloudflaremcp_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_cloudflaremcp_doccodetoolexample3';
/**
 * CLOUDFLARE MCP DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Edge computing MCP tool for Cloudflare CDN and security services"
 * 
 * Edge-Computing-Optimization DocCodeToolPrompt for Cloudflare MCP runtime documentation.
 * This tool enables quantum-edge performance with AI-driven global network optimization.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Cloudflare MCP tool-specific DocCodeToolPrompt
 * This edge computing optimization MCP tool represents the zenith of global network intelligence,
 * enabling quantum-edge performance with AI-driven global network optimization and
 * hyperconnected content delivery for transcendent web acceleration excellence.
 */
export class CloudflareMCPDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLNAME);
    this.set('metadata:category', 'mcp-integration' as PromptPart);
    this.set('metadata:version', 'V26.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating edge computing optimization mastery
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_CLOUDFLAREMCP_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const CLOUDFLARE_MCP_DOC_CODE_TOOL_PROMPT = new CloudflareMCPDocCodeToolPrompt();
