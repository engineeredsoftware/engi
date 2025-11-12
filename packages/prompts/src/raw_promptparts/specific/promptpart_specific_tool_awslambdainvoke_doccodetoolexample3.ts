/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: example
 * intent: "Third example demonstrating versioned Lambda invocation with error handling"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "versioning_example_clarity", "test": "Does '{{content}}' clearly demonstrate version-specific invocation? Rate 0-1" },
 *   { "name": "error_handling_showcase", "test": "Does '{{content}}' show error handling capabilities? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLEXAMPLE3: PromptPart = 
  `**Example 3: Versioned Function with Error Handling**

\`\`\`javascript
// Invoke specific version with comprehensive error handling
try {
  await awsLambdaInvokeTool.use({
    FunctionName: 'payment-processor',
    Qualifier: 'v2.1.0',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: {
      amount: 99.99,
      currency: 'USD',
      paymentMethodId: 'pm_card_12345'
    },
    timeout: 30,
    retryConfig: { maxAttempts: 3, backoffMultiplier: 2 }
  });
} catch (error) {
  // Handle timeout, throttling, or function errors
  console.error('Payment processing failed:', error);
}
\`\`\`` as PromptPart;