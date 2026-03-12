import { traceRoute } from '@engi/observability';
import { NextRequest, NextResponse } from 'next/server';
import {
  GET as executionGETHandler,
  POST as executionPOSTHandler
} from '@engi/api/src/routes/deliverables';

export const dynamic = 'force-dynamic';

/**
 * GET /api/executions
 *
 * GitHub resource listing and execution queries.
 * - ?owner=X - List repositories
 * - ?owner=X&repo=Y - Get repository info and branches
 * - ?owner=X&repo=Y&branch=Z - List commits
 * - ?action=issues&owner=X&repo=Y - List issues and PRs
 * - ?action=files&owner=X&repo=Y&path=Z - List files
 */
const GETHandler = async (request: NextRequest): Promise<NextResponse> => {
  const startTime = Date.now();

  try {
    return await executionGETHandler(request);
  } catch (error) {
    console.error('[executions GET] Route error:', error);
    return NextResponse.json({
      error: 'executions_route_error',
      message: 'Unable to process request',
      detail: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
};

/**
 * POST /api/executions
 *
 * Create and execute a pipeline with streaming response.
 * Accepts JSON or multipart/form-data with file uploads.
 */
const POSTHandler = async (request: NextRequest): Promise<NextResponse> => {
  const startTime = Date.now();

  try {
    return await executionPOSTHandler(request);
  } catch (error) {
    console.error('[executions POST] Route error:', error);
    return NextResponse.json({
      error: 'execution_create_error',
      message: 'Failed to create execution',
      detail: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
};

export const GET = traceRoute('/executions', GETHandler);
export const POST = traceRoute('/executions', POSTHandler);
