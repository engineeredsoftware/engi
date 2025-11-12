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
export function factoryTool<T extends ToolFunction>(
  toolName: string,
  implementation: T,
  options: FactoryToolOptions = {}
): FactoryToolResult<T> {
  class GeneratedTool extends Tool<T> {
    use = implementation;
  }

  const instance = new GeneratedTool() as FactoryToolResult<T>;
  const functionName = toolName.endsWith('Tool') ? toolName.slice(0, -4) : toolName;

  instance.toolName = toolName;
  const fallbackName = functionName || toolName;
  const description = options.description ?? fallbackName;

  instance.tool = {
    name: toolName,
    function: {
      name: fallbackName,
      description,
      parameters: options.parameters ?? {},
    },
    metadata: options.metadata,
  };

  if (options.prompt) {
    (instance as any).__docCodePrompt = options.prompt;
  }

  return instance;
}
