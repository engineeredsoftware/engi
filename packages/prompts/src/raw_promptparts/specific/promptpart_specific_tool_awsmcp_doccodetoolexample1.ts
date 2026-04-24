/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: example
 * intent: "First example demonstrating Lambda function invocation"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "lambda_example_clarity", "test": "Does '{{content}}' clearly demonstrate Lambda invocation? Rate 0-1" },
 *   { "name": "practical_usecase", "test": "Does '{{content}}' show practical Lambda use case? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLEXAMPLE1: PromptPart = 
  `**Example 1: Lambda Function Invocation**

\`\`\`javascript
// Invoke a Lambda function to process user data
await awsMcpTool.use({
  service: 'lambda',
  operation: 'invoke',
  region: 'us-east-1',
  parameters: {
    FunctionName: 'user-data-processor',
    Payload: JSON.stringify({
      userId: '12345',
      action: 'updateProfile',
      data: { email: 'user@example.com' }
    }),
    InvocationType: 'RequestResponse'
  }
});

// Response: Function execution result with processed data
\`\`\`` as PromptPart;