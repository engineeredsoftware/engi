import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLNAME } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_figmamcp_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLPURPOSE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_figmamcp_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLCAPABILITIES } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_figmamcp_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLPARAMETERS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_figmamcp_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLOUTPUT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_figmamcp_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLEXAMPLE1 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_figmamcp_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLEXAMPLE2 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_figmamcp_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLEXAMPLE3 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_figmamcp_doccodetoolexample3';
/**
 * FIGMA MCP DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Design collaboration MCP tool for Figma design files and team workflows"
 * 
 * Design-System-Integration DocCodeToolPrompt for Figma MCP runtime documentation.
 * This tool enables revolutionary design-to-code workflows with AI-driven creative optimization.
 */

import { DocCodeToolPrompt } from '@engi/tools-generics';
import { PromptPart } from '@engi/prompts';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Figma MCP tool-specific DocCodeToolPrompt
 * This design system integration MCP tool represents the paradigm shift in creative-technical collaboration,
 * enabling revolutionary design-to-code workflows with AI-driven creative optimization and
 * quantum-synchronized visual development for transcendent user experience excellence.
 */
export class FigmaMCPDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLNAME);
    this.set('metadata:category', 'mcp-integration' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating design system integration mastery
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_FIGMAMCP_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const FIGMA_MCP_DOC_CODE_TOOL_PROMPT = new FigmaMCPDocCodeToolPrompt();
