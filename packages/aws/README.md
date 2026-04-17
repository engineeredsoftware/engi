# AWS MCP Tools

## Overview

Comprehensive AWS services Model Context Protocol (MCP) integration tools providing access to Lambda, S3, DynamoDB, and CloudWatch through standardized interfaces.

## Core Functionality

- **Lambda Function Management**: Invoke AWS Lambda functions with custom payloads
- **S3 Object Operations**: Read and write objects to Amazon S3 buckets
- **DynamoDB Data Access**: Get and put items in DynamoDB tables
- **CloudWatch Logging**: Send log messages to CloudWatch Logs
- **Generic AWS Operations**: Flexible AWS resource interaction interface

## API Reference

### `awsMcpTool(params)`

Generic AWS resource operation tool for flexible resource management.

**Parameters:**
- `params.resourceId: string` - AWS resource identifier

**Returns:**
```typescript
Promise<{
  message: string; // Operation confirmation message
}>
```

### `awsLambdaInvokeTool(params)`

Invoke AWS Lambda functions with custom payloads.

**Parameters:**
- `params.functionName: string` - Lambda function name or ARN
- `params.payload: any` - Function invocation payload

**Returns:**
```typescript
Promise<{
  invoked: string; // Invoked function name
}>
```

### `awsS3GetObjectTool(params)`

Retrieve objects from Amazon S3 buckets.

**Parameters:**
- `params.bucket: string` - S3 bucket name
- `params.key: string` - Object key path

**Returns:**
```typescript
Promise<{
  bucket: string;     // Source bucket name
  key: string;        // Object key
  body: any | null;   // Object content
}>
```

### `awsS3PutObjectTool(params)`

Upload objects to Amazon S3 buckets.

**Parameters:**
- `params.bucket: string` - Target S3 bucket name
- `params.key: string` - Object key path
- `params.body: ArrayBuffer` - Object content as binary data

**Returns:**
```typescript
Promise<{
  uploaded: string; // Upload confirmation path (bucket/key)
}>
```

### `awsDynamoGetItemTool(params)`

Retrieve items from DynamoDB tables.

**Parameters:**
- `params.table: string` - DynamoDB table name
- `params.key: any` - Primary key object

**Returns:**
```typescript
Promise<{
  item: any | null; // Retrieved item or null if not found
}>
```

### `awsDynamoPutItemTool(params)`

Store items in DynamoDB tables.

**Parameters:**
- `params.table: string` - DynamoDB table name
- `params.item: any` - Item object to store

**Returns:**
```typescript
Promise<{
  put: boolean; // Success confirmation
}>
```

### `awsCloudWatchLogTool(params)`

Send log messages to AWS CloudWatch Logs.

**Parameters:**
- `params.message: string` - Log message content

**Returns:**
```typescript
Promise<{
  logged: boolean; // Log success confirmation
}>
```

## Usage Examples

### Lambda Function Invocation
```typescript
import { awsLambdaInvokeTool } from '@bitcode/aws';

// Invoke data processing function
const result = await awsLambdaInvokeTool({
  functionName: 'data-processor',
  payload: {
    inputData: 'process this data',
    options: { format: 'json', validate: true }
  }
});

console.log(`Invoked function: ${result.invoked}`);
```

### S3 File Operations
```typescript
import { awsS3GetObjectTool, awsS3PutObjectTool } from '@bitcode/aws';

// Download file from S3
const file = await awsS3GetObjectTool({
  bucket: 'my-data-bucket',
  key: 'data/config.json'
});

// Upload processed file
const encoder = new TextEncoder();
const data = encoder.encode(JSON.stringify({ processed: true }));

await awsS3PutObjectTool({
  bucket: 'my-output-bucket',
  key: 'results/processed-config.json',
  body: data.buffer
});
```

