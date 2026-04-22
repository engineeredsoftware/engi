/**
 * Doc-Code-Tool Infrastructure
 *
 * This directory contains all components related to the @doc-code-tool
 * documentation system for tools in Bitcode.
 */
export { DocCodeToolPlugin } from './DocCodeToolPlugin';
export type { DocCodeToolMetadata } from './DocCodeToolPlugin';
export { DocCodeToolPrompt } from './DocCodeToolPrompt';
export { formatToolsWithDocCodeToolsIntoUsableTools as formatUsableTools, // TODO: undo alias (use more precise/long name!)
extractToolMetadata, hasDocCodePrompt } from './formatUsableTools';
export { DocCodeTool as DocCodeToolDecorator, registerDocCodeToolPrompt, getDocCodeToolPrompt, attachDocCodeToolPrompt } from './DocCodeToolDecorator';
