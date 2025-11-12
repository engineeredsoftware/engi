import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLNAME } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_circlecimcp_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLPURPOSE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_circlecimcp_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLCAPABILITIES } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_circlecimcp_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLPARAMETERS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_circlecimcp_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLOUTPUT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_circlecimcp_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLEXAMPLE1 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_circlecimcp_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLEXAMPLE2 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_circlecimcp_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLEXAMPLE3 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_circlecimcp_doccodetoolexample3';
/**
 * CIRCLECI MCP DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Continuous integration MCP tool for CircleCI pipeline automation"
 * 
 * Continuous-Integration-Mastery DocCodeToolPrompt for CircleCI MCP runtime documentation.
 * This tool enables revolutionary CI/CD pipelines with AI-driven automation optimization.
 */

import { DocCodeToolPrompt } from '@engi/tools-generics';
import { PromptPart } from '@engi/prompts';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * CircleCI MCP tool-specific DocCodeToolPrompt
 * This continuous integration mastery MCP tool represents the quantum evolution of automated pipelines,
 * enabling revolutionary CI/CD orchestration with AI-driven automation optimization and
 * hyperspeed deployment intelligence for transcendent software delivery excellence.
 */
export class CircleCIMCPDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLNAME);
    this.set('metadata:category', 'mcp-integration' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating continuous integration mastery
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_CIRCLECIMCP_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const CIRCLECI_MCP_DOC_CODE_TOOL_PROMPT = new CircleCIMCPDocCodeToolPrompt();
