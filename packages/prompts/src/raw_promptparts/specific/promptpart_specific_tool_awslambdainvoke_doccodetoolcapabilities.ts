/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Comprehensive capabilities list for AWS Lambda function invocation"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "invocation_coverage", "test": "Does '{{content}}' cover Lambda invocation capabilities comprehensively? Rate 0-1" },
 *   { "name": "execution_modes", "test": "Does '{{content}}' address different execution modes? Rate 0-1" },
 *   { "name": "monitoring_depth", "test": "Does '{{content}}' show monitoring and debugging capabilities? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLCAPABILITIES: PromptPart = 
  `• **Function Invocation**: Execute Lambda functions with synchronous (RequestResponse) and asynchronous (Event) invocation types
• **Payload Management**: Handle complex JSON payloads with automatic serialization and validation
• **Version Control**: Invoke specific function versions, aliases, and $LATEST with intelligent routing
• **Error Handling**: Capture and process function errors, timeouts, and throttling with detailed error analysis
• **Response Processing**: Parse and format Lambda responses including logs, execution metadata, and custom headers
• **Batch Operations**: Execute multiple function invocations with parallel processing and result aggregation
• **Monitoring Integration**: Track invocation metrics, duration, memory usage, and billing information
• **Security Management**: Handle IAM permissions, cross-account invocations, and resource-based policies` as PromptPart;