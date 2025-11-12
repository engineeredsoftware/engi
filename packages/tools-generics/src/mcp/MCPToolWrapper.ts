import { Tool, ToolFunction } from '../Tool';
import { MCPToolDefinition } from '../types';

/**
 * Wraps an MCP (Model Context Protocol) tool definition into a Tool class
 */
export function wrapMCPTool<TArgs = any, TResult = any>(
  definition: MCPToolDefinition
): new () => Tool<(args: TArgs) => Promise<TResult>> {
  return class MCPWrappedTool extends Tool<(args: TArgs) => Promise<TResult>> {
    use = async (args: TArgs): Promise<TResult> => {
      // Validate input against schema
      const validatedArgs = definition.inputSchema.parse(args);
      
      // Execute the handler
      return definition.handler(validatedArgs);
    };
  };
}