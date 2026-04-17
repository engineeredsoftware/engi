import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitlabmcp_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitlabmcp_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitlabmcp_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitlabmcp_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitlabmcp_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitlabmcp_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitlabmcp_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitlabmcp_doccodetoolexample3';
/**
 * GITLAB MCP DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "DevOps integration MCP tool for GitLab repository and CI/CD management"
 * 
 * DevOps-Platform-Excellence DocCodeToolPrompt for GitLab MCP runtime documentation.
 * This tool enables revolutionary DevOps orchestration with AI-driven pipeline optimization.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts';

// Import generic labels from /raw_promptparts/generic/







// Import ALL specific PromptParts from /raw_promptparts/specific/









/**
 * GitLab MCP tool-specific DocCodeToolPrompt
 * This DevOps platform excellence MCP tool represents the quantum evolution of integrated development,
 * enabling revolutionary DevOps orchestration with AI-driven pipeline optimization and
 * hyperconnected full-lifecycle management for transcendent software delivery excellence.
 */
export class GitLabMCPDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLNAME);
    this.set('metadata:category', 'mcp-integration' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating DevOps platform excellence
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_GITLABMCP_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const GITLAB_MCP_DOC_CODE_TOOL_PROMPT = new GitLabMCPDocCodeToolPrompt();
