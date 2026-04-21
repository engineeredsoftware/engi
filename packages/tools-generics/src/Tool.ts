/**
 * Base Tool class - the foundational primitive for all tools in Bitcode.
 * 
 * Tools are type-safe wrappers around functions that provide:
 * - Structured documentation via @doc-code-tool
 * - Automatic invocation tracking
 * - MCP (Model Context Protocol) integration
 * - Zero runtime overhead
 * 
 * Every tool in Bitcode extends this class and implements the `use` method.
 */

// Type for any tool function
export type ToolFunction = (...args: any[]) => any;

/**
 * Abstract base class for all tools.
 * 
 * @doc-code-tool
 * @name Tool
 * @purpose Base class providing type-safe tool abstraction
 * @capabilities Type safety, async execution, extensibility
 * @category infrastructure
 * @stability stable
 * @version 1.0.0
 * 
 * @template T - The function signature this tool wraps
 */
export abstract class Tool<T extends ToolFunction = ToolFunction> {
  /**
   * The core tool function - must be implemented by each tool.
   * This is the actual implementation that gets called when the tool is used.
   */
  abstract use: T;
  
  /**
   * DocCodeToolPrompt attached by build-time transform.
   * Available at runtime for LLM consumption via formatUsableTools.
   * @internal
   */
  __docCodePrompt?: any; // Using any to avoid circular dependency with DocCodeToolPrompt
  
  /**
   * Execute the tool function.
   * Provides a runtime execution method that can be enhanced with
   * tracking, logging, or other cross-cutting concerns.
   */
  async execute(...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> {
    return this.use(...args);
  }
}
