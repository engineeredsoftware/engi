/**
 * MULTIMODAL PROCESSING TOOLS - TOOL CLASS PATTERN
 * 
 * Migrated to proper Tool class pattern with DocCodeToolPrompt integration.
 * No more direct Vercel AI SDK usage - full type safety and execution context.
 */

// Export the Tool class implementation
export { 
  multimodalProcessingTool 
} from './MultimodalProcessingTool';

// Export the processing logic for direct use if needed
export {
  processMultimodalAttachments,
  synthesizeMultimodalInsights,
  determineProcessingAgent,
  AttachmentSchema,
  MultimodalProcessingParamsSchema,
  MultimodalAnalysisResultSchema,
  ProcessingAgentEnum
} from './processing';

// Export the DocCodeToolPrompt
export { 
  MultimodalProcessingDocCodeToolPrompt,
  multimodalProcessingDocCodeToolPrompt
} from './prompts/MultimodalProcessingDocCodeToolPrompt';

// Default export is the tool instance
export { multimodalProcessingTool as default } from './MultimodalProcessingTool';
