/**
 * MULTIMODAL PROCESSING LOGIC
 * 
 * Core processing functions extracted from the original implementation.
 */

import { z } from 'zod';
import { log } from '@engi/logger';

// Export schemas for reuse
export const AttachmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  content: z.string(),
  file_url: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

export const MultimodalProcessingParamsSchema = z.object({
  attachments: z.array(AttachmentSchema),
  taskDescription: z.string(),
  processingOptions: z.object({
    enableFigmaIntegration: z.boolean().default(true),
    enableLSPAnalysis: z.boolean().default(true),
    enableCrossModalSynthesis: z.boolean().default(true),
    qualityThreshold: z.number().min(0).max(1).default(0.7)
  }).optional()
});

export const ProcessingAgentEnum = z.enum(['audio', 'video', 'image', 'document', 'text']);

export const MultimodalAnalysisResultSchema = z.object({
  attachmentId: z.string(),
  attachmentName: z.string(),
  attachmentType: z.string(),
  processingAgent: ProcessingAgentEnum,
  analysis: z.object({
    summary: z.string(),
    keyElements: z.array(z.string()),
    technicalContent: z.array(z.string()),
    specifications: z.record(z.any()),
    relevance: z.number().min(0).max(1),
    insights: z.array(z.string()),
    figmaContext: z.object({
      extractedFromFigma: z.boolean(),
      fileKey: z.string().optional(),
      nodeId: z.string().optional(),
      artboardName: z.string().optional(),
      originalUrl: z.string().optional()
    }).optional()
  })
});

/**
 * Determine the appropriate processing agent for multimodal content
 */
export function determineProcessingAgent(
  attachmentName: string, 
  attachmentType: string
): z.infer<typeof ProcessingAgentEnum> {
  const ext = attachmentName.toLowerCase().split('.').pop() || '';
  const type = attachmentType.toLowerCase();
  
  // Audio files
  if (['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac', 'wma'].includes(ext) ||
      type.startsWith('audio/')) {
    return 'audio';
  }
  
  // Video files  
  if (['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv', 'wmv', 'm4v'].includes(ext) ||
      type.startsWith('video/')) {
    return 'video';
  }
  
  // Image files (including Figma-extracted PNGs)
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'tiff', 'ico'].includes(ext) ||
      type.startsWith('image/')) {
    return 'image';
  }
  
  // Document files
  if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'rtf'].includes(ext) ||
      type.includes('document') || type.includes('pdf')) {
    return 'document';
  }
  
  // Default to text
  return 'text';
}

/**
 * Process multimodal attachments
 */
export async function processMultimodalAttachments(
  attachments: z.infer<typeof AttachmentSchema>[],
  processingOptions?: any
): Promise<z.infer<typeof MultimodalAnalysisResultSchema>[]> {
  const results: z.infer<typeof MultimodalAnalysisResultSchema>[] = [];
  
  for (const attachment of attachments) {
    const agent = determineProcessingAgent(attachment.name, attachment.type);
    
    log(`Processing ${attachment.name} with ${agent} agent`, 'info');
    
    // Simulate processing based on agent type
    const analysis = await processWithAgent(attachment, agent, processingOptions);
    
    results.push({
      attachmentId: attachment.id,
      attachmentName: attachment.name,
      attachmentType: attachment.type,
      processingAgent: agent,
      analysis
    });
  }
  
  return results;
}

/**
 * Process attachment with specific agent
 */
async function processWithAgent(
  attachment: z.infer<typeof AttachmentSchema>,
  agent: z.infer<typeof ProcessingAgentEnum>,
  processingOptions?: any
): Promise<any> {
  // This is a simplified implementation
  // In production, this would call specialized processing services
  
  const baseAnalysis = {
    summary: `Processed ${attachment.name} using ${agent} agent`,
    keyElements: [`${agent}-content`],
    technicalContent: [`${agent}-technical-data`],
    specifications: {
      agent,
      processed: true,
      timestamp: new Date().toISOString()
    },
    relevance: 0.8,
    insights: [`Insight from ${agent} processing`]
  };
  
  // Add Figma context for images if enabled
  if (agent === 'image' && processingOptions?.enableFigmaIntegration) {
    const figmaUrl = attachment.metadata?.figmaUrl || attachment.file_url;
    if (figmaUrl && figmaUrl.includes('figma.com')) {
      baseAnalysis.figmaContext = {
        extractedFromFigma: true,
        originalUrl: figmaUrl
      };
    }
  }
  
  return baseAnalysis;
}

/**
 * Synthesize insights across multiple modalities
 */
export async function synthesizeMultimodalInsights(
  analysisResults: z.infer<typeof MultimodalAnalysisResultSchema>[],
  taskDescription: string
): Promise<{
  crossModalInsights: string[];
  unifiedUnderstanding: string;
  taskRelevance: number;
  recommendations: string[];
}> {
  const modalityCounts = analysisResults.reduce((acc, result) => {
    acc[result.processingAgent] = (acc[result.processingAgent] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const crossModalInsights = [
    `Analyzed ${analysisResults.length} attachments across ${Object.keys(modalityCounts).length} modalities`,
    ...Object.entries(modalityCounts).map(([agent, count]) => 
      `${count} ${agent} attachment${count > 1 ? 's' : ''} processed`
    )
  ];
  
  const avgRelevance = analysisResults.reduce((sum, r) => sum + r.analysis.relevance, 0) / analysisResults.length;
  
  return {
    crossModalInsights,
    unifiedUnderstanding: `Comprehensive analysis of multimodal content for: ${taskDescription}`,
    taskRelevance: avgRelevance,
    recommendations: [
      'Review individual attachment analyses for detailed insights',
      avgRelevance > 0.7 ? 'High relevance content identified' : 'Consider additional context'
    ]
  };
}