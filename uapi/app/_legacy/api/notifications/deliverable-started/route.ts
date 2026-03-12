import { NextResponse } from 'next/server';
import { traceRoute } from '@engi/observability';
import { sendEmail } from '@engi/email';

// POST /api/notifications/deliverable-started
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
    subject: `Your pipeline execution #${runId} has started`,
    template: 'deliverable_started',
    vars: {
      name: name || '',
      runId,
      runUrl,
      origin,
      year: new Date().getFullYear(),
    },
  });

  // Emit domain event for new notification pipeline
  import('@engi/email')
    .then(({ emitRunLifecycle }) =>
      emitRunLifecycle({ status: 'STARTED', runId: Number(runId), runType: 'deliverable', userId: email })
    )
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.warn('[notifications] event emit failed', err);
    });

  return NextResponse.json({ ok: true });
}
export const POST = traceRoute('/notifications/deliverable-started', POSTHandler);
