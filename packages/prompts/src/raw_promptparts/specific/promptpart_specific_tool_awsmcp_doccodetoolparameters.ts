/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specifications for AWS MCP tool configuration"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_completeness", "test": "Does '{{content}}' cover essential AWS configuration parameters? Rate 0-1" },
 *   { "name": "security_awareness", "test": "Does '{{content}}' emphasize security parameter importance? Rate 0-1" },
 *   { "name": "flexibility_support", "test": "Does '{{content}}' support flexible configuration options? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLPARAMETERS: PromptPart = 
  `**Required Parameters:**
- \`service\` (string): AWS service to interact with (lambda, s3, dynamodb, cloudwatch)
- \`operation\` (string): Specific operation to perform on the service
- \`region\` (string): AWS region for the operation

**Optional Parameters:**
- \`credentials\` (object): AWS credentials configuration (uses default if not provided)
- \`timeout\` (number): Operation timeout in seconds (default: 30)
- \`retryConfig\` (object): Retry policy configuration with max attempts and backoff
- \`tags\` (object): Resource tags for billing and organization
- \`dryRun\` (boolean): Simulate operation without executing (default: false)

**Service-Specific Parameters:**
- Additional parameters vary by service and operation type
- All parameters support environment variable substitution
- Configuration validation ensures parameter compatibility` as PromptPart;