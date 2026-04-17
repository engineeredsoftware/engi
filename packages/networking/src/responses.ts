// Re-exported logger from the shared pipelines-generics package ensures
// consistent formatting and single log sink across the monorepo.
import { log } from '@bitcode/logger';

export function createErrorResponse(
  error: unknown,
  status: number = 500,
  message: string = 'An unexpected error occurred'
) {
  log('Error response created', 'error', {
    error: error instanceof Error ? error.message : String(error)
  });

  const statusCode = (error as any)?.response?.status || status;

  return new Response(
    JSON.stringify({
      error: message,
      details: error instanceof Error ? error.message : String(error)
    }),
    {
      status: statusCode,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

export function createAuthErrorResponse(message: string = 'Authentication required') {
  // Log authentication failures for telemetry
  log('Authentication failed', 'warn', { message });
  return new Response(JSON.stringify({ error: message }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
    statusText: 'Unauthorized - No user session',
  });
}

export function createJsonResponse(data: any, status: number = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

