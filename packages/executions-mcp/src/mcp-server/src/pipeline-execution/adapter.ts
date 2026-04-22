/**
 * Pipeline Execution Adapter - ORM Integration
 * 
 * Updated to use ORM models for all database operations.
 * Manages pipeline execution lifecycle with proper BTD management.
 * 
 * @doc-code
 * type: adapter
 * category: pipelines
 * pattern: orm-integration
 */

import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@bitcode/supabase';
import { logger } from '@bitcode/logger';
import { observability } from '@bitcode/observability';
import {
  DeliverablesModel,
  PipelineExecutionsModel,
  ExecutionEventsModel,
  UserBtdBalancesModel,
  OrganizationCreditsModel
} from '@bitcode/orm';
import deliverablePipeline from '@bitcode/pipelines/deliverable';
import {
  PipelineExecution,
  inferPipelineExecutionLineage
} from '@bitcode/pipelines-generics';
import type {
  AssetPackResult,
  Attachment,
  InterfaceIngressSurface,
  PipelineInputContext,
  PipelineName,
  RepositoryContext
} from '../types';

export interface PipelineJobOptions {
  pipeline: PipelineName;
  task: string;
  config: Record<string, any>;
  userId: string;
  organizationId?: string;
  apiKeyId?: string;
  estimatedBtd: number;
  priority?: 'low' | 'normal' | 'high' | 'critical';
  metadata?: Record<string, any>;
}

export interface PipelineExecutionResult {
  runId: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  startedAt?: Date;
  completedAt?: Date;
  result?: any;
  error?: string;
  btdUsed?: number;
  events?: Array<{
    type: string;
    data: any;
    timestamp: Date;
  }>;
}

function asRecord(value: unknown): Record<string, any> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, any>)
    : null;
}

function buildPipelineInputContext(
  ingress: InterfaceIngressSurface,
  config: Record<string, any>
): PipelineInputContext {
  const repository = asRecord(config.repository) as RepositoryContext | null;
  const attachments = Array.isArray(config.attachments)
    ? (config.attachments as Attachment[])
    : [];
  const connections = repository
    ? [{
        kind: 'repository_connection' as const,
        provider: repository.provider || 'github',
        connectionId: repository.connectionId,
        owner: repository.owner,
        name: repository.name,
        branch: repository.branch,
        path: repository.path,
      }]
    : [];

  return {
    ingress,
    repository: repository || undefined,
    attachments,
    connections,
    mcpConfig: asRecord(config.mcpConfig) || {},
  };
}

function normalizeAssetPacks(result: unknown): AssetPackResult[] {
  const record = asRecord(result);
  const raw = Array.isArray(record?.assetPacks)
    ? record?.assetPacks
    : Array.isArray(record?.deliverables)
      ? record?.deliverables
      : [];

  return raw.map((item) => {
    const pack = asRecord(item) || {};
    return {
      kind: 'asset_pack' as const,
      type: typeof pack.type === 'string' ? pack.type : 'artifact',
      url: typeof pack.url === 'string' ? pack.url : undefined,
      content: typeof pack.content === 'string' ? pack.content : undefined,
      metadata: asRecord(pack.metadata) || pack.metadata,
    };
  });
}

function enrichPipelineResult(
  result: unknown,
  ingress: InterfaceIngressSurface,
  inputContext: PipelineInputContext
): Record<string, any> {
  const record = asRecord(result) || { value: result };
  const assetPacks = normalizeAssetPacks(record);

  return {
    ...record,
    interfaceSurface: ingress,
    inputContext,
    assetPacks,
    deliverables: assetPacks,
    metadata: {
      ...(asRecord(record.metadata) || {}),
      outputMeaning: 'asset_packs',
    },
  };
}

/**
 * Queue a pipeline job for execution
 */
