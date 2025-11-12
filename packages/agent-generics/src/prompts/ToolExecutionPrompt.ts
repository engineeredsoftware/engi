/**
 * Tool Execution Prompt - Minimal prompt for tool execution substep
 * 
 * ToolExecutionPrompt provides context for executing tools after
 * all failsafes complete. Tool doc-code-tool prompts are automatically
 * injected based on available tools.
 * 
 * @doc-comment-developing-promptdevelopment
 * domain: agent
 * intent: "Provide tool execution instruction"
 * current_version: "GA1.50.0"
 */

import { Prompt } from '@engi/prompts';
import type { PromptPart } from '@engi/prompts';

export interface ToolExecutionPromptConfig {
  // Just the execution instruction
  execute: PromptPart; // e.g., "Execute selected tools"
}

/**
 * ToolExecutionPrompt - Minimal tool execution prompt
 * 
 * Contains only the execution instruction. The execution system
 * automatically injects doc-code-tool prompts for available tools.
 */
export class ToolExecutionPrompt extends Prompt {
  constructor(config: ToolExecutionPromptConfig) {
    super();
    
    // Set only the execution instruction
    this.set('tool:execute', config.execute);
  }
  
  /**
   * Get the execution instruction
   */
  getExecute(): PromptPart {
    return this.get('tool:execute') as PromptPart;
  }
  
  /**
   * Called by execution system to inject available tool docs
   * @internal
   */
  injectAvailableTools(toolDocs: PromptPart[]): void {
    toolDocs.forEach((doc, index) => {
      this.set(`auto:tool_doc_${index}`, doc);
    });
  }
}