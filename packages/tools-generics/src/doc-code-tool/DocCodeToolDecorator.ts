/**
 * DOC-CODE-TOOL DECORATOR - Runtime attachment of DocCodeToolPrompt
 * 
 * This decorator parses @prompt references from @doc-code-tool comments
 * and automatically attaches the referenced DocCodeToolPrompt instance.
 */

import { Tool } from '../Tool';
import { DocCodeToolPrompt } from './DocCodeToolPrompt';

/**
 * Map to store prompt references during module loading
 * Key: prompt constant name, Value: DocCodeToolPrompt instance
 */
const PROMPT_REGISTRY = new Map<string, DocCodeToolPrompt>();

/**
 * Register a DocCodeToolPrompt instance
 * This should be called when prompt modules are loaded
 */
export function registerDocCodeToolPrompt(name: string, prompt: DocCodeToolPrompt): void {
  PROMPT_REGISTRY.set(name, prompt);
}

/**
 * Get a registered DocCodeToolPrompt by name
 */
export function getDocCodeToolPrompt(name: string): DocCodeToolPrompt | undefined {
  return PROMPT_REGISTRY.get(name);
}

/**
 * Decorator that attaches DocCodeToolPrompt based on @prompt reference
 * 
 * Usage:
 * ```typescript
 * @DocCodeTool('TEXT_EDITOR_DOC_CODE_TOOL_PROMPT')
 * class TextEditorTool extends Tool<typeof runEditCommand> {
 *   use = runEditCommand;
 * }
 * ```
 */
export function DocCodeTool(promptName: string) {
  return function <T extends { new(...args: any[]): Tool<any> }>(constructor: T) {
    // Create a new class that extends the original
    class DocCodeToolClass extends constructor {
      use = (this as any).use;

      constructor(...args: any[]) {
        super(...args);
        
        // Attach the prompt if it's registered
        const prompt = PROMPT_REGISTRY.get(promptName);
        if (prompt) {
          (this as any).__docCodePrompt = prompt;
          // Store prompt directly without compose
          (this as any).__promptParts = prompt;
        } else {
          console.warn(`DocCodeToolPrompt '${promptName}' not found in registry`);
        }
      }
    }
    
    // Preserve the original class name and properties
    Object.defineProperty(DocCodeToolClass, 'name', { value: constructor.name });
    Object.setPrototypeOf(DocCodeToolClass, constructor);
    Object.setPrototypeOf(DocCodeToolClass.prototype, constructor.prototype);
    
    return DocCodeToolClass as T;
  };
}

/**
 * Alternative: Function to manually attach prompt after instantiation
 * This is what we're currently using
 */
export function attachDocCodeToolPrompt(tool: Tool, prompt: DocCodeToolPrompt): void {
  (tool as any).__docCodePrompt = prompt;
  // Store prompt directly without compose
  (tool as any).__promptParts = prompt;
}
