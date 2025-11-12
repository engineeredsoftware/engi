import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLNAME } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslocationmcp_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLPURPOSE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslocationmcp_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLCAPABILITIES } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslocationmcp_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLPARAMETERS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslocationmcp_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLOUTPUT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslocationmcp_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLEXAMPLE1 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslocationmcp_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLEXAMPLE2 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslocationmcp_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLEXAMPLE3 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslocationmcp_doccodetoolexample3';
/**
 * AWS LOCATION MCP DOC-CODE-TOOL PROMPT
 * 
 * Geospatial-Intelligence DocCodeToolPrompt for AWS Location MCP runtime documentation.
 * This tool enables next-generation location services with AI-driven spatial optimization.
 */

import { DocCodeToolPrompt } from '@engi/tools-generics';
import { PromptPart } from '@engi/prompts';

// Import generic labels from /raw_promptparts/generic/







// Import ALL specific PromptParts from /raw_promptparts/specific/









/**
 * AWS Location MCP tool-specific DocCodeToolPrompt
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Geospatial intelligence MCP tool for next-generation spatial computing with AI-driven geospatial optimization"
 * 
 * This geospatial intelligence MCP tool represents the evolution of location-aware applications,
 * enabling next-generation spatial computing with AI-driven geospatial optimization and
 * quantum-precise coordinate transformation for hyperconnected location services.
 */
export class AWSLocationMCPDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLNAME);
    this.set('metadata:category', 'mcp-integration' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating geospatial intelligence mastery
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_AWSLOCATIONMCP_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const AWS_LOCATION_MCP_DOC_CODE_TOOL_PROMPT = new AWSLocationMCPDocCodeToolPrompt();
