import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_aurorapostgresmcp_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_aurorapostgresmcp_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_aurorapostgresmcp_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_aurorapostgresmcp_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_aurorapostgresmcp_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_aurorapostgresmcp_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_aurorapostgresmcp_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_aurorapostgresmcp_doccodetoolexample3';
/**
 * AURORA POSTGRES MCP DOC-CODE-TOOL PROMPT
 * 
 * Critical-Infrastructure DocCodeToolPrompt for Aurora Postgres MCP runtime documentation.
 * This tool enables enterprise-grade cloud database integration with AI-driven optimization.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts';

// Import generic labels from /raw_promptparts/generic/







// Import ALL specific PromptParts from /raw_promptparts/specific/









/**
 * Aurora Postgres MCP tool-specific DocCodeToolPrompt
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Critical infrastructure MCP tool for enterprise-grade cloud database integration with AI-driven optimization"
 * 
 * This critical infrastructure MCP tool represents the evolution of cloud database integration,
 * enabling enterprise-grade reliability with AI-driven serverless scaling and
 * quantum-optimized performance for mission-critical data operations.
 */
export class AuroraPostgresMCPDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLNAME);
    this.set('metadata:category', 'mcp-integration' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating enterprise cloud database intelligence
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_AURORAPOSTGRESMCP_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const AURORA_POSTGRES_MCP_DOC_CODE_TOOL_PROMPT = new AuroraPostgresMCPDocCodeToolPrompt();
