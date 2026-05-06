import { z } from 'zod';
import type { PromptPart } from '@bitcode/prompts/parts/PromptPart';

/**
 * Core types for the tools-generics package
 */

/**
 * Tool metadata that can be extracted from @doc-code-tool comments
 */
export interface ToolMetadata {
  name: string;
  category: string;
  version: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  stability: 'experimental' | 'beta' | 'stable' | 'retired';
  purpose: string;
  capabilities: string[];
  parameters: Record<string, any>;
  output: any;
}

/**
 * MCP tool definition for wrapping external tools
 */
export interface MCPToolDefinition {
  name: string;
  description: string;
  inputSchema: z.ZodType<any>;
  handler: (...args: any[]) => Promise<any>;
}

/**
 * Tool execution result
 */
export interface ToolExecutionResult<T = any> {
  success: boolean;
  result?: T;
  error?: string;
  metadata?: {
    duration: number;
    tokensUsed?: number;
  };
}

/**
 * Tool use specification - represents a planned tool usage
*
  * TODO: duplication in agent generics
 */
export interface ToolUse {
  toolName: string;
  parameters: Record<string, any>;
  metadata?: {
    priority?: number;
    timeout?: number;
  };
}

/**
 * Used tool result - represents the result of tool execution
*
  * TODO: duplication in agent-generics
 */
export interface UsedTool {
  toolName: string;
  success: boolean;
  result?: any;
  error?: string;
  metadata?: {
    tokensUsed?: number;
    duration?: number;
  };
}
