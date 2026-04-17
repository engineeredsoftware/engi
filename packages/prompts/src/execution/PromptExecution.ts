/**
 * PromptExecution - Execution with prompt registry capability
 * 
 * Extends base Execution to add prompt registry functionality.
 * This is the base for any execution that needs prompts.
 * 
 * @doc-code
 * type: execution
 * purpose: Add prompt capability to executions
 * pattern: registry-extension
 */

import { Execution } from '@bitcode/execution-generics';
import { Prompt } from '../prompt';

/**
 * PromptExecution - Adds prompt registry to base Execution
 * 
 * Any execution that needs prompts should extend this.
 * Pipelines extend this to add more registries (tools, llms, agents).
 */
export class PromptExecution extends Execution {
  readonly prompts: Prompt;
  
  constructor(id: string, parent?: Execution) {
    super(id, parent);
    
    // Initialize prompt registry
    this.prompts = new Prompt();
    
    // If parent has prompts, inherit requirements
    if (parent && parent instanceof PromptExecution) {
      // Clone parent's requirements but not content
      parent.prompts.getRequired().forEach(req => {
        if (req.startsWith('pattern:')) {
          this.prompts.requirePattern(req.substring(8));
        } else {
          this.prompts.require(req);
        }
      });
    }
  }
  
  /**
   * Override child to maintain PromptExecution type
   */
  child(id: string): PromptExecution {
    return new PromptExecution(`${this.id}/${id}`, this);
  }
}

/**
 * Factory function for creating prompt executions
 */
export function createPromptExecution(id: string, parent?: Execution): PromptExecution {
  return new PromptExecution(id, parent);
}