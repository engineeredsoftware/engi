import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { supabaseAdmin } from '@engi/supabase';
import { createErrorResponse, createAuthErrorResponse } from '@engi/responses';
import { log } from '@engi/logger';
import * as crypto from 'crypto';

/**
 * GET /api/executions/stream?runId=...
 *
 * Server-Sent Events (SSE) endpoint for real-time execution event streaming.
 *
 * **Production-grade streaming implementation:**
 * - 1-second polling interval for new events
 * - Cursor-based pagination via created_at timestamp
 * - Authentication and ownership verification
 * - Automatic completion detection
 * - Client disconnect handling
 * - Comprehensive logging and error handling
 *
 * **Query Parameters:**
 * - runId (required): Execution ID to stream
 * - lastTs (optional): Resume from timestamp (ISO 8601)
 * - type (optional): Pipeline type filter (ignored in GA-1, for future use)
 *
 * **SSE Event Format:**
 * ```
 * data: {"type":"stream_start","runId":"...","status":"running"}
 *
 * data: {"type":"phase","phase":"setup","status":"started"}
 *
 * data: {"type":"generation","model":"...","tokens":1234}
 *
 * data: {"type":"stream_end","status":"completed","result":{...}}
 * ```
 *
 * @route GET /api/executions/stream
 */
const GETHandler = async function GET(request: Request) {
  const requestId = crypto.randomUUID();
  const url = new URL(request.url);
  const runId = url.searchParams.get('runId');
  const lastTsParam = url.searchParams.get('lastTs') || '';
  const pipelineType = url.searchParams.get('type') || 'pipeline:deliverables';

  log('[executions/stream] Request started', 'info', {
    requestId,
    runId,
    lastTs: lastTsParam,
    type: pipelineType
  });

  try {
    // Validate required parameters
    if (!runId) {
      log('[executions/stream] Missing runId parameter', 'warn', { requestId });
      return createErrorResponse(new Error('Missing runId parameter'), 400);
    }

    // Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      log('[executions/stream] Authentication failed', 'warn', { requestId, error: authError });
      return createAuthErrorResponse();
    }

    log('[executions/stream] User authenticated', 'debug', { requestId, userId: user.id });

    // Verify execution ownership
    const { data: execution, error: execError } = await supabaseAdmin
      .from('executions')
      .select('id, user_id, status, type, guide, output, metadata, error')
      .eq('id', runId)
      .maybeSingle();

    if (execError) {
      log('[executions/stream] Database error', 'error', { requestId, error: execError });
      return createErrorResponse(execError);
    }

    if (!execution) {
      log('[executions/stream] Execution not found', 'warn', { requestId, runId });
      return createErrorResponse(new Error('Execution not found'), 404);
    }

    if (execution.user_id !== user.id) {
      log('[executions/stream] Ownership verification failed', 'warn', {
        requestId,
        runId,
        executionOwner: execution.user_id,
        requestUser: user.id
      });
      return createErrorResponse(new Error('Access denied'), 403);
    }

    log('[executions/stream] Ownership verified, creating stream', 'info', {
      requestId,
      runId,
      status: execution.status,
      pipelineType: execution.type,
      guide: execution.guide
    });

    // Create Server-Sent Events stream
    const encoder = new TextEncoder();
    let lastCreatedAt = lastTsParam; // Cursor for resumable streaming

    return new Response(
      new ReadableStream({
        async start(controller) {
          let isPolling = true;

          try {
            // Send initial stream start event
            const startEvent = {
              type: 'stream_start',
              runId,
              status: execution.status,
              pipelineType: execution.type,
              guide: execution.guide,
              timestamp: new Date().toISOString()
            };

            controller.enqueue(encoder.encode(`data: ${JSON.stringify(startEvent)}\n\n`));

            log('[executions/stream] Stream started', 'debug', { requestId, runId });

            // Poll for new events every 1 second
            const pollInterval = setInterval(async () => {
              if (!isPolling) {
                clearInterval(pollInterval);
                return;
              }

              try {
                // Fetch new events since last cursor
                const { data: events, error: eventsError } = await supabaseAdmin
                  .from('execution_events')
                  .select('id, execution_id, event_type, event_data, sequence, created_at')
                  .eq('execution_id', runId)
                  .gt('created_at', lastCreatedAt)
                  .order('created_at', { ascending: true })
                  .order('sequence', { ascending: true });

                if (eventsError) {
                  log('[executions/stream] Events query error', 'error', {
                    requestId,
                    runId,
                    error: eventsError
                  });
                  throw eventsError;
                }

                // Stream each event to client
                if (events && events.length > 0) {
                  for (const event of events) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(event.event_data)}\n\n`));

                    // Update cursor to last event timestamp
                    if (event.created_at) {
                      lastCreatedAt = event.created_at as string;
                    }
                  }

                  log('[executions/stream] Streamed events', 'debug', {
                    requestId,
                    runId,
                    count: events.length,
                    lastTs: lastCreatedAt
                  });
                }

                // Check if execution is complete
                const { data: updatedExecution } = await supabaseAdmin
                  .from('executions')
                  .select('status, output, metadata, error, guide, completed_at')
                  .eq('id', runId)
                  .single();

                if (updatedExecution && (updatedExecution.status === 'completed' || updatedExecution.status === 'failed' || updatedExecution.status === 'cancelled')) {
                  // Send final stream_end event
                  const endEvent = {
                    type: 'stream_end',
                    runId,
                    status: updatedExecution.status,
                    guide: updatedExecution.guide,
                    output: updatedExecution.output,
                    metadata: updatedExecution.metadata,
                    error: updatedExecution.error,
                    timestamp: new Date().toISOString()
                  };

                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(endEvent)}\n\n`));

                  log('[executions/stream] Execution complete, closing stream', 'info', {
                    requestId,
                    runId,
                    finalStatus: updatedExecution.status
                  });

                  isPolling = false;
                  clearInterval(pollInterval);
                  controller.close();
                }
              } catch (pollError) {
                log('[executions/stream] Polling error', 'error', {
                  requestId,
                  runId,
                  error: pollError
                });

                // Send error event to client
                const errorEvent = {
                  type: 'stream_error',
                  runId,
                  error: pollError instanceof Error ? pollError.message : 'Polling error',
                  timestamp: new Date().toISOString()
                };

                controller.enqueue(encoder.encode(`data: ${JSON.stringify(errorEvent)}\n\n`));
              }
            }, 1000); // Poll every second

            // Handle client disconnect
            request.signal.addEventListener('abort', () => {
              log('[executions/stream] Client disconnected', 'info', { requestId, runId });
              isPolling = false;
              clearInterval(pollInterval);
              controller.close();
            });

          } catch (streamError) {
            log('[executions/stream] Stream initialization error', 'error', {
              requestId,
              runId,
              error: streamError
            });
            controller.error(streamError);
          }
        }
      }),
      {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
          'X-Accel-Buffering': 'no' // Disable nginx buffering
        }
      }
    );

  } catch (err) {
    log('[executions/stream] Unhandled error', 'error', { requestId, error: err });
    return createErrorResponse(err);
  }
};

export const GET = traceRoute('/executions/stream', GETHandler);
