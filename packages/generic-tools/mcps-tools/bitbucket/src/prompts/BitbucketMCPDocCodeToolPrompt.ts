import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_bitbucketmcp_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_bitbucketmcp_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_bitbucketmcp_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_bitbucketmcp_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_bitbucketmcp_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_bitbucketmcp_doccodetoolexample1';
/**
 * BITBUCKET MCP DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Repository hosting MCP tool for Bitbucket code management and pipelines"
 * 
 * Advanced-Repository-Management DocCodeToolPrompt for Bitbucket MCP runtime documentation.
 * This tool enables sophisticated collaborative development with AI-driven workflow optimization.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/







/**
 * Bitbucket MCP tool-specific DocCodeToolPrompt
 * Essential for Bitbucket API integration through the Model Context Protocol,
 * providing repository management, pull request operations, and issue tracking
 * with standardized MCP interfaces for collaborative development workflows.
 */
export class BitbucketMCPDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLNAME);
    this.set('metadata:category', 'version-control' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating Bitbucket MCP operations
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_BITBUCKETMCP_DOCCODETOOLEXAMPLE1);
  }
}

// Export singleton instance
export const BITBUCKET_MCP_DOC_CODE_TOOL_PROMPT = new BitbucketMCPDocCodeToolPrompt();
