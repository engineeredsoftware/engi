export const runtime = 'nodejs';

function encodeSse(payload: Record<string, unknown>) {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const runId = searchParams.get('runId') || null;

  const body = encodeSse({
    type: 'status',
    runId,
    step: 'history-snapshot',
    progress: 1,
    message: 'No live execution stream is attached to this persisted Bitcode activity.',
    detail: 'Terminal is reading the saved activity, output, proof, and posture payloads from execution history.',
  });

  return new Response(body, {
    headers: {
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream; charset=utf-8',
    },
  });
}
