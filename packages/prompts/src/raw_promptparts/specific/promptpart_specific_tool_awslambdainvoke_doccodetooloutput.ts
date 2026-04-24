/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output format specifications for AWS Lambda invocation responses"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_structure", "test": "Does '{{content}}' clearly define Lambda response structure? Rate 0-1" },
 *   { "name": "error_handling", "test": "Does '{{content}}' address Lambda error scenarios? Rate 0-1" },
 *   { "name": "metadata_completeness", "test": "Does '{{content}}' include comprehensive execution metadata? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLOUTPUT: PromptPart = 
  `**Success Response:**
\`\`\`json
{
  "success": true,
  "StatusCode": 200,
  "Payload": "Function response payload",
  "ExecutedVersion": "$LATEST",
  "LogResult": "base64-encoded logs",
  "metadata": {
    "requestId": "aws-request-id",
    "timestamp": "2024-01-01T00:00:00Z",
    "duration": 1250,
    "billedDuration": 1300,
    "memoryUsed": 128,
    "memoryLimit": 512
  }
}
\`\`\`

**Function Error Response:**
\`\`\`json
{
  "success": false,
  "StatusCode": 200,
  "FunctionError": "Handled",
  "Payload": "{\\"errorMessage\\": \\"Custom error\\"}",
  "LogResult": "base64-encoded error logs",
  "metadata": {
    "requestId": "aws-request-id",
    "timestamp": "2024-01-01T00:00:00Z",
    "errorType": "Runtime.HandledError"
  }
}
\`\`\`

**System Error Response:**
\`\`\`json
{
  "success": false,
  "error": {
    "code": "ResourceNotFoundException",
    "message": "Function not found",
    "statusCode": 404
  }
}
\`\`\`` as PromptPart;