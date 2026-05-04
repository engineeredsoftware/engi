/**
 * @bitcode/responses - HTTP response utilities
 * 
 * Standard response creation utilities for the Bitcode API
 */

export function createJsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function createErrorResponse(error: string, status = 500) {
  return createJsonResponse({ error }, status);
}

export function createSuccessResponse(data: any) {
  return createJsonResponse({ success: true, data });
}

export function createStreamResponse(stream: ReadableStream) {
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
