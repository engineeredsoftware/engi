/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output format specifications for AWS MCP tool responses"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_clarity", "test": "Does '{{content}}' clearly define output structure? Rate 0-1" },
 *   { "name": "error_handling", "test": "Does '{{content}}' address error output scenarios? Rate 0-1" },
 *   { "name": "format_consistency", "test": "Does '{{content}}' maintain consistent output format? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLOUTPUT: PromptPart = 
  `**Success Response:**
\`\`\`json
{
  "success": true,
  "service": "aws-service-name",
  "operation": "operation-name",
  "data": {
    // Service-specific response data
  },
  "metadata": {
    "requestId": "uuid",
    "timestamp": "ISO-8601",
    "region": "aws-region",
    "executionTime": "milliseconds"
  }
}
\`\`\`

**Error Response:**
\`\`\`json
{
  "success": false,
  "error": {
    "code": "AWS_ERROR_CODE",
    "message": "Human-readable error description",
    "details": "Technical error details"
  },
  "metadata": {
    "requestId": "uuid",
    "timestamp": "ISO-8601",
    "retryAttempts": 3
  }
}
\`\`\`

All responses include comprehensive metadata for debugging and monitoring purposes.` as PromptPart;