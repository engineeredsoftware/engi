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
import { PromptFormatter } from '@bitcode/prompts';

/**
 * Format an array of tools (Tools with doc-code-tools) into documentation suitable for LLM consumption
 * 
 * @param tools - Array of Tool instances that may have attached DocCodeToolPrompt
 * @param formatter - Optional custom formatter for the prompts
 * @returns Formatted string containing tool documentation
 */
export function formatToolsWithDocCodeToolsIntoUsableTools(tools: Tool[], formatter?: PromptFormatter): string {
  if (!tools || tools.length === 0) {
    return 'No tools available.';
  }

  const formattedTools: string[] = [];

  for (const tool of tools) {
    // Check if tool has attached DocCodeToolPrompt
    const docCodePrompt = tool.__docCodePrompt;

    if (docCodePrompt && docCodePrompt instanceof DocCodeToolPrompt) {
      // Use the prompt's format method to get formatted documentation
      const formatted = docCodePrompt.format(formatter);
      formattedTools.push(formatted);
    } else {
      // Fallback for tools without DocCodeToolPrompt
      // This should rarely happen once all tools are properly migrated
      const toolName = tool.constructor.name || 'UnknownTool';
      formattedTools.push(`Tool: ${toolName} (No documentation available)`);
    }
  }

  return formattedTools.join('\n\n---\n\n');
}

/**
 * Extract tool metadata for structured formatting
 * This is an alternative that returns structured data instead of a string
 * 
 * @param tools - Array of Tool instances
 * @returns Array of tool metadata objects
 */
export function extractToolMetadata(tools: Tool[]): Array<{
  name: string;
  documentation: string;
  prompt: DocCodeToolPrompt | null;
  hasDocCode: boolean;
}> {
  return tools.map(tool => {
    const docCodePrompt = tool.__docCodePrompt;

    if (docCodePrompt && docCodePrompt instanceof DocCodeToolPrompt) {
      return {
        name: tool.constructor.name,
        documentation: docCodePrompt.format(),
        prompt: docCodePrompt,
        hasDocCode: true
      };
    }

    return {
      name: tool.constructor.name || 'UnknownTool',
      documentation: 'No documentation available',
      prompt: null,
      hasDocCode: false
    };
  });
}

/**
 * Type guard to check if a tool has doc-code documentation
 */
export function hasDocCodePrompt(tool: Tool): tool is Tool & { __docCodePrompt: DocCodeToolPrompt } {
  return tool.__docCodePrompt instanceof DocCodeToolPrompt;
}
