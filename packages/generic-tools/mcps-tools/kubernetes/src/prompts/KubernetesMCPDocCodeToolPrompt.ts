import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_kubernetesmcp_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_kubernetesmcp_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_kubernetesmcp_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_kubernetesmcp_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_kubernetesmcp_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_kubernetesmcp_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_kubernetesmcp_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_kubernetesmcp_doccodetoolexample3';
/**
 * KUBERNETES MCP DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Container orchestration MCP tool for Kubernetes cluster management"
 * 
 * Orchestration-Mastery DocCodeToolPrompt for Kubernetes MCP runtime documentation.
 * This tool enables quantum-scale container orchestration with AI-driven cluster optimization.
 */

import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * Kubernetes MCP tool-specific DocCodeToolPrompt
 * This orchestration mastery MCP tool represents the apex of distributed systems management,
 * enabling quantum-scale container orchestration with AI-driven cluster optimization and
 * hyperintelligent workload distribution for transcendent cloud-native excellence.
 */
export class KubernetesMCPDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLNAME);
    this.set('metadata:category', 'mcp-integration' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating orchestration mastery
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_KUBERNETESMCP_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const KUBERNETES_MCP_DOC_CODE_TOOL_PROMPT = new KubernetesMCPDocCodeToolPrompt();
