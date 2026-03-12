import { NextResponse } from 'next/server';
import { traceRoute } from '@engi/observability';
import { sendEmail } from '@engi/email';

// POST /api/notifications/deliverable-completed
const POSTHandler = async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { email, name, runId, runUrl } = body;
  if (!email || !runId || !runUrl) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }
  const origin = new URL(request.url).origin;
  await sendEmail({
    to: email,
    subject: `Your pipeline execution #${runId} is complete`,
    template: 'deliverable_completed',
    vars: {
      name: name || '',
      runId,
      runUrl,
      origin,
      year: new Date().getFullYear(),
    },
  });

  // Emit domain event
  import('@engi/email')
    .then(({ emitRunLifecycle }) =>
      emitRunLifecycle({ status: 'SUCCESS', runId: Number(runId), runType: 'deliverable', userId: email })
    )
    .catch((err) => console.warn('[notifications] event emit failed', err));

  return NextResponse.json({ ok: true });
}
export const POST = traceRoute('/notifications/deliverable-completed', POSTHandler);
