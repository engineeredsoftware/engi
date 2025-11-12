import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@engi/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLNAME } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslambdainvoke_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLPURPOSE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslambdainvoke_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLCAPABILITIES } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslambdainvoke_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLPARAMETERS } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslambdainvoke_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLOUTPUT } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslambdainvoke_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLEXAMPLE1 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslambdainvoke_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLEXAMPLE2 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslambdainvoke_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLEXAMPLE3 } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_tool_awslambdainvoke_doccodetoolexample3';
/**
 * AWS Lambda Invoke DOC-CODE-TOOL PROMPT
 * 
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Serverless Lambda function invocation MCP tool for AWS compute orchestration"
 * 
 * Serverless-Computing DocCodeToolPrompt for AWS Lambda invocation runtime documentation.
 * This tool enables direct function execution with intelligent payload management and comprehensive monitoring.
 */

import { DocCodeToolPrompt } from '@engi/tools-generics';
import { PromptPart } from '@engi/prompts';

// Import generic labels from /raw_promptparts/generic/







// Import specific PromptParts from /raw_promptparts/specific/









/**
 * AWS Lambda Invoke tool-specific DocCodeToolPrompt
 * This serverless computing MCP tool represents precision Lambda function orchestration,
 * enabling direct function invocation with intelligent payload management, comprehensive monitoring,
 * and advanced error handling for scalable serverless application architectures.
 */
export class AwsLambdaInvokeDocCodeToolPrompt extends DocCodeToolPrompt {
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
    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLNAME);
    this.set('metadata:category', 'mcp-integration' as PromptPart);
    this.set('metadata:version', 'GA1.00.0' as PromptPart);
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);
    
    // Set core documentation
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLOUTPUT);
    
    // Add examples - demonstrating serverless computing mastery
    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLEXAMPLE3);
  }
}

// Export singleton instance
export const AWS_LAMBDA_INVOKE_DOC_CODE_TOOL_PROMPT = new AwsLambdaInvokeDocCodeToolPrompt();
