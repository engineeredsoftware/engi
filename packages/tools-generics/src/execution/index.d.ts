/**
 * Tool Execution Types - Execution classes for tool hierarchy
 *
 * Provides tool-specific execution with prompt registry support.
 * Tools use prompts for formatting inputs/outputs for LLM interactions.
 */
export { ToolExecution, createToolExecution } from './ToolExecution';
export { ToolPromptRegistry } from './ToolPromptRegistry';
