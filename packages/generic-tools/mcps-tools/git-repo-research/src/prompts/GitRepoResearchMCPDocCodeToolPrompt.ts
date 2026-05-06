import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitreporesearchmcp_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitreporesearchmcp_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitreporesearchmcp_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitreporesearchmcp_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitreporesearchmcp_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitreporesearchmcp_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitreporesearchmcp_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_gitreporesearchmcp_doccodetoolexample3';
/**
 * GIT REPO RESEARCH MCP DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Repository analysis MCP tool for comprehensive codebase research and insights"
 * 
 * Code-Intelligence-Analysis DocCodeToolPrompt for Git Repo Research MCP runtime documentation.
 * This tool enables advanced codebase intelligence with AI-driven repository analysis optimization.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Git Repo Research MCP tool-specific DocCodeToolPrompt
 * This code intelligence analysis MCP tool represents the apex of repository comprehension technology,
 * enabling advanced codebase intelligence with AI-driven repository analysis optimization and
 * deep code understanding for reliable software archaeology excellence.
 */
export class GitRepoResearchMCPDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLNAME);
    this.set('metadata:category', 'mcp-integration' as PromptPart);
    this.set('metadata:version', 'V26.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating code intelligence analysis mastery
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_GITREPORESEARCHMCP_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const GIT_REPO_RESEARCH_MCP_DOC_CODE_TOOL_PROMPT = new GitRepoResearchMCPDocCodeToolPrompt();
