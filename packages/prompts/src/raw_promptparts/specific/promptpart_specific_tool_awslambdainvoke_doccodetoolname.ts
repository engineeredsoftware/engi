/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: name
 * intent: "Tool name for AWS Lambda function invocation"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "name_clarity", "test": "Does '{{content}}' clearly identify the Lambda invoke tool? Rate 0-1" },
 *   { "name": "service_specificity", "test": "Does '{{content}}' specify Lambda service focus? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_AWSLAMBDAINVOKE_DOCCODETOOLNAME: PromptPart = 
  'AWS Lambda Function Invocation Tool' as PromptPart;