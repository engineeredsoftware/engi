import { Tool } from '../Tool';
import { MCPToolDefinition } from '../types';
/**
 * Wraps an MCP (Model Context Protocol) tool definition into a Tool class
 */
export declare function wrapMCPTool<TArgs = any, TResult = any>(definition: MCPToolDefinition): new () => Tool<(args: TArgs) => Promise<TResult>>;
