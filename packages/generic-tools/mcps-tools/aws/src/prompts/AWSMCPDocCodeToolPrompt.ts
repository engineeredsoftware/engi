import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLNAME } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awsmcp_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLPURPOSE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awsmcp_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLCAPABILITIES } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awsmcp_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLPARAMETERS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awsmcp_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLOUTPUT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awsmcp_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLEXAMPLE1 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awsmcp_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLEXAMPLE2 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awsmcp_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLEXAMPLE3 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awsmcp_doccodetoolexample3';
/**
 * AWS MCP DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Cloud infrastructure MCP tool for comprehensive AWS service integration"
 * 
 * Cloud-Service-Orchestration DocCodeToolPrompt for AWS MCP runtime documentation.
 * This tool enables hyperconnected cloud services with AI-driven resource optimization.
 */

import { DocCodeToolPrompt } from '@engi/tools-generics';
import { PromptPart } from '@engi/prompts';















/**
 * AWS MCP tool-specific DocCodeToolPrompt
 * This cloud service orchestration MCP tool represents the apex of distributed computing excellence,
 * enabling hyperconnected cloud services with AI-driven resource optimization and
 * quantum-scalable infrastructure management for revolutionary multi-service architecture operations.
 */
export class AWSMCPDocCodeToolPrompt extends DocCodeToolPrompt {
  constructor() {
    super();
    
    // Set labels (PromptParts)
    this.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL);
    this.set('purpose:label', PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL);
    this.set('capabilities:label', PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL);
    this.set('parameters:label', PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL);
    this.set('output:label', PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL);
    this.set('examples:label', PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL);
    
    // Set metadata directly
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLNAME);
    this.set('metadata:category', 'mcp-integration' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating cloud service orchestration mastery
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const AWS_MCP_DOC_CODE_TOOL_PROMPT = new AWSMCPDocCodeToolPrompt();
