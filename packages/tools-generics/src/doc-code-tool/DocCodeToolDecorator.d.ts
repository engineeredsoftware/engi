/**
 * DOC-CODE-TOOL DECORATOR - Runtime attachment of DocCodeToolPrompt
 *
 * This decorator parses @prompt references from @doc-code-tool comments
 * and automatically attaches the referenced DocCodeToolPrompt instance.
 */
import { Tool } from '../Tool';
import { DocCodeToolPrompt } from './DocCodeToolPrompt';
/**
 * Register a DocCodeToolPrompt instance
 * This should be called when prompt modules are loaded
 */
export declare function registerDocCodeToolPrompt(name: string, prompt: DocCodeToolPrompt): void;
/**
 * Get a registered DocCodeToolPrompt by name
 */
export declare function getDocCodeToolPrompt(name: string): DocCodeToolPrompt | undefined;
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
export declare function DocCodeTool(promptName: string): <T extends {
    new (...args: any[]): Tool<any>;
}>(constructor: T) => T;
/**
 * Alternative: Function to manually attach prompt after instantiation
 * This is what we're currently using
 */
export declare function attachDocCodeToolPrompt(tool: Tool, prompt: DocCodeToolPrompt): void;
