import { Tool, type ToolFunction } from './Tool';
interface FactoryToolOptions {
    description?: string;
    parameters?: unknown;
    metadata?: Record<string, unknown>;
    prompt?: unknown;
}
export interface FactoryToolResult<T extends ToolFunction> extends Tool<T> {
    toolName: string;
    tool: {
        name: string;
        function: {
            name: string;
            description: string;
            parameters: unknown;
        };
        metadata?: Record<string, unknown>;
    };
}
/**
 * Create a Tool instance from a plain async function with optional metadata.
 */
export declare function factoryTool<T extends ToolFunction>(toolName: string, implementation: T, options?: FactoryToolOptions): FactoryToolResult<T>;
export {};