export async function queuePipelineJob(
  options: PipelineJobOptions
): Promise<{ runId: string; deliverableId?: string }> {
  const span = observability.startSpan('queue_pipeline_job', {
    pipeline: options.pipeline,
    userId: options.userId,
    organizationId: options.organizationId
  });

  try {
    const supabase = createClient();
    const deliverables = new DeliverablesModel(supabase);
    const runs = new PipelineExecutionsModel(supabase);
    const userBtdBalances = new UserBtdBalancesModel(supabase);

    // Check and reserve BTD
    const btdBalance = await userBtdBalances.getByUserId(options.userId);
    if (!btdBalance || btdBalance.balance < options.estimatedBtd) {
      throw new Error(
        `Insufficient BTD. Required: ${options.estimatedBtd}, Available: ${btdBalance?.balance || 0}`
      );
    }

    // Reserve BTD
    const reservedBalance = await userBtdBalances.deductBtdBalance(
      options.userId,
      options.estimatedBtd,
      'pipeline_reservation',
    );

    if (typeof reservedBalance !== 'number') {
      throw new Error('Failed to reserve BTD');
    }

    // Create deliverable if needed
    let deliverableId: string | undefined;
    if (options.pipeline === 'deliverable') {
      const deliverable = await deliverables.create({
        name: options.task,
        description: `Deliverable created via MCP: ${options.task}`,
        organization_id: options.organizationId!,
        status: 'pending',
        metadata: {
          ...options.metadata,
          mcp_created: true,
          api_key_id: options.apiKeyId
        }
      });
      deliverableId = deliverable.id;
    }

    // Create run record
    const run = await runs.create({
      deliverable_id: deliverableId || uuidv4(), // Use dummy ID for non-deliverable pipelines
      status: 'pending',
      metadata: {
        pipeline: options.pipeline,
        task: options.task,
        config: options.config,
        userId: options.userId,
        organizationId: options.organizationId,
        apiKeyId: options.apiKeyId,
        estimatedBtd: options.estimatedBtd,
        priority: options.priority || 'normal',
        ...options.metadata
      }
    });

    // Queue for async execution
    queueAsyncExecution(run.id, options);

    logger.info('Pipeline job queued', {
      runId: run.id,
      deliverableId,
      pipeline: options.pipeline,
      userId: options.userId
    });

    return { runId: run.id, deliverableId };
  } catch (error) {
    span.recordException(error as Error);
    throw error;
  } finally {
    span.end();
  }
}

/**
 * Queue async execution (would integrate with job queue in production)
 */
async function queueAsyncExecution(runId: string, options: PipelineJobOptions) {
  // In production, this would push to a job queue (BullMQ, etc.)
  // For now, execute directly with a small delay
  setTimeout(async () => {
    try {
      await executePipelineJob(runId, options);
    } catch (error) {
      logger.error('Pipeline execution failed', { runId, error });
    }
  }, 100);
}

/**
 * Execute a pipeline job
 */
async function executePipelineJob(
  runId: string,
  options: PipelineJobOptions
): Promise<void> {
  const span = observability.startSpan('execute_pipeline_job', {
    runId,
    pipeline: options.pipeline
  });

  const supabase = createClient();
  const runs = new PipelineExecutionsModel(supabase);
  const events = new ExecutionEventsModel(supabase);
  const userBtdBalances = new UserBtdBalancesModel(supabase);

  try {
    // Update run status to running
    await runs.update(runId, {
      status: 'running',
      started_at: new Date().toISOString()
    });

    // Record start event
    await events.create({
      run_id: runId,
      event_type: 'pipeline_started',
      event_data: {
        pipeline: options.pipeline,
        task: options.task
      }
    });

    // Execute pipeline based on type
    let result: any;
    let actualBtdUsed = options.estimatedBtd;

    switch (options.pipeline) {
      case 'deliverable': {
        const inputContext = buildPipelineInputContext('bitcode_mcp', options.config);
        const execution = new PipelineExecution(
          runId,
          undefined,
          inferPipelineExecutionLineage('deliverable')
        );
        execution.store('interface', 'ingress', {
          surface: 'bitcode_mcp',
          interfaceKind: 'bitcode_exchange_interface',
          pipeline: options.pipeline,
        } as any);
        execution.store('inputs', 'context', inputContext as any);
        result = await deliverablePipeline({
          task: options.task,
          config: options.config,
          userId: options.userId,
          organizationId: options.organizationId
        }, execution);
        result = enrichPipelineResult(result, 'bitcode_mcp', inputContext);
        break;
      }

      default:
        throw new Error(`Unsupported pipeline type: ${options.pipeline}`);
    }

    // Calculate actual BTD used (could be based on tokens, time, etc.)
    if (result.tokensUsed) {
      actualBtdUsed = Math.ceil(result.tokensUsed / 1000); // 1 BTD per 1000 tokens
    }

    // Refund unused BTD if we overestimated
    if (actualBtdUsed < options.estimatedBtd) {
      const refundAmount = options.estimatedBtd - actualBtdUsed;
      await userBtdBalances.addBtdBalance(
        options.userId,
        refundAmount,
        'pipeline_refund',
      );
    }

    // Update run with success
    await runs.update(runId, {
      status: 'completed',
      completed_at: new Date().toISOString(),
      execution_time_ms: Date.now() - new Date(result.startedAt || Date.now()).getTime(),
      result: result.data || result,
      metadata: {
        ...result.metadata,
        btdUsed: actualBtdUsed,
        estimatedBtd: options.estimatedBtd
      }
    });

    // Record completion event
    await events.create({
      run_id: runId,
      event_type: 'pipeline_completed',
      event_data: {
        btdUsed: actualBtdUsed,
        executionTimeMs: result.executionTimeMs
      }
    });

    logger.info('Pipeline execution completed', {
      runId,
      pipeline: options.pipeline,
      btdUsed: actualBtdUsed
    });
  } catch (error) {
    span.recordException(error as Error);

    // Update run with failure
    await runs.update(runId, {
      status: 'failed',
      completed_at: new Date().toISOString(),
      error_message: error instanceof Error ? error.message : 'Unknown error'
    });

    // Record error event
    await events.create({
      run_id: runId,
      event_type: 'pipeline_failed',
      event_data: {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      }
    });

    // No refund on failure - reserved BTD was consumed attempting execution
    logger.error('Pipeline execution failed', {
      runId,
      pipeline: options.pipeline,
      error
    });

    throw error;
  } finally {
    span.end();
  }
}

