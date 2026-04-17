/**
 * MULTIMODAL PROCESSING TOOL - TOOL CLASS IMPLEMENTATION
 * 
 * Migrated from Vercel AI SDK to proper Tool class pattern with
 * full DocCodeToolPrompt integration.
 */

import { Tool } from '@bitcode/tools-generics';
import { z } from 'zod';
import { log } from '@bitcode/logger';
import { multimodalProcessingDocCodeToolPrompt } from './prompts/MultimodalProcessingDocCodeToolPrompt';

// Import the processing logic from the original file
import { 
  AttachmentSchema,
  MultimodalProcessingParamsSchema,
  MultimodalAnalysisResultSchema,
  processMultimodalAttachments,
  synthesizeMultimodalInsights
} from './processing';

/**
 * Multimodal Processing Tool
 * 
 * @doc-code-tool
 * @prompt MULTIMODAL_PROCESSING_DOC_CODE_TOOL_PROMPT
 */
export class MultimodalProcessingTool extends Tool<
  z.infer<typeof MultimodalProcessingParamsSchema>,
  {
    analysisResults: z.infer<typeof MultimodalAnalysisResultSchema>[];
    synthesis: {
      crossModalInsights: string[];
      unifiedUnderstanding: string;
      taskRelevance: number;
      recommendations: string[];
    };
  }
> {
  constructor() {
    super();
    this.name = 'multimodal-processing';
    this.description = 'Comprehensive multimodal attachment processing and analysis';
    
    // Store the doc-code-tool prompt for runtime access
    this.metadata = {
      version: '1.0.0',
      categories: ['attachment-analysis', 'multimodal'],
      capabilities: [
        'audio-analysis',
        'video-processing',
        'image-analysis',
        'document-parsing',
        'text-synthesis',
        'cross-modal-correlation'
      ],
      docCodeToolPrompt: multimodalProcessingDocCodeToolPrompt
    };
  }
  
  async use(params: z.infer<typeof MultimodalProcessingParamsSchema>) {
    log('Processing multimodal attachments', 'info', {
      attachmentCount: params.attachments.length,
      taskDescription: params.taskDescription.substring(0, 100) + '...'
    });
    
    try {
      // Validate input
      const validated = MultimodalProcessingParamsSchema.parse(params);
      
      // Process each attachment
      const analysisResults = await processMultimodalAttachments(
        validated.attachments,
        validated.processingOptions
      );
      
      // Synthesize cross-modal insights
      const synthesis = await synthesizeMultimodalInsights(
        analysisResults,
        validated.taskDescription
      );
      
      log('Multimodal processing complete', 'info', {
        processedCount: analysisResults.length,
        taskRelevance: synthesis.taskRelevance
      });
      
      return {
        analysisResults,
        synthesis
      };
    } catch (error) {
      log('Multimodal processing failed', 'error', { error });
      throw error;
    }
  }
}

// Export singleton instance
export const multimodalProcessingTool = new MultimodalProcessingTool();
