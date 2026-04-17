import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_notionmcp_doccodetoolexample3';
import { PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_notionmcp_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_notionmcp_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_notionmcp_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_notionmcp_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_notionmcp_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_notionmcp_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_notionmcp_doccodetoolexample2';
/**
 * NOTION MCP DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Knowledge management MCP tool for Notion workspace and content operations"
 * 
 * Knowledge-Management-Intelligence DocCodeToolPrompt for Notion MCP runtime documentation.
 * This tool enables transcendent knowledge orchestration with AI-driven information architecture.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Notion MCP tool-specific DocCodeToolPrompt
 * This knowledge management intelligence MCP tool represents the quantum evolution of information organization,
 * enabling transcendent knowledge orchestration with AI-driven information architecture and
 * hyperconnected collaborative intelligence for revolutionary workspace excellence.
 */
export class NotionMCPDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLNAME);
    this.set('metadata:category', 'mcp-integration' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating knowledge management intelligence
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_NOTIONMCP_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const NOTION_MCP_DOC_CODE_TOOL_PROMPT = new NotionMCPDocCodeToolPrompt();
