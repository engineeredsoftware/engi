/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: example
 * intent: "First example demonstrating synchronous Lambda invocation"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "sync_example_clarity", "test": "Does '{{content}}' clearly demonstrate synchronous invocation? Rate 0-1" },
 *   { "name": "practical_usecase", "test": "Does '{{content}}' show practical synchronous use case? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLEXAMPLE1: PromptPart = 
  `**Example 1: Synchronous Function Invocation**

\`\`\`javascript
// Invoke Lambda function synchronously for immediate response
await awsLambdaInvokeTool.use({
  FunctionName: 'user-authentication',
  InvocationType: 'RequestResponse',
  LogType: 'Tail',
  Payload: {
    username: 'john.doe',
    password: 'hashed_password',
    action: 'login'
  }
});

// Response includes authentication result and execution logs
\`\`\`` as PromptPart;