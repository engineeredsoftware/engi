// Core Tool primitive
export { Tool } from './Tool';
export type { ToolFunction } from './Tool';
export { factoryTool } from './factoryTool';

// Types
export type {
  ToolMetadata,
  MCPToolDefinition,
  ToolExecutionResult,
  ToolUse,
  UsedTool
} from './types';

// Execution types with prompt registry
export {
  ToolExecution,
  createToolExecution,
  ToolPromptRegistry
} from './execution';

// MCP integration
export { wrapMCPTool } from './mcp/MCPToolWrapper';

// Doc-Code-Tool infrastructure
export {
  DocCodeToolPlugin,
  DocCodeToolDecorator as DocTool,
  DocCodeToolPrompt,
  DocCodeToolPrompt as ToolPrompt,
  formatUsableTools,
  extractToolMetadata,
  hasDocCodePrompt,
  attachDocCodeToolPrompt,
  registerDocCodeToolPrompt,
  getDocCodeToolPrompt
} from './doc-code-tool';
export type { DocCodeToolMetadata } from './doc-code-tool';
