/**
 * Tool Execution Types - Execution classes for tool hierarchy
 * 
 * Provides tool-specific execution with prompt registry support.
 * Tools use prompts for formatting inputs/outputs for LLM interactions.
 */

// Export ToolExecution and registry
export { ToolExecution, createToolExecution } from './ToolExecution';
export { ToolPromptRegistry } from './ToolPromptRegistry';