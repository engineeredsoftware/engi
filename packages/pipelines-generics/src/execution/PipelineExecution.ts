/**
 * PipelineExecution - Full-featured execution for pipelines
 * 
 * Extends PromptExecution to add tool, LLM, and agent registries.
 * This is the complete execution context for pipeline operations.
 * 
 * @doc-code
 * type: execution
 * purpose: Provide complete registry set for pipeline execution
 * pattern: registry-aggregation
 */

import { Execution, registerExecution } from '@engi/execution-generics';
import { PipelinePromptRegistry } from './PipelinePromptRegistry';
import { PipelineToolRegistry } from './PipelineToolRegistry';
import { PipelineLLMRegistry } from './PipelineLLMRegistry';
import { PipelineAgentRegistry } from './PipelineAgentRegistry';

/**
 * PipelineExecution - Complete execution context for pipelines
 * 
 * Provides all four registries needed for pipeline operations:
 * - prompts (for prompt management)
 * - tools (for tool registration and lookup)
 * - llms (for LLM configuration and selection)
 * - agents (for agent registration and dynamic selection)
 */
export class PipelineExecution extends Execution {
  readonly prompts: PipelinePromptRegistry;
  readonly tools: PipelineToolRegistry;
  readonly llms: PipelineLLMRegistry;
  readonly agents: PipelineAgentRegistry;
  
  constructor(id: string, parent?: Execution) {
    super(id, parent);

    // Initialize all 4 registries with parent chain awareness
    this.prompts = new PipelinePromptRegistry(this);
    this.tools = new PipelineToolRegistry(this);
    this.llms = new PipelineLLMRegistry(this);
    this.agents = new PipelineAgentRegistry(this);

    // Register root executions for instruction API access
    // Child executions are not registered (only root runId is used)
    if (!parent) {
      registerExecution(id, this);
    }

    // If parent is also PipelineExecution, inherit registry state
    if (parent && parent instanceof PipelineExecution) {
      // Tools, LLMs, and Agents can inherit from parent
      // but start with empty registries (lookup walks up chain)
    }
  }
  
  /**
   * Override child to maintain PipelineExecution type
   */
  child(id: string): PipelineExecution {
    return new PipelineExecution(`${this.id}/${id}`, this);
  }
}

/**
 * Factory function for creating pipeline executions
 */
export function createPipelineExecution(id: string, parent?: Execution): PipelineExecution {
  return new PipelineExecution(id, parent);
}