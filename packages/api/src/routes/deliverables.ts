/**
 * Deliverables API Route Handlers
 * 
 * Clean orchestration for deliverable pipeline operations.
 * All database operations use ORM, all VCS operations use VCS service.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { log, reinitLoggerFile } from '@engi/logger';
import { VCSService } from '@engi/vcs';
import { createAdminClient, type Database } from '@engi/orm';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { DEFAULT_PROVIDER, DEFAULT_MODEL_API, getUsdPricingForApiModel } from '@engi/models';
import { withCreditReservation } from '@engi/credits';
import { Execution, ExecutionStreamAdapter, NS_EXEC_DELIVERABLE_VALIDATION_RTS } from '@engi/execution-generics';
import { PipelineExecution } from '@engi/pipelines-generics/src/execution/PipelineExecution';
import { deliverablePipeline } from '@engi/pipeline-deliverable';
// GA-2: Multi-deliverable will be integrated into main pipeline
// import multiDeliverablesPipeline from '@engi/pipelines/multi';
import { factoryLLMRegistryWithProviders } from '@engi/generic-llms';
import { sendServerEvent } from '@engi/google-analytics';
import { EngiError, reportError } from '@engi/errors';
import { sendEmail } from '@engi/email';
import { createPipelineCompletionMessage, findOrCreateConversationForPipeline } from '../conversations';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from '@engi/responses';
import * as crypto from 'crypto';
import { Streamer } from '@engi/streams';

// Initialize ORM client with admin access for API routes
const orm = createAdminClient();

// Lazily initialize admin Supabase client and VCS service to avoid
// import-time crashes when env vars are not yet configured (e.g., dev).
let _adminSupabase: ReturnType<typeof createSupabaseClient<Database>> | null = null;
let _vcsService: VCSService | null = null;

function getAdminSupabase() {
  if (_adminSupabase) return _adminSupabase;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new EngiError('Supabase admin env missing', {
      code: 'SUPABASE_ENV_MISSING',
      status: 500,
      userMessage: 'Server configuration incomplete',
    });
  }
  _adminSupabase = createSupabaseClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _adminSupabase;
}

function getVCSService() {
  if (_vcsService) return _vcsService;
  const supa = getAdminSupabase();
  _vcsService = new VCSService({
    supabaseClient: supa,
    cache: { ttl: 5 * 60 * 1000, enabled: true },
    resilience: {
      retry: { attempts: 3, backoff: 'exponential' },
      circuitBreaker: { threshold: 5, timeout: 60000 },
    },
  });
  return _vcsService;
}

type ModelUsageStat = {
  provider: string;
  model: string;
  callCount: number;
  totalTokens: number;
  inputTokens: number;
  outputTokens: number;
  totalCostUsd: number;
  averageLatencyMs: number | null;
};

async function aggregateLLMMetrics(runId: string): Promise<{
  averageLatencyMs: number | null;
  modelUsage: ModelUsageStat[];
}> {
  try {
    const supa = getAdminSupabase();
    const { data: rows, error } = await supa
      .from('generations')
      .select('model_provider, model_name, input_tokens, output_tokens, total_tokens, cost, latency_ms')
      .eq('execution_id', runId);
    if (error || !rows || rows.length === 0) {
      return { averageLatencyMs: null, modelUsage: [] };
    }

    const byModel = new Map<string, ModelUsageStat & { _totalLatency: number }>();
    let latencyAccumulator = 0;
    let latencyCount = 0;

    for (const row of rows) {
      const provider = row.model_provider || 'unknown';
      const model = row.model_name || 'unknown';
      const key = `${provider}||${model}`;
      if (!byModel.has(key)) {
        byModel.set(key, {
          provider,
          model,
          callCount: 0,
          totalTokens: 0,
          inputTokens: 0,
          outputTokens: 0,
          totalCostUsd: 0,
          averageLatencyMs: null,
          _totalLatency: 0
        });
      }
      const stat = byModel.get(key)!;
      stat.callCount += 1;
      stat.totalTokens += Number(row.total_tokens ?? 0);
      stat.inputTokens += Number(row.input_tokens ?? 0);
      stat.outputTokens += Number(row.output_tokens ?? 0);
      stat.totalCostUsd += Number(row.cost ?? 0);
      const latency = row.latency_ms;
      if (typeof latency === 'number' && Number.isFinite(latency)) {
        stat._totalLatency += latency;
        latencyAccumulator += latency;
        latencyCount += 1;
      }
    }

    const modelUsage: ModelUsageStat[] = Array.from(byModel.values()).map((stat) => {
      const avgLatency = stat._totalLatency && stat.callCount ? stat._totalLatency / stat.callCount : null;
      return {
        provider: stat.provider,
        model: stat.model,
        callCount: stat.callCount,
        totalTokens: stat.totalTokens,
        inputTokens: stat.inputTokens,
        outputTokens: stat.outputTokens,
        totalCostUsd: Number(stat.totalCostUsd.toFixed(4)),
        averageLatencyMs: avgLatency !== null ? Math.round(avgLatency) : null
      };
    }).sort((a, b) => b.totalTokens - a.totalTokens);

    const averageLatencyMs = latencyCount ? Math.round(latencyAccumulator / latencyCount) : null;

    return { averageLatencyMs, modelUsage };
  } catch {
    return { averageLatencyMs: null, modelUsage: [] };
  }
}

/**
 * GET /api/deliverables
 * 
 * List GitHub resources based on query parameters:
 * - ?action=installations - Get GitHub installations
 * - ?owner=X - List repositories for owner
 * - ?owner=X&repo=Y - Get repository info and branches
 * - ?owner=X&repo=Y&branch=Z - List commits
 * - ?action=issues&owner=X&repo=Y - List issues and PRs
 * - ?action=files&owner=X&repo=Y&path=Z - List files
 */
