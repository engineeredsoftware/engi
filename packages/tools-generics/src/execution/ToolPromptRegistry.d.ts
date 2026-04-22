/**
 * ToolPromptRegistry - Prompt registry for tool executions
 *
 * Manages prompt registration and hierarchical lookup for tools.
 * Prompts are used for formatting tool inputs/outputs for LLM interactions.
 *
 * @doc-code
 * type: registry
 * purpose: Hierarchical prompt management for tools
 * pattern: registry-with-execution-context
 */
import { RegistryImpl } from '@bitcode/registry';
import { Execution } from '@bitcode/execution-generics';
/**
 * ToolPromptRegistry - Hierarchical prompt registry for tools
 *
 * Wraps the base PromptRegistry with execution-aware resolution.
 * Prompts can be registered at any level and resolved upward.
 *
 * Tool prompts typically include:
 * - Input formatting prompts
 * - Output formatting prompts
 * - Error handling prompts
 * - Validation prompts
 */
export declare class ToolPromptRegistry extends RegistryImpl<any> {
    private readonly execution;
    constructor(execution: Execution);
    /**
     * Register a prompt at this execution level
     *
     * Prompts are stored with path-based keys for hierarchical lookup.
     * Example keys:
     * - "tool:input" - Input formatting prompt
     * - "tool:output" - Output formatting prompt
     * - "tool:error" - Error handling prompt
     * - "tool:validation" - Validation prompt
     * - "tool:description" - Tool description prompt
     */
    registerPrompt(key: string, prompt: any, priority?: number): void;
    /**
     * Get prompt by walking up the execution hierarchy
     *
     * Searches from current level up through parents.
     * This enables prompt inheritance and specialization.
     */
    getPrompt(key: string): any | undefined;
    /**
     * Get prompt with fallback pattern
     *
     * Try multiple keys in order, returning first match.
     * Useful for graceful degradation to generic prompts.
     *
     * Example: Try "tool:vcs:input" then "tool:input"
     */
    getPromptWithFallback(keys: string[]): any | undefined;
    /**
     * Get all prompts available in hierarchy
     */
    getUsablePrompts(): Record<string, any>;
    /**
     * Format tool input using registered prompts
     *
     * Uses the tool:input prompt to format tool parameters
     * for LLM understanding.
     */
    formatInput(toolName: string, input: any): string;
    /**
     * Format tool output using registered prompts
     *
     * Uses the tool:output prompt to format tool results
     * for LLM understanding.
     */
    formatOutput(toolName: string, output: any): string;
    /**
     * Format tool error using registered prompts
     *
     * Uses the tool:error prompt to format tool errors
     * for LLM understanding.
     */
    formatError(toolName: string, error: Error): string;
}
