/**
 * Doc-Code-Tool Infrastructure
 * 
 * This directory contains all components related to the @doc-code-tool
 * documentation system for tools in Bitcode.
 */

// Plugin for parsing @doc-code-tool comments
export { DocCodeToolPlugin } from './DocCodeToolPlugin';
export type { DocCodeToolMetadata } from './DocCodeToolPlugin';

// Prompt structure for doc-code-tool documentation
export { DocCodeToolPrompt } from './DocCodeToolPrompt';

// Tool formatting utilities
export {
  formatToolsWithDocCodeToolsIntoUsableTools as formatUsableTools, // TODO: undo alias (use more precise/long name!)
  extractToolMetadata,
  hasDocCodePrompt
} from './formatUsableTools';

// Decorator and registry for automatic prompt attachment
export {
  DocCodeTool as DocCodeToolDecorator,
  registerDocCodeToolPrompt,
  getDocCodeToolPrompt,
  attachDocCodeToolPrompt
} from './DocCodeToolDecorator';