export const GET = traceRoute('/deliverables', async (request: NextRequest) => {
  const requestId = crypto.randomUUID();
  try { if (process.env.ENGI_LOG_TO_FILE === '1') reinitLoggerFile(requestId, { prefix: 'deliverables-get' }); } catch {}
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');
  const branch = searchParams.get('branch');
  const path = searchParams.get('path');

  try {
    // Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      log('[deliverables] Authentication failed', 'warn', { requestId });
      return createAuthErrorResponse();
    }

    // Get user's GitHub installation id via unified helper
    const installationId = await orm.userConnections.getInstallationIdForUser(user.id, 'github');
    if (!installationId) {
      // Debug-only: log the shape (keys) of connection_data to detect schema drift
      try {
        const conn = await orm.userConnections.getByUserAndProvider(user.id, 'github');
        const keys = conn?.connection_data ? Object.keys(conn.connection_data) : [];
        log('[deliverables GET] connection_data shape (missing installationId)', 'debug', { requestId, keys });
      } catch {}
      // Return 200 with empty data for graceful handling
      // Frontend will handle the missing connection state
      if (action === 'installations') {
        return createJsonResponse({ accounts: [] });
      }
      if (action === 'issues') {
        return createJsonResponse({ issues: [] });
      }
      if (action === 'files') {
        return createJsonResponse({ files: [] });
      }
      return createJsonResponse({
        error: 'github_not_connected',
        message: 'GitHub account not connected',
        requiresAuth: true
      }, 200);
    }

    const connectionId = installationId;

    // Handle different query types
    if (action === 'installations') {
      // Return the current user's installation info
      // Optionally pull login from the connection record for display.
      const connection = await orm.userConnections.getByUserAndProvider(user.id, 'github');
      return createJsonResponse({
        accounts: [{
          id: connectionId,
          login: connection?.connection_data?.login || 'unknown',
          type: 'User'
        }]
      });
    }

    if (owner && !repo) {
      try {
        const repositories = await getVCSService().listRepositories(user.id, { perPage: 100 });
        return createJsonResponse({ repositories });
      } catch (error: any) {
        log('[deliverables] Repository list error', 'error', { requestId, owner, error: error.message });
        
        if (error.status === 403 || error.message?.includes('rate limit')) {
          return createJsonResponse({
            error: 'rate_limit_exceeded',
            message: 'GitHub API rate limit exceeded',
            description: 'Please wait a few minutes before trying again.',
            retryAfter: error.headers?.['retry-after'] || 60
          }, 429);
        }
        
        return createJsonResponse({
          error: 'repositories_fetch_failed',
          message: 'Failed to fetch repositories',
          description: 'Unable to retrieve your repositories. Please check your GitHub connection.',
          retryable: true
        }, 500);
      }
    }

    if (action === 'issues' && owner && repo) {
      try {
        // Get both issues and PRs
        const [issues, pullRequests] = await Promise.all([
          getVCSService().listIssues(connectionId, owner, repo, { state: 'open' }),
          getVCSService().listPullRequests(connectionId, owner, repo, { state: 'open' })
        ]);
        
        // Combine and format with null safety
        const formattedIssues = [
          ...(issues || []).map((item: any) => ({
            id: item.number,
            title: item.title,
            isPR: false,
            url: item.url
          })),
          ...(pullRequests || []).map((item: any) => ({
            id: item.number,
            title: item.title,
            isPR: true,
            url: item.url
          }))
        ];
        
        return createJsonResponse({ issues: formattedIssues });
      } catch (error: any) {
        log('[deliverables] Issues fetch error', 'error', { requestId, owner, repo, error: error.message });
        
        // Check if it's a permissions error
        if (error.status === 404 || error.message?.includes('Not Found')) {
          return createJsonResponse({
            error: 'repository_not_accessible',
            message: 'Repository not found or not accessible',
            description: 'Please ensure the Engi GitHub App has access to this repository.',
            action: 'check_permissions',
            repository: `${owner}/${repo}`
          }, 404);
        }
        
        if (error.status === 403 || error.message?.includes('rate limit')) {
          return createJsonResponse({
            error: 'rate_limit_exceeded',
            message: 'GitHub API rate limit exceeded',
            description: 'Please wait a few minutes before trying again.',
            retryAfter: error.headers?.['retry-after'] || 60
          }, 429);
        }
        
        return createJsonResponse({
          error: 'issues_fetch_failed',
          message: 'Failed to fetch issues and pull requests',
          description: 'An unexpected error occurred. Please try again.',
          retryable: true
        }, 500);
      }
    }

    if (action === 'files' && owner && repo) {
      try {
        const content = await getVCSService().getRepositoryContent(
          connectionId, 
          owner, 
          repo, 
          path || ''
        );
        
        let files = [];
        if (Array.isArray(content)) {
          files = content.map(item => ({ 
            path: item.path, 
            type: item.type, 
            sha: item.sha 
          }));
        } else if (content && typeof content === 'object') {
          files = [{ 
            path: content.path, 
            type: content.type, 
            sha: content.sha 
          }];
        }
        
        return createJsonResponse({ files });
      } catch (error: any) {
        log('[deliverables] Files fetch error', 'error', { requestId, owner, repo, path, error: error.message });
        
        if (error.status === 404) {
          return createJsonResponse({
            error: 'path_not_found',
            message: 'Path not found',
            description: `The path "${path || '/'}" does not exist in this repository.`,
            repository: `${owner}/${repo}`,
            path: path || '/'
          }, 404);
        }
        
        if (error.status === 403 || error.message?.includes('rate limit')) {
          return createJsonResponse({
            error: 'rate_limit_exceeded',
            message: 'GitHub API rate limit exceeded',
            description: 'Please wait a few minutes before trying again.',
            retryAfter: error.headers?.['retry-after'] || 60
          }, 429);
        }
        
        return createJsonResponse({
          error: 'files_fetch_failed',
          message: 'Failed to fetch repository contents',
          description: 'Unable to retrieve the repository contents. Please try again.',
          retryable: true
        }, 500);
      }
    }

    if (owner && repo && !branch) {
      try {
        const [repoInfo, branches] = await Promise.all([
          getVCSService().getRepository(connectionId, owner, repo),
          getVCSService().listBranches(connectionId, owner, repo)
        ]);
        return createJsonResponse({ repoInfo, branches });
      } catch (error: any) {
        log('[deliverables] Repository info fetch error', 'error', { requestId, owner, repo, error: error.message });
        
        if (error.status === 404) {
          return createJsonResponse({
            error: 'repository_not_found',
            message: 'Repository not found',
            description: `The repository ${owner}/${repo} was not found or is not accessible.`,
            repository: `${owner}/${repo}`,
            action: 'check_permissions'
          }, 404);
        }
        
        if (error.status === 403 || error.message?.includes('rate limit')) {
          return createJsonResponse({
            error: 'rate_limit_exceeded',
            message: 'GitHub API rate limit exceeded',
            description: 'Please wait a few minutes before trying again.',
            retryAfter: error.headers?.['retry-after'] || 60
          }, 429);
        }
        
        return createJsonResponse({
          error: 'repository_info_failed',
          message: 'Failed to fetch repository information',
          description: 'Unable to retrieve repository details. Please try again.',
          retryable: true
        }, 500);
      }
    }

    if (owner && repo && branch) {
      try {
        const commits = await getVCSService().listCommits(connectionId, owner, repo, branch);
        return createJsonResponse({ commits });
      } catch (error: any) {
        log('[deliverables] Commits fetch error', 'error', { requestId, owner, repo, branch, error: error.message });
        
        if (error.status === 404) {
          return createJsonResponse({
            error: 'branch_not_found',
            message: 'Branch not found',
            description: `The branch "${branch}" was not found in repository ${owner}/${repo}.`,
            repository: `${owner}/${repo}`,
            branch
          }, 404);
        }
        
        if (error.status === 403 || error.message?.includes('rate limit')) {
          return createJsonResponse({
            error: 'rate_limit_exceeded',
            message: 'GitHub API rate limit exceeded',
            description: 'Please wait a few minutes before trying again.',
            retryAfter: error.headers?.['retry-after'] || 60
          }, 429);
        }
        
        return createJsonResponse({
          error: 'commits_fetch_failed',
          message: 'Failed to fetch commits',
          description: 'Unable to retrieve commit history. Please try again.',
          retryable: true
        }, 500);
      }
    }

    return createJsonResponse({ error: 'Missing required parameters' }, 400);

  } catch (error) {
    log('[deliverables] Error', 'error', { requestId, error });
    return createErrorResponse(error);
  }
});

