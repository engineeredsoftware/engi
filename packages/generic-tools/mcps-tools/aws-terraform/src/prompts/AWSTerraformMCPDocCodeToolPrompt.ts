import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_awsterraformmcp_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_awsterraformmcp_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_awsterraformmcp_doccodetoolexample3';
import { PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_awsterraformmcp_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_awsterraformmcp_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_awsterraformmcp_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_awsterraformmcp_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_awsterraformmcp_doccodetoolexample2';
/**
 * AWS TERRAFORM MCP DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Infrastructure-as-code MCP tool for AWS resource provisioning and management"
 * 
 * Infrastructure-as-Code DocCodeToolPrompt for AWS Terraform MCP runtime documentation.
 * This tool enables transcendent infrastructure orchestration with AI-driven IaC optimization.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * AWS Terraform MCP tool-specific DocCodeToolPrompt
 * This infrastructure-as-code mastery MCP tool represents the quantum evolution of cloud infrastructure,
 * enabling transcendent infrastructure orchestration with AI-driven declarative optimization and
 * hyperintelligent resource provisioning for revolutionary cloud architecture management.
 */
export class AWSTerraformMCPDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLNAME);
    this.set('metadata:category', 'mcp-integration' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating infrastructure-as-code excellence
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_AWSTERRAFORMMCP_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const AWS_TERRAFORM_MCP_DOC_CODE_TOOL_PROMPT = new AWSTerraformMCPDocCodeToolPrompt();