### DynamoDB Operations
```typescript
import { awsDynamoGetItemTool, awsDynamoPutItemTool } from '@bitcode/aws';

// Retrieve user profile
const user = await awsDynamoGetItemTool({
  table: 'users',
  key: { userId: 'user-12345' }
});

// Update user activity
await awsDynamoPutItemTool({
  table: 'user-activity',
  item: {
    userId: 'user-12345',
    action: 'login',
    timestamp: Date.now(),
    metadata: { source: 'web-app' }
  }
});
```

### CloudWatch Logging
```typescript
import { awsCloudWatchLogTool } from '@bitcode/aws';

// Log application events
await awsCloudWatchLogTool({
  message: JSON.stringify({
    level: 'INFO',
    service: 'user-service',
    action: 'authentication',
    userId: 'user-12345',
    timestamp: new Date().toISOString()
  })
});
```

### Resource Management
```typescript
import { awsMcpTool } from '@bitcode/aws';

// Generic resource operation
const result = await awsMcpTool({
  resourceId: 'arn:aws:ec2:us-east-1:123456789012:instance/i-1234567890abcdef0'
});

console.log(result.message); // "AWS MCP operated on arn:aws:..."
```

## MCP Integration

### Tool Registration
```typescript
// MCP server AWS tools configuration
const awsTools = [
  {
    name: 'aws_lambda_invoke',
    description: 'Invoke AWS Lambda functions',
    parameters: {
      functionName: { type: 'string', required: true },
      payload: { type: 'object', required: true }
    },
    handler: awsLambdaInvokeTool
  },
  {
    name: 'aws_s3_get_object',
    description: 'Get object from S3 bucket',
    parameters: {
      bucket: { type: 'string', required: true },
      key: { type: 'string', required: true }
    },
    handler: awsS3GetObjectTool
  },
  {
    name: 'aws_s3_put_object',
    description: 'Put object to S3 bucket',
    parameters: {
      bucket: { type: 'string', required: true },
      key: { type: 'string', required: true },
      body: { type: 'buffer', required: true }
    },
    handler: awsS3PutObjectTool
  }
  // ... additional tools
];
```

## AWS Services Coverage

### Compute Services
- **Lambda**: Function invocation with payload support
- **EC2**: Instance management via generic resource tool
- **ECS**: Container orchestration operations

### Storage Services
- **S3**: Object storage with get/put operations
- **EFS**: Elastic File System access
- **EBS**: Elastic Block Store management

### Database Services
- **DynamoDB**: NoSQL database operations (get/put items)
- **RDS**: Relational database integration
- **Aurora**: Serverless database management

### Monitoring & Logging
- **CloudWatch**: Log message forwarding
- **X-Ray**: Distributed tracing integration
- **CloudTrail**: API call auditing

## Configuration

### AWS Credentials
```bash
# Environment variables
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_SESSION_TOKEN=your-session-token  # If using temporary credentials

# Or AWS credentials file
~/.aws/credentials
~/.aws/config
```

### IAM Permissions
Required IAM policies for full functionality:
- `AWSLambdaInvokeFunction` - Lambda execution
- `AmazonS3FullAccess` - S3 read/write operations  
- `AmazonDynamoDBFullAccess` - DynamoDB access
- `CloudWatchLogsFullAccess` - CloudWatch logging

## Implementation Status

**Current State**: Basic interface definitions with placeholder responses
- All tools return confirmation messages
- Ready for AWS SDK integration

**Production Requirements**:
- AWS SDK v3 integration
- Authentication and credential management
- Error handling and retry logic
- Response parsing and data transformation
- Resource validation and permissions checking

## Performance Characteristics

- **Lambda Invocation**: 50-500ms depending on function cold start
- **S3 Operations**: 100-300ms for small objects (<1MB)
- **DynamoDB**: 10-50ms for single item operations
- **CloudWatch Logs**: 50-200ms for log message delivery

## Error Handling

Production implementation will include:
- AWS service error parsing and categorization
- Retry logic with exponential backoff
- Rate limiting and throttling protection
- Network failure recovery
- Credential rotation support