/**
 * POST /api/deliverables
 * 
 * Create and execute a deliverable pipeline
 * 
 * Flow:
 * 1. Parse request (JSON or multipart with file uploads)
 * 2. Save uploaded files using saveArtifact
 * 3. Validate user auth & credits
 * 4. Create pipeline execution in database
 * 5. Initialize SSE stream for real-time updates
 * 6. Store context in Execution (VCS, attachments, OTF instructions)
 * 7. Execute SDIVS pipeline (Setup → Discovery → Implementation → Validation → Shipping)
 * 8. Stream events to client and persist to database
 * 9. Handle completion or failure with credit refunds.
 * Returns streaming response with pipeline events.
 */
export const POST = traceRoute('/deliverables', async (request: NextRequest) => {
  const correlationId = crypto.randomUUID();
  const startTime = Date.now();
  // Initialize request-scoped log file
  try { if (process.env.ENGI_LOG_TO_FILE === '1') reinitLoggerFile(correlationId, { prefix: 'deliverables-request' }); } catch {}
  
  log('[deliverables] POST request received', 'info', {
    correlationId,
    contentType: request.headers.get('content-type'),
    userAgent: request.headers.get('user-agent')
  });

  try {
    // Authenticate user FIRST before any operations
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      log('[deliverables] Authentication failed', 'warn', { correlationId, error: authError });
      return createAuthErrorResponse();
    }
    
    log('[deliverables] User authenticated', 'debug', { correlationId, userId: user.id });

    // Parse request body - support both JSON and multipart
    // CRITICAL: Multipart is used when files are attached
    // Files are saved to artifact storage and paths added to attachments
    let body: any = {};
    let uploadedFiles: Array<{ id: string; path: string; name: string; size: number }> = [];
    
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      // Handle multipart form data with file uploads
      log('[deliverables] Processing multipart form data', 'debug', { correlationId });
      const formData = await request.formData();
      
      // Extract JSON fields
      const jsonData = formData.get('data');
      if (jsonData && typeof jsonData === 'string') {
        body = JSON.parse(jsonData);
      }
      
      // Process uploaded files
      const { saveArtifact } = await import('@engi/artifacts');
      for (const [key, value] of formData.entries()) {
        if (key.startsWith('file_') && value instanceof File) {
          log('[deliverables] Processing uploaded file', 'debug', {
            correlationId,
            fileName: value.name,
            fileSize: value.size,
            mimeType: value.type
          });
          
          const arrayBuffer = await value.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          
          // Save file using saveArtifact
          const artifactInfo = await saveArtifact(
            buffer,
            `${correlationId}-${value.name}`,
            value.type || 'application/octet-stream'
          );
          
          uploadedFiles.push({
            id: crypto.randomUUID(),
            path: artifactInfo.url,
            name: value.name,
            size: value.size
          });
          
          log('[deliverables] File saved', 'debug', {
            correlationId,
            fileName: value.name,
            savedUrl: artifactInfo.url
          });
        }
      }
    } else {
      // Traditional JSON body
      body = await request.json();
    }
    
    // Merge uploaded files into attachments
    if (uploadedFiles.length > 0) {
      body.attachments = [
        ...(body.attachments || []),
        ...uploadedFiles.map(file => ({
          id: file.id,
          type: 'file',
          content: file.path,
          metadata: {
            name: file.name,
            size: file.size
          }
        }))
      ];
    }
    
    const {
      definition_of_done,
      repoOwner,
      repoName,
      repoBranch,
      repoCommit,
      issueNumber,
      attachments,
      modelProvider = DEFAULT_PROVIDER,
      modelId = DEFAULT_MODEL_API,
      computeEnabled: computeEnabledRequested = false,
      multiDeliverable = false, // Multiple deliverables in single execution
      iterationCount = 3,
      gate = 'Develop', // Default to Develop gate for backwards compatibility
      conversationId,
      templateId,
      templateText,
      templateCategory,
      isTemplateCustom = false,
      entryPoint = 'gui',
      inputSource = 'manual',
      enhanceWithContext = false,
      enhanceWithHistory = false,
      // otyInstructions = [], // GA-2 feature - OTF instructions
      userAgent,
      referrer,
      sessionId
    } = body;

    const computeFlagEnabled =
      process.env.NEXT_PUBLIC_ENABLE_COMPUTE_TOGGLE === 'true' ||
      process.env.ENGI_ENABLE_COMPUTE_TOGGLE === 'true';
    const computeEnabled = computeFlagEnabled ? !!computeEnabledRequested : false;
    // Validate inputs
    log('[deliverables] Validating inputs', 'debug', {
      correlationId,
      hasDefinitionOfDone: !!definition_of_done,
      hasRepo: !!repoOwner && !!repoName,
      hasBranch: !!repoBranch,
      attachmentCount: attachments?.length || 0,
      gate,
      templateId,
      enhanceWithContext,
      enhanceWithHistory
    });
    
    if (!definition_of_done?.trim()) {
      log('[deliverables] Validation failed: missing definition of done', 'warn', { correlationId });
      throw new EngiError('Definition of done is required', {
        code: 'MISSING_DEFINITION_OF_DONE',
        status: 400,
        userMessage: 'Please provide a definition of done'
      });
    }

    if (!repoOwner?.trim() || !repoName?.trim()) {
      log('[deliverables] Validation failed: missing repo info', 'warn', { correlationId });
      throw new EngiError('Repository owner and name are required', {
        code: 'MISSING_REPO_INFO',
        status: 400,
        userMessage: 'Please select a repository'
      });
    }

    // Calculate cost using USD pricing; relative to default model
    const baseCost = parseInt(process.env.DELIVERABLE_BASE_COST || '100', 10);
    const chosen = getUsdPricingForApiModel(modelId);
    const baseline = getUsdPricingForApiModel(DEFAULT_MODEL_API) || chosen;
    const chosenTotal = (chosen?.input ?? 1) + (chosen?.output ?? 1);
    const baselineTotal = (baseline?.input ?? 1) + (baseline?.output ?? 1);
    const multiplier = baselineTotal > 0 ? (chosenTotal / baselineTotal) : 1;
    const cost = Math.round(baseCost * multiplier);
    
    log('[deliverables] Cost calculated', 'debug', {
      correlationId,
      baseCost,
      multiplier,
      finalCost: cost,
      modelProvider,
      modelId
    });

    // Create canonical pipeline execution
    log('[deliverables] Creating pipeline execution in database', 'debug', { correlationId, userId: user.id });
    const nowIso = new Date().toISOString();
    const execRow = await orm.pipelineExecutions.create({
      id: correlationId,
      user_id: user.id,
      type: 'deliverable',
      status: 'running',
      guide: gate, // Server terminology remains Gate; UI converts to Guide
      input: {
        definitionOfDone: definition_of_done,
        repoOwner,
        repoName,
        repoBranch,
        repoCommit,
        issueNumber,
        attachments
      } as any,
      output: null,
      config: { provider: modelProvider, modelId } as any,
      metadata: {
        repository: `${repoOwner}/${repoName}`,
        definitionOfDone: definition_of_done
      } as any,
      started_at: nowIso,
      created_at: nowIso,
      updated_at: nowIso
    } as any);

    const runId = execRow.id;
    // Switch log file to run-scoped file for pipeline execution
    try { if (process.env.ENGI_LOG_TO_FILE === '1') reinitLoggerFile(runId, { prefix: 'deliverables-run' }); } catch {}

    // Send telemetry
    log('[deliverables] Sending creation telemetry', 'debug', { correlationId, runId });
    await sendServerEvent('deliverable_created', {
      run_id: runId,
      user_id: user.id,
      correlation_id: correlationId,
      repo_owner: repoOwner,
      repo_name: repoName,
      model_provider: modelProvider,
      model_id: modelId,
      credits_used: cost,
      iteration_count: iterationCount
    });

    // Notifications and emails are gated for GA-1; skip unless explicitly enabled
    if (process.env.ENGI_ENABLE_NOTIFICATIONS === 'true') {
      await orm.notifications.create({
        user_id: user.id,
        type: 'pipeline_execution_started',
        title: `Pipeline Execution Started`,
        message: `Your pipeline execution (${runId}) has started.`,
        data: { runId }
      });

      try {
        const origin = new URL(request.url).origin;
        await sendEmail({
          to: user.email || '',
          subject: `Your pipeline execution #${runId} has started`,
          template: 'deliverable_started',
          vars: {
            name: user.user_metadata?.full_name || '',
            runId,
            runUrl: `${origin}/runs/${runId}`,
            origin,
            year: new Date().getFullYear()
          }
        });
      } catch (e) {
        log('[deliverables] Email send failed', 'error', { error: e });
      }
    }

    // Check for long-runner queue mode
    if (process.env.LONG_RUNNER_QUEUE === 'true') {
      log('[deliverables] Queueing job for background processing', 'info', { correlationId, runId });
      // Queue job for background processing
      await orm.executionEvents.create({
        execution_id: runId,
        event_type: 'status',
        event_data: {
          type: 'status',
          progress: 'queued',
          message: 'Job queued for processing',
          correlationId,
          runId,
          timestamp: new Date().toISOString()
        } as any
      } as any);

      return NextResponse.json({ runId, status: 'queued' }, { status: 202 });
    }

    // Create streaming response
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    let streamClosed = false;
    let execution: Execution | undefined;
    // Streamer that forwards execution events to the SSE writer
    const streamer = new Streamer({ streamId: runId, userId: user.id });
    streamer.subscribe(async (event) => {
      try {
        await writer.write(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      } catch {}
    });

    // Execute pipeline in background
    (async () => {
      try {
        log('[deliverables] Pipeline execution starting', 'info', {
          correlationId,
          runId,
          definitionOfDone: definition_of_done.substring(0, 100),
          repo: `${repoOwner}/${repoName}`,
          branch: repoBranch,
          modelProvider,
          modelId,
          iterationCount,
          attachmentCount: attachments?.length || 0
        });

        // Write initial status
        await writer.write(encoder.encode(`data: ${JSON.stringify({
          type: 'status',
          status: 'initializing',
          message: 'Pipeline starting...',
          runId,
          correlationId
        })}\n\n`));

        // Get connection for VCS
        log('[deliverables] Fetching GitHub connection', 'debug', { correlationId, userId: user.id });
        const installationId = await orm.userConnections.getInstallationIdForUser(user.id, 'github');
        if (!installationId) {
          // Debug-only: log the shape (keys) of connection_data to detect schema drift
          try {
            const conn = await orm.userConnections.getByUserAndProvider(user.id, 'github');
            const keys = conn?.connection_data ? Object.keys(conn.connection_data) : [];
            log('[deliverables POST] connection_data shape (missing installationId)', 'warn', { correlationId, keys });
          } catch {}
          log('[deliverables] GitHub installation not found', 'error', { correlationId, userId: user.id });
          // Send error event to stream before closing
          const errorEvent = {
            type: 'error',
            error: 'GitHub installation not found. Please install the GitHub app first.',
            correlationId
          };
          
          await writer.write(encoder.encode(`data: ${JSON.stringify(errorEvent)}\n\n`));
          await orm.executionEvents.create({
            execution_id: runId,
            event_type: errorEvent.type || 'error',
            event_data: { ...errorEvent, runId } as any
          } as any);
          
          try {
            await writer.close();
            streamClosed = true;
          } catch {}
          try { streamer.complete(); ExecutionStreamAdapter.unregisterStreamer(runId); } catch {}
          return;
        }
        log('[deliverables] GitHub connection found', 'debug', { correlationId, installationId });

        // Create execution context
        log('[deliverables] Creating execution context', 'debug', { correlationId, runId });
        // Use PipelineExecution to ensure prompts/tools/llms/agents registries are available
        execution = new PipelineExecution(runId);
        // Bridge execution store events to stream
        try { ExecutionStreamAdapter.registerStreamer(runId, streamer); } catch {}

        // Defensive LLM registry guard: ensure a default LLM is configured
        try {
          const hasDefault = (execution as any).llms?.ensureDefaultConfigured?.({ throw: false });
          if (!hasDefault) {
            const reg = factoryLLMRegistryWithProviders();
            const provider = (process.env.ENGI_LLM_PROVIDER || 'google').toLowerCase();
            const model = process.env.ENGI_LLM_MODEL || 'gemini-2.5-flash';
            if (typeof (reg as any).setDefaultProvider === 'function') {
              (reg as any).setDefaultProvider(provider);
            }
            reg.configure('*', { model });
            (execution as any).llms?.setLLMRegistry?.(reg);
            // Also register a concrete default at this node for clarity
            (execution as any).llms?.registerLLMConfig?.('default', { model });
          }
        } catch {}
        
        // Store stream writer in execution for agents to use
        execution.store('execution', 'dataStream', {
          writeData: async (data: string) => {
            await writer.write(encoder.encode(`data: ${data}\n\n`));
            
            // Also persist to database
            try {
              const eventData = JSON.parse(data);
              // Log phase transitions and important events
              if (eventData.type === 'phase' || eventData.type === 'agent') {
                log(`[deliverables] ${eventData.type} event`, 'debug', {
                  correlationId,
                  phase: eventData.phase,
                  agent: eventData.agent,
                  status: eventData.status
                });
              }
              await orm.executionEvents.create({
                execution_id: runId,
                event_type: eventData.type || 'status',
                event_data: { ...eventData, runId } as any
              } as any);
            } catch (parseError) {
              log('[deliverables] Failed to parse event data', 'warn', { correlationId, data });
            }
          }
        });
        
        // Store context information
        // NOTE: Execution context is namespaced key-value storage
        // Available to all agents during pipeline execution
        execution.store('execution', 'correlationId', correlationId);
        execution.store('execution', 'id', runId);
        execution.store('repository', 'connectionId', installationId);
        execution.store('repository', 'owner', repoOwner);
        execution.store('repository', 'name', repoName);
        execution.store('repository', 'branch', repoBranch);
        execution.store('repository', 'commit', repoCommit);
        execution.store('dod', 'description', definition_of_done);
        execution.store('config', 'computeEnabled', computeEnabled);
        execution.store('config', 'multiDeliverable', multiDeliverable);
        execution.store('config', 'iterationCount', iterationCount);
        execution.store('attachments', 'list', attachments);
        
        // GA-2: OTF instructions will be stored here when implemented
        // if (otfInstructions && otfInstructions.length > 0) {
        //   execution.store('otf', 'instructions', otfInstructions);
        // }

        // Build pipeline input with attachments
        // IMPORTANT: attachments field was missing before - now properly passed to pipeline
        // This allows agents to access user-provided files, URLs, and issues
        const pipelineInput = {
          definitionOfDone: definition_of_done,
          repository: {
            url: `https://github.com/${repoOwner}/${repoName}`,
            branch: repoBranch
          },
          requirements: {
            documentationRequired: true,
            securityScanRequired: true,
            lintingRequired: true,
            typeCheckRequired: true
          },
          deliveryTarget: 'pr' as const,
          metadata: {
            priority: 'medium' as const,
            requesterId: user.id
          },
          // Pass attachments to pipeline
          attachments: attachments || [],
          // Set the starting gate (Design/Develop/Digest)
          gate: gate as 'Design' | 'Develop' | 'Digest'
        };

        // ROUTE PIPELINE EXECUTION: Preprocess (deliverables)
        try {
          const preprocessing = {
            multi: !!multiDeliverable,
            compute: computeEnabled,
            selectedPipeline: multiDeliverable ? 'multi' : 'standard',
            provisioning: computeEnabled ? 'requested' : 'skipped'
          };
          execution.store('route/preprocessed', 'deliverables', preprocessing);
        } catch {}

        // Execute pipeline with credit reservation
        log('[deliverables] Starting pipeline execution', 'info', {
          correlationId,
          phases: ['setup', 'discovery', 'implementation', 'validation', 'shipping'],
          maxIterations: iterationCount
        });
        
        const pipelineStartTime = Date.now();

        // GA-2: Multi-deliverable support will be integrated into deliverablePipeline
        // For now, always use single deliverable pipeline
        const result = await withCreditReservation(
          user.id,
          () => deliverablePipeline(pipelineInput, execution),
          { pipelineType: 'deliverable' }
        );
        
        const pipelineDuration = Date.now() - pipelineStartTime;
        log('[deliverables] Pipeline execution completed', 'info', {
          correlationId,
          duration: pipelineDuration,
          success: true,
          prCreated: !!result?.deliverable?.prUrl
        });

        // Send completion
        const totalDuration = Date.now() - startTime;
        log('[deliverables] Sending completion event', 'debug', {
          correlationId,
          totalDuration,
          prUrl: result?.deliverable?.prUrl
        });
        
        // Telemetry: summarize file changes from editing history
        let fileChanges: { created: string[]; modified: string[]; deleted: string[] } | undefined;
        try {
          const { FILE_EDITOR_HISTORY } = await import('@engi/editing');
          const ops = FILE_EDITOR_HISTORY() || [];
          const created = new Set<string>();
          const modified = new Set<string>();
          const deleted = new Set<string>();
          for (const op of ops) {
            if (op.command === 'create') created.add(op.path);
            else if (op.command === 'delete') deleted.add(op.path);
            else if (op.command === 'replace' || op.command === 'str_replace' || op.command === 'patch') modified.add(op.path);
          }
          fileChanges = {
            created: Array.from(created),
            modified: Array.from(modified),
            deleted: Array.from(deleted),
          };
        } catch {}

        // Build client-facing result with FinalWorkSummary if available
        let clientResult: any = result;
        try {
          const fws = finalWorkSummary;
          if (fws) {
            clientResult = {
              ...result,
              summary: fws.summary || fws.deliverables?.summary,
              processingStats: fws.processingStats,
              repoSnapshot: fws.repoSnapshot,
              actions: {
                pullRequest: fws.deliverables?.pullRequest || null,
                pullRequestReviews: fws.deliverables?.pullRequestReviews || null,
                comments: fws.deliverables?.comments || null,
                issues: fws.deliverables?.issues || null,
                files: fws.deliverables?.fileChanges || null,
              },
            };
            // Prefer fileChanges from FWS when present
            if (fws.deliverables?.fileChanges) {
              fileChanges = fws.deliverables.fileChanges as any;
            }
          }
        } catch {}

        const completionEvent = {
          type: 'completion',
          result: clientResult,
          duration: totalDuration,
          correlationId,
          fileChanges
        };
        
        await writer.write(encoder.encode(`data: ${JSON.stringify(completionEvent)}\n\n`));
        await orm.executionEvents.create({
          execution_id: runId,
          event_type: completionEvent.type,
          event_data: { ...completionEvent, runId } as any
        } as any);

        // Update run status - serialize execution data
        const executionData: any = {
          namespaces: execution.getNamespaces(),
          data: {}
        };
        
        // Store all execution data by namespace
        for (const namespace of execution.getNamespaces()) {
          const namespaceData = execution.getAll(namespace);
          if (namespaceData) {
            executionData.data[namespace] = Object.fromEntries(namespaceData.entries());
          }
        }
        // Enrich final work summary with token/credit aggregates and merge into execution output
        let finalWorkSummary: any = undefined;
        try {
          finalWorkSummary = {
            summary: (execution as any).get?.('shipping/final_work_summary', 'summary'),
            processingStats: (execution as any).get?.('shipping/final_work_summary', 'processingStats'),
            repoSnapshot: (execution as any).get?.('shipping/final_work_summary', 'repoSnapshot'),
            deliverables: (execution as any).get?.('shipping/final_work_summary', 'deliverables'),
          };
          if (!finalWorkSummary?.summary && !finalWorkSummary?.deliverables?.summary) finalWorkSummary = undefined;
        } catch {}

        // Aggregate token usage and credits if possible
        if (finalWorkSummary) {
          if (!finalWorkSummary.processingStats) finalWorkSummary.processingStats = {};
          if (!finalWorkSummary.summary && finalWorkSummary.deliverables?.summary) {
            finalWorkSummary.summary = finalWorkSummary.deliverables.summary;
          }
          try {
            const supa = getAdminSupabase();
            const { data: tokenRows, error: tokenErr } = await supa
              .from('token_costs')
              .select('input_tokens, output_tokens, total_tokens, usd_cost')
              .eq('execution_id', runId);
            if (!tokenErr && tokenRows && tokenRows.length) {
              const tokens = tokenRows.reduce((acc: any, r: any) => {
                acc.input += r.input_tokens || 0;
                acc.output += r.output_tokens || 0;
                acc.total += r.total_tokens || 0;
                acc.usd += r.usd_cost || 0;
                return acc;
              }, { input: 0, output: 0, total: 0, usd: 0 });
              const credits = Math.max(1, Math.ceil(tokens.usd * 10)); // 10 credits per USD
              finalWorkSummary.processingStats.tokens = { input: tokens.input, output: tokens.output, total: tokens.total };
              finalWorkSummary.processingStats.credits = credits;
              finalWorkSummary.processingStats.usdTotal = Number(tokens.usd.toFixed(2));
            }
          } catch {}

          try {
            const { averageLatencyMs, modelUsage } = await aggregateLLMMetrics(runId);
            if (averageLatencyMs !== null) {
              finalWorkSummary.processingStats.averageLatencyMs = averageLatencyMs;
            }
            if (modelUsage.length) {
              finalWorkSummary.processingStats.modelUsage = modelUsage;
            }
          } catch {}
        }

        // Attach postprocessed result for unified read, enriched with RTS
        let postprocessed: any = undefined;
        const deliverableSnapshot = (execution as any).get?.('route/preprocessed', 'deliverables');
        const deliverableType =
          (execution as any).get?.('pipeline', 'deliverableType') ||
          deliverableSnapshot?.deliverableType ||
          undefined;
        let digestStatus: any = undefined;
        if (gate === 'Digest') {
          try {
            const digestProposal = (execution as any).get?.('digest', 'proposal');
            const fileChanges = ((execution as any).get?.('file-changes', 'all') || []) as Array<{ path?: string }>;
            const agentsDocUpdated = Array.isArray(fileChanges) && fileChanges.some((change) => typeof change?.path === 'string' && change.path.endsWith('.ai/AGENTS.md'));
            try {
              execution?.store?.('digest', 'agentsDocUpdated', agentsDocUpdated);
            } catch {}
            digestStatus = {
              agentsDocUpdated,
              readyToShip: !!digestProposal?.readyToShip,
              summary: digestProposal?.agentsMdUpdates || null,
              questionsAnswered: Array.isArray(digestProposal?.questionsAnswered) ? digestProposal.questionsAnswered.length : 0,
              patternsDocumented: Array.isArray(digestProposal?.patternsDocumented) ? digestProposal.patternsDocumented.length : 0,
              capturedAt: digestProposal?.capturedAt || new Date().toISOString()
            };
          } catch {}
        }
        try {
          postprocessed = (execution as any).get?.('postprocessed', 'result');
          // Enrich with Ready‑To‑Ship decision if available
          try {
            const approved = (execution as any).get?.(NS_EXEC_DELIVERABLE_VALIDATION_RTS, 'approved');
            const assessment = (execution as any).get?.(NS_EXEC_DELIVERABLE_VALIDATION_RTS, 'assessment');
            const confidence = (execution as any).get?.(NS_EXEC_DELIVERABLE_VALIDATION_RTS, 'confidence');
            if (typeof approved !== 'undefined' && postprocessed && typeof postprocessed === 'object') {
              postprocessed = {
                ...postprocessed,
                validationReady: {
                  approved: !!approved,
                  assessment: assessment || null,
                  confidence: typeof confidence === 'number' ? confidence : null
                }
              };
            }
          } catch {}
        } catch {}

        if (digestStatus) {
          if (!finalWorkSummary) {
            finalWorkSummary = {};
          }
          finalWorkSummary.processingStats = {
            ...(finalWorkSummary.processingStats || {}),
            digest: digestStatus
          };
          if (!finalWorkSummary.summary && digestStatus.summary) {
            finalWorkSummary.summary = digestStatus.summary;
          }
        }

        const gateState = execution?.get?.('gate', 'state');

        const completionMetadata: Record<string, any> = {
          ...(executionData?.namespaces ? { namespaces: executionData.namespaces } : {}),
          ...(executionData?.data ? { data: executionData.data } : {}),
          repository: `${repoOwner}/${repoName}`,
          definitionOfDone: definition_of_done,
          durationMs: Date.now() - startTime,
          guide: execution?.get('meta', 'phase') || gate,
          deliverableType
        };

        if (gateState?.history) {
          completionMetadata.gateHistory = gateState.history;
        }

        if (digestStatus) {
          completionMetadata.digest = digestStatus;
        }

        await orm.pipelineExecutions.update(runId, {
          status: 'completed',
          output: { ...(result as any),
            ...(execution?.get('route/preprocessed','deliverables') ? { preprocessed: execution.get('route/preprocessed','deliverables') } : {}),
            ...(finalWorkSummary ? { final_work_summary: finalWorkSummary } : {}),
            ...(postprocessed ? { postprocessed } : {})
          } as any,
          metadata: completionMetadata as any,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as any);

        // Completion notifications/emails gated by flag
        if (process.env.ENGI_ENABLE_NOTIFICATIONS === 'true') {
          await orm.notifications.create({
            user_id: user.id,
            type: 'pipeline_execution_completed',
            title: `Pipeline Execution Completed`,
            message: `Your pipeline execution (${runId}) has completed.`,
            data: { runId }
          });

          const origin = new URL(request.url).origin;
          await sendEmail({
            to: user.email || '',
            subject: `Your pipeline execution #${runId} is complete`,
            template: 'deliverable_completed',
            vars: {
              name: user.user_metadata?.full_name || '',
              runId,
              runUrl: `${origin}/executions/${runId}`,
              origin,
              year: new Date().getFullYear()
            }
          });
        }

        // Send completion telemetry
        await sendServerEvent('deliverable_completed', {
          run_id: runId,
          user_id: user.id,
          duration_ms: Date.now() - startTime,
          success: true
        });

      } catch (error) {
        const reportedError = reportError(error);
        const currentPhase = (execution?.get('pipeline', 'currentPhase') as string) || 'unknown';
        
        log('[deliverables] Pipeline execution failed', 'error', {
          correlationId,
          runId,
          phase: currentPhase,
          error: reportedError.message,
          errorCode: reportedError.code,
          stack: reportedError.stack,
          duration: Date.now() - startTime
        });
        
        // Send error event
        const errorEvent = {
          type: 'error',
          error: reportedError.message,
          correlationId,
          phase: currentPhase
        };
        
        await writer.write(encoder.encode(`data: ${JSON.stringify(errorEvent)}\n\n`));
        await orm.executionEvents.create({
          execution_id: runId,
          event_type: errorEvent.type || 'error',
          event_data: { ...errorEvent, runId } as any
        } as any);

        // Update run status
        log('[deliverables] Updating run status to failed', 'debug', { correlationId });
        await orm.pipelineExecutions.update(runId, {
          status: 'failed',
          error: JSON.stringify({ message: reportedError.message, stack: reportedError.stack, phase: currentPhase }),
          updated_at: new Date().toISOString()
        } as any);
        // If legacy pipeline_runs metadata table is present in the environment, best-effort update
        try {
          await orm.pipelineRuns.update(runId, {
            status: 'failed',
            metadata: {
              correlationId,
              repoOwner,
              repoName,
              repoBranch,
              attachmentsCount: attachments?.length || 0,
              failed_at: new Date().toISOString()
            } as any
          } as any);
        } catch {}

        // Refunds are handled by withCreditReservation/closeReservation.
        // Avoid double-refunds or credit inflation here.

        // Send failure telemetry
        await sendServerEvent('deliverable_failed', {
          run_id: runId,
          user_id: user.id,
          duration_ms: Date.now() - startTime,
          error_code: reportedError.code,
          error_message: reportedError.message
        });

      } finally {
        log('[deliverables] Closing stream writer', 'debug', { correlationId, runId });
        if (!streamClosed) {
          try { await writer.close(); streamClosed = true; } catch {}
        }
        try { streamer.complete(); ExecutionStreamAdapter.unregisterStreamer(runId); } catch {}
      }
    })();

    // Return streaming response
    return new NextResponse(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });

  } catch (error) {
    const reportedError = reportError(error);
    log('[deliverables] Error', 'error', { correlationId, error: reportedError });
    return createErrorResponse(reportedError);
  }
});

