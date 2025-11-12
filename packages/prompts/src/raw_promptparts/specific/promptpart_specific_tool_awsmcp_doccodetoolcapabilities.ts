/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Comprehensive capabilities list for AWS MCP cloud services integration"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "service_coverage", "test": "Does '{{content}}' cover major AWS service capabilities? Rate 0-1" },
 *   { "name": "technical_depth", "test": "Does '{{content}}' demonstrate technical capabilities depth? Rate 0-1" },
 *   { "name": "integration_breadth", "test": "Does '{{content}}' show comprehensive integration breadth? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLCAPABILITIES: PromptPart = 
  `• **Lambda Function Management**: Invoke, deploy, and monitor serverless functions with automatic scaling and error handling
• **S3 Operations**: Upload, download, list, and manage objects in S3 buckets with advanced filtering and metadata handling
• **DynamoDB Integration**: Perform CRUD operations, query and scan tables, manage indexes and streams
• **CloudWatch Monitoring**: Access logs, metrics, alarms, and dashboard data for comprehensive observability
• **Multi-Service Orchestration**: Coordinate complex workflows across multiple AWS services with intelligent sequencing
• **Resource Optimization**: Automatically optimize resource usage, costs, and performance based on usage patterns
• **Security Integration**: Handle IAM roles, policies, and secure access patterns across all AWS services
• **Error Recovery**: Implement robust error handling, retries, and fallback mechanisms for reliable operations` as PromptPart;