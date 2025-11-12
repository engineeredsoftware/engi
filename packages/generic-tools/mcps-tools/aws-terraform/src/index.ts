/**
 * AWS Terraform MCP Tools - Modern Tool Class Architecture
 * 
 * AWS Terraform infrastructure-as-code integration tools using the Tool class pattern.
 */

import { Tool } from '@engi/tools-generics';
import {
  awsTerraformSecurityScanTool as _awsTerraformSecurityScan,
  awsTerraformModuleSuggestionTool as _awsTerraformModuleSuggestion,
  awsTerraformCheckovScanTool as _awsTerraformCheckovScan,
  awsTerraformGenerateAwsModuleTool as _awsTerraformGenerateAwsModule,
} from '@engi/aws';

// Import DocCodeToolPrompt
import { AWS_TERRAFORM_MCP_DOC_CODE_TOOL_PROMPT } from './prompts/AWSTerraformMCPDocCodeToolPrompt';

/**
 * AWS Terraform Security Scan Tool for infrastructure security analysis
 * 
 * @doc-code-tool
 * @prompt AWS_TERRAFORM_MCP_DOC_CODE_TOOL_PROMPT
 */
class AwsTerraformSecurityScanTool extends Tool<typeof _awsTerraformSecurityScan> {
  use = _awsTerraformSecurityScan;
}

/**
 * AWS Terraform Module Suggestion Tool for infrastructure best practices
 * 
 * @doc-code-tool
 * @prompt AWS_TERRAFORM_MCP_DOC_CODE_TOOL_PROMPT
 */
class AwsTerraformModuleSuggestionTool extends Tool<typeof _awsTerraformModuleSuggestion> {
  use = _awsTerraformModuleSuggestion;
}

/**
 * AWS Terraform Checkov Scan Tool for compliance and security validation
 * 
 * @doc-code-tool
 * @prompt AWS_TERRAFORM_MCP_DOC_CODE_TOOL_PROMPT
 */
class AwsTerraformCheckovScanTool extends Tool<typeof _awsTerraformCheckovScan> {
  use = _awsTerraformCheckovScan;
}

/**
 * AWS Terraform Generate AWS Module Tool for automated module creation
 * 
 * @doc-code-tool
 * @prompt AWS_TERRAFORM_MCP_DOC_CODE_TOOL_PROMPT
 */
class AwsTerraformGenerateAwsModuleTool extends Tool<typeof _awsTerraformGenerateAwsModule> {
  use = _awsTerraformGenerateAwsModule;
}

// Export singleton instances - proper non-barrel exports
export const awsTerraformSecurityScanTool = new AwsTerraformSecurityScanTool();
export const awsTerraformModuleSuggestionTool = new AwsTerraformModuleSuggestionTool();
export const awsTerraformCheckovScanTool = new AwsTerraformCheckovScanTool();
export const awsTerraformGenerateAwsModuleTool = new AwsTerraformGenerateAwsModuleTool();

// Export DocCodeToolPrompt instance
export { AWS_TERRAFORM_MCP_DOC_CODE_TOOL_PROMPT };

// Export classes for type safety and extensibility
export { AwsTerraformSecurityScanTool };
export { AwsTerraformModuleSuggestionTool };
export { AwsTerraformCheckovScanTool };
export { AwsTerraformGenerateAwsModuleTool };
