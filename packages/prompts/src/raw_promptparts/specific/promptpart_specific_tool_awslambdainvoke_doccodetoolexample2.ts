/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: example
 * intent: "Second example demonstrating asynchronous Lambda invocation"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "async_example_clarity", "test": "Does '{{content}}' clearly demonstrate asynchronous invocation? Rate 0-1" },
 *   { "name": "event_driven_usecase", "test": "Does '{{content}}' show practical async use case? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLEXAMPLE2: PromptPart = 
  `**Example 2: Asynchronous Event Processing**

\`\`\`javascript
// Trigger Lambda function asynchronously for background processing
await awsLambdaInvokeTool.use({
  FunctionName: 'image-processing-pipeline',
  InvocationType: 'Event',
  Payload: {
    s3Bucket: 'user-uploads',
    s3Key: 'images/profile-photo.jpg',
    userId: '12345',
    transformations: ['resize', 'watermark', 'optimize']
  }
});

// Returns immediately with invocation confirmation
\`\`\`` as PromptPart;