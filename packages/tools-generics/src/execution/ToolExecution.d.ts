/**
 * ToolExecution - Execution class with prompt registry for tools
 *
 * Extends base Execution with domain-specific registry:
 * - prompts: Prompt registry for tool-LLM interactions
 *
 * Tools read prompts for formatting inputs/outputs and error messages
 * when being called by agents through LLMs.
 *
 * @doc-code
 * type: execution
 * purpose: Tool execution with prompt support
 * pattern: layered-registry-execution
 */
import { Execution } from '@bitcode/execution-generics/Execution';
import { ToolPromptRegistry } from './ToolPromptRegistry';
/**
 * ToolExecution - Tool-level execution with prompt registry
 *
 * Provides tools with:
 * - Prompt management for LLM-tool interactions
 * - Execution tracking for tool usage
 * - Hierarchical prompt resolution
 *
 * This is the execution type used by Tool executors.
 */
export declare class ToolExecution extends Execution {
    readonly prompts: ToolPromptRegistry;
    constructor(id: string, parent?: Execution);
    /**
     * Create a child ToolExecution
     *
     * Maintains registry hierarchy through execution tree.
     * Child tools can access parent prompts.
     */
    child(id: string): ToolExecution;
}
/**
 * Factory function for creating tool executions
 */
export declare function createToolExecution(toolName: string, parent?: Execution): ToolExecution;
