/**
 * FORMAT USABLE TOOLS - Extract and format tool documentation for LLM consumption
 *
 * This is the CORRECT location for tool formatting utilities.
 * Tools own their documentation infrastructure.
 *
 * TODO: UsableTools should be a type! (like UseTool(s), and UsedTool(s)) but also not
 *       declared here in doc-code-tool but still i tools-generics (types) and imported here
 */
import { Tool } from '../Tool';
import { DocCodeToolPrompt } from './DocCodeToolPrompt';
import type { PromptFormatter } from '@bitcode/prompts/formatters';
/**
 * Format an array of tools (Tools with doc-code-tools) into documentation suitable for LLM consumption
 *
 * @param tools - Array of Tool instances that may have attached DocCodeToolPrompt
 * @param formatter - Optional custom formatter for the prompts
 * @returns Formatted string containing tool documentation
 */
export declare function formatToolsWithDocCodeToolsIntoUsableTools(tools: Tool[], formatter?: PromptFormatter): string;
/**
 * Extract tool metadata for structured formatting
 * This is an alternative that returns structured data instead of a string
 *
 * @param tools - Array of Tool instances
 * @returns Array of tool metadata objects
 */
export declare function extractToolMetadata(tools: Tool[]): Array<{
    name: string;
    documentation: string;
    prompt: DocCodeToolPrompt | null;
    hasDocCode: boolean;
}>;
/**
 * Type guard to check if a tool has doc-code documentation
 */
export declare function hasDocCodePrompt(tool: Tool): tool is Tool & {
    __docCodePrompt: DocCodeToolPrompt;
};