/**
 * DELETE /api/deliverables/:runId
 * 
 * Cancel a running deliverable pipeline
 */
export const DELETE = traceRoute('/deliverables', async (request: NextRequest) => {
  const correlationId = crypto.randomUUID();
  
  try {
    // Get runId from URL
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const runId = pathParts[pathParts.length - 1];
    
    if (!runId || runId === 'deliverables') {
      return createJsonResponse({
        error: 'Run ID is required',
        message: 'Please provide a run ID to cancel'
      }, 400);
    }
    
    // Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      log('[deliverables] Authentication failed for cancel', 'warn', { correlationId });
      return createAuthErrorResponse();
    }
    
    // Update run status to cancelled
    await orm.pipelineExecutions.update(runId, {
      status: 'cancelled',
      completed_at: new Date().toISOString()
    } as any);
    // If legacy pipeline_runs metadata table is present in the environment, best-effort update
    try {
      await orm.pipelineRuns.update(runId, {
        status: 'cancelled',
        metadata: {
          correlationId,
          cancelled_at: new Date().toISOString()
        } as any
      } as any);
    } catch {}
    
    // Cancellation notifications gated by flag
    if (process.env.ENGI_ENABLE_NOTIFICATIONS === 'true') {
      await orm.notifications.create({
        user_id: user.id,
        type: 'pipeline_execution_cancelled',
        title: `Pipeline Execution Cancelled`,
        message: `Your pipeline execution (${runId}) has been cancelled.`,
        data: { runId }
      });
    }
    
    // Log cancellation event
    await sendServerEvent('deliverable_cancelled', {
      run_id: runId,
      user_id: user.id,
      correlation_id: correlationId
    });
    
    return createJsonResponse({
      success: true,
      message: 'Pipeline cancelled successfully',
      runId
    });
    
  } catch (error) {
    const reportedError = reportError(error);
    log('[deliverables] Cancel error', 'error', { correlationId, error: reportedError });
    return createErrorResponse(reportedError);
  }
});
