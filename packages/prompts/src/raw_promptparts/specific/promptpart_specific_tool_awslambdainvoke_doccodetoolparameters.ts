/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specifications for AWS Lambda invocation configuration"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_completeness", "test": "Does '{{content}}' cover essential Lambda invocation parameters? Rate 0-1" },
 *   { "name": "invocation_flexibility", "test": "Does '{{content}}' support different invocation patterns? Rate 0-1" },
 *   { "name": "configuration_depth", "test": "Does '{{content}}' provide comprehensive configuration options? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLPARAMETERS: PromptPart = 
  `**Required Parameters:**
- \`FunctionName\` (string): Lambda function name, ARN, or partial ARN
- \`InvocationType\` (string): 'RequestResponse' (sync), 'Event' (async), or 'DryRun'

**Optional Parameters:**
- \`Payload\` (string|object): JSON payload to send to function (auto-serialized)
- \`Qualifier\` (string): Function version or alias (default: $LATEST)
- \`LogType\` (string): 'None' or 'Tail' to include execution logs
- \`ClientContext\` (string): Base64-encoded context data for mobile apps

**Advanced Configuration:**
- \`region\` (string): AWS region override (uses default if not specified)
- \`timeout\` (number): Invocation timeout in seconds (max: 900)
- \`retryConfig\` (object): Custom retry policy for failed invocations
- \`includeMetrics\` (boolean): Include execution metrics in response

All parameters support environment variable substitution and validation.` as PromptPart;