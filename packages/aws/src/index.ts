/**
 * AWS Package - Consolidated AWS utilities and tools
 */

// AWS Location exports
export { awsLocationGeospatialQueryTool } from './aws-location';

// AWS Terraform exports
export {
  awsTerraformSecurityScanTool,
  awsTerraformModuleSuggestionTool,
  awsTerraformCheckovScanTool,
  awsTerraformGenerateAwsModuleTool
} from './aws-terraform';

// Backwards-compatible stubs for GA-1; real MCP tools moved or not available here
export async function awsLambdaInvokeTool() { throw new Error('awsLambdaInvokeTool not available in @engi/aws'); }
export async function awsMcpTool() { throw new Error('awsMcpTool not available in @engi/aws'); }
export async function awsS3GetObjectTool() { throw new Error('awsS3GetObjectTool not available in @engi/aws'); }
export async function awsS3PutObjectTool() { throw new Error('awsS3PutObjectTool not available in @engi/aws'); }
export async function awsDynamoGetItemTool() { throw new Error('awsDynamoGetItemTool not available in @engi/aws'); }
export async function awsDynamoPutItemTool() { throw new Error('awsDynamoPutItemTool not available in @engi/aws'); }
export async function awsCloudWatchLogTool() { throw new Error('awsCloudWatchLogTool not available in @engi/aws'); }
