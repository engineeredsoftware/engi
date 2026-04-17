/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Core purpose statement for comprehensive AWS cloud services integration"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "aws_integration_clarity", "test": "Does '{{content}}' clearly articulate AWS services integration purpose? Rate 0-1" },
 *   { "name": "cloud_orchestration_focus", "test": "Does '{{content}}' emphasize cloud orchestration capabilities? Rate 0-1" },
 *   { "name": "scalability_mission", "test": "Does '{{content}}' convey scalable cloud infrastructure mission? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_AWSMCP_DOCCODETOOLPURPOSE: PromptPart = 
  'Provides comprehensive AWS cloud services integration through MCP (Model Context Protocol) interface, enabling seamless orchestration of Lambda functions, S3 storage operations, DynamoDB data management, CloudWatch monitoring, and other AWS services with intelligent resource optimization and automated infrastructure management.' as PromptPart;