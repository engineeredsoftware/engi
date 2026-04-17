/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: example
 * intent: "Second example demonstrating S3 object management"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "s3_example_clarity", "test": "Does '{{content}}' clearly demonstrate S3 operations? Rate 0-1" },
 *   { "name": "storage_usecase", "test": "Does '{{content}}' show practical S3 use case? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLEXAMPLE2: PromptPart = 
  `**Example 2: S3 Object Upload**

\`\`\`javascript
// Upload file to S3 bucket with metadata
await awsMcpTool.use({
  service: 's3',
  operation: 'putObject',
  region: 'us-west-2',
  parameters: {
    Bucket: 'my-app-documents',
    Key: 'uploads/document-2024.pdf',
    Body: fileBuffer,
    ContentType: 'application/pdf',
    Metadata: {
      uploadedBy: 'user-12345',
      category: 'legal-documents'
    }
  }
});

// Response: Upload confirmation with object details
\`\`\`` as PromptPart;