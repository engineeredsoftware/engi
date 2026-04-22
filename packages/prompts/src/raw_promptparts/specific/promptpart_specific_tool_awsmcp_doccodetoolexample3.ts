/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: example
 * intent: "Third example demonstrating DynamoDB data operations"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "dynamodb_example_clarity", "test": "Does '{{content}}' clearly demonstrate DynamoDB operations? Rate 0-1" },
 *   { "name": "database_usecase", "test": "Does '{{content}}' show practical DynamoDB use case? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLEXAMPLE3: PromptPart = 
  `**Example 3: DynamoDB Item Query**

\`\`\`javascript
// Query user sessions from DynamoDB table
await awsMcpTool.use({
  service: 'dynamodb',
  operation: 'query',
  region: 'eu-west-1',
  parameters: {
    TableName: 'UserSessions',
    KeyConditionExpression: 'userId = :userId AND sessionDate > :date',
    ExpressionAttributeValues: {
      ':userId': { S: 'user-12345' },
      ':date': { S: '2024-01-01' }
    },
    ScanIndexForward: false,
    Limit: 10
  }
});

// Response: Query results with matching session records
\`\`\`` as PromptPart;