/**
 * Monitor pipeline execution status
 */
export async function monitorPipelineExecution(
  runId: string
): Promise<PipelineExecutionResult> {
  const supabase = createClient();
  const runs = new PipelineExecutionsModel(supabase);
  const events = new ExecutionEventsModel(supabase);

  const run = await runs.getById(runId);
  if (!run) {
    throw new Error(`Run not found: ${runId}`);
  }

  const runEvents = await events.getByRunId(runId);

  return {
    runId: run.id,
    status: run.status,
    startedAt: run.started_at ? new Date(run.started_at) : undefined,
    completedAt: run.completed_at ? new Date(run.completed_at) : undefined,
    result: run.result,
    error: run.error_message || undefined,
    btdUsed: run.metadata?.btdUsed,
    events: runEvents.map(e => ({
      type: e.event_type,
      data: e.event_data,
      timestamp: new Date(e.created_at)
    }))
  };
}

/**
 * Cancel pipeline execution
 */
export async function cancelPipelineExecution(
  runId: string,
  userId: string
): Promise<boolean> {
  const supabase = createClient();
  const runs = new PipelineExecutionsModel(supabase);
  const events = new ExecutionEventsModel(supabase);

  const run = await runs.getById(runId);
  if (!run) {
    throw new Error(`Run not found: ${runId}`);
  }

  // Verify user has permission to cancel
  if (run.metadata?.userId !== userId) {
    throw new Error('Unauthorized to cancel this pipeline execution');
  }

  // Can only cancel pending or running pipelines
  if (run.status !== 'pending' && run.status !== 'running') {
    return false;
  }

  // Update status
  await runs.update(runId, {
    status: 'cancelled',
    completed_at: new Date().toISOString(),
    error_message: 'Cancelled by user'
  });

  // Record cancellation event
  await events.create({
    run_id: runId,
    event_type: 'pipeline_cancelled',
    event_data: {
      cancelledBy: userId,
      cancelledAt: new Date().toISOString()
    }
  });

  // TODO: Send cancellation signal to actual execution process

  return true;
}

/**
 * Get pipeline execution metrics
 */
export async function getPipelineMetrics(
  organizationId: string,
  pipeline?: Pipeline,
  days: number = 30
): Promise<{
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
  averageDurationMs: number;
  totalCreditsUsed: number;
  successRate: number;
}> {
  const supabase = createClient();
  
  // This would be a custom query on the runs table
  // For now, return mock data
  return {
    totalRuns: 0,
    successfulRuns: 0,
    failedRuns: 0,
    averageDurationMs: 0,
    totalCreditsUsed: 0,
    successRate: 0
  };
}
