/**
 * Bitcode MCP Pipeline Tools - ORM Integration
 * 
 * Uses the ORM-based pipeline execution adapter.
 * Exposes Bitcode's pipeline system through MCP tools.
 * 
 * @doc-code
 * type: tools
 * category: pipelines
 * pattern: orm-integration
 */

import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '@bitcode/logger';
import { observability } from '@bitcode/observability';

// Import the ORM-based pipeline execution adapter
import { 
  queuePipelineJob, 
  monitorPipelineExecution, 
  cancelPipelineExecution,
  getPipelineMetrics,
  type PipelineJobOptions,
  type PipelineExecutionResult
} from '../pipeline-execution/adapter';

// Import types
import type { MCPAuthContext } from '../types';
import { DeliverablePipelineToolSchema, type PipelineName } from '../types';

/**
 * MCP Tool interface
 */
interface MCPTool {
  name: string;
  description: string;
  inputSchema: z.ZodType<any>;
  execute?: (args: any, context: MCPAuthContext) => Promise<any>;
}

/**
 * Estimate credits required for pipeline execution
 */
async function estimatePipelineCredits(
  pipeline: PipelineName,
  task: string,
  attachments: any[] = []
): Promise<number> {
  // Base credit estimation based on pipeline type and complexity
  const baseCosts = { deliverable: 100 } as const;

  let estimatedCredits = (baseCosts as Record<string, number>)[pipeline] || 100;

  // Adjust for task complexity (rough heuristic)
  const taskLength = task.length;
  if (taskLength > 1000) estimatedCredits *= 1.5;
  if (taskLength > 2000) estimatedCredits *= 2;

  // Adjust for attachments
  estimatedCredits += attachments.length * 25;

  // Add buffer for safety
  return Math.ceil(estimatedCredits * 1.2);
}

/**
 * Execute pipeline with comprehensive error handling and monitoring
 */
async function executePipelineWithMonitoring(
  params: any,
  context: MCPAuthContext,
  pipelineType: PipelineName
): Promise<any> {
  const startTime = Date.now();

  // Estimate credits
  const estimatedCredits = await estimatePipelineCredits(
    pipelineType,
    params.task,
    params.attachments
  );

  logger.info('Starting pipeline execution', {
    pipeline: pipelineType,
    userId: context.userId,
    organizationId: context.organizationId,
    estimatedCredits,
    task: params.task.substring(0, 100) + '...'
  });

  try {
    // Prepare job options
    const jobOptions: PipelineJobOptions = {
      pipeline: pipelineType,
      task: params.task,
      config: {
        ...params,
        subtype: params.subtype,
        repository: params.repository,
        attachments: params.attachments,
        streaming: params.streaming
      },
      userId: context.userId,
      organizationId: context.organizationId,
      apiKeyId: context.apiKeyId,
      estimatedCredits,
      priority: params.priority || 'normal',
      metadata: {
        source: 'mcp',
        mcpToolName: `bitcode://pipelines/${pipelineType}/create`
      }
    };

    // Queue the pipeline job using ORM-based adapter
    const { runId, deliverableId } = await queuePipelineJob(jobOptions);
    
    // If streaming is enabled, return immediately with run details
    if (params.streaming) {
      return {
        runId,
        deliverableId,
        status: 'queued',
        message: 'Pipeline job queued for execution. Monitor using the runId.',
        streaming: true,
        monitoringUrl: `/api/pipelines/runs/${runId}`
      };
    }
    
    // Otherwise, wait for completion
    const executionResult = await monitorPipelineExecution(runId);
    
    const duration = Date.now() - startTime;
    
    // Record successful execution
    observability.recordMetric('pipeline_execution', {
      pipeline: pipelineType,
      subtype: params.subtype,
      duration,
      creditsUsed: executionResult.creditsUsed || estimatedCredits,
      success: executionResult.status === 'completed',
      userId: context.userId,
      organizationId: context.organizationId
    });

    logger.info('Pipeline execution completed', {
      runId,
      pipeline: pipelineType,
      duration,
      status: executionResult.status,
      creditsUsed: executionResult.creditsUsed
    });

    return {
      runId,
      deliverableId,
      status: executionResult.status,
      result: executionResult.result,
      error: executionResult.error,
      creditsUsed: executionResult.creditsUsed,
      startedAt: executionResult.startedAt,
      completedAt: executionResult.completedAt,
      events: executionResult.events
    };

  } catch (error) {
    const duration = Date.now() - startTime;

    // Record failed execution
    observability.recordMetric('pipeline_execution', {
      pipeline: pipelineType,
      subtype: params.subtype,
      duration,
      success: false,
      error: error instanceof Error ? error.message : String(error),
      userId: context.userId,
      organizationId: context.organizationId
    });

    logger.error('Pipeline execution failed', {
      pipelineId,
      pipeline: pipelineType,
      error: error instanceof Error ? error.message : String(error),
      duration
    });

    logger.error('Pipeline execution failed', {
      pipeline: pipelineType,
      error: error instanceof Error ? error.message : String(error),
      duration
    });

    throw error;
  }
}

/**
 * Register all pipeline tools
 */
export function registerPipelineTools(): MCPTool[] {
  return [
    // Deliverable Pipeline Tool
    {
      name: 'bitcode://pipelines/deliverable/create',
      description: `Create and execute a deliverable pipeline for complete software engineering tasks.

This is Bitcode's most powerful pipeline, capable of:
• Feature implementation with pull request creation
• Comprehensive code reviews with detailed suggestions
• Bug fixes with root cause analysis and testing
• Technical documentation and blog posts
• Architecture diagrams and API specifications
• Frontend scaffolding for React/Vue/Angular
• Project scope analysis and implementation planning
• Code refactoring proposals with impact analysis

Supports multimodal inputs including Figma designs, documents, images, audio, and video.
Real-time streaming provides live updates during execution.

Subtypes:
• pull_request - Complete feature implementation with PR
• pr_review - Comprehensive code review with suggestions
• issue - Bug analysis and fixes with testing
• comment - Code explanation and documentation
• blog_post - Technical writing and documentation
• diagram - Architecture and flow diagrams
• api_spec - OpenAPI specification generation
• frontend_scaffolder - Component scaffolding
• scope_analysis - Project complexity analysis
• implementation_plan - Detailed technical planning
• refactor_proposal - Code improvement recommendations`,

      inputSchema: DeliverablePipelineToolSchema,
      
      execute: async (args: z.infer<typeof DeliverablePipelineToolSchema>, context: MCPAuthContext) => {
        return executePipelineWithMonitoring(
          args,
          context,
          'deliverable'
        );
      }
    },


    }
  ];
}
