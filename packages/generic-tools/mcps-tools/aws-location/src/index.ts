/**
 * AWS Location MCP Tools - Modern Tool Class Architecture
 * 
 * AWS Location Service integration tools using the Tool class pattern.
 */

import { Tool } from '@engi/tools-generics';
import {
  awsLocationGeospatialQueryTool as _awsLocationGeospatialQuery,
} from '@engi/aws';

// Import DocCodeToolPrompt
import { AWS_LOCATION_MCP_DOC_CODE_TOOL_PROMPT } from './prompts/AWSLocationMCPDocCodeToolPrompt';

/**
 * AWS Location Geospatial Query Tool for location-based services
 * 
 * @doc-code-tool
 * @prompt AWS_LOCATION_MCP_DOC_CODE_TOOL_PROMPT
 */
class AwsLocationGeospatialQueryTool extends Tool<typeof _awsLocationGeospatialQuery> {
  use = _awsLocationGeospatialQuery;
}

// Export singleton instances - proper non-barrel exports
export const awsLocationGeospatialQueryTool = new AwsLocationGeospatialQueryTool();

// Export DocCodeToolPrompt instance
export { AWS_LOCATION_MCP_DOC_CODE_TOOL_PROMPT };

// Export classes for type safety and extensibility
export { AwsLocationGeospatialQueryTool };
