import { NextResponse } from 'next/server';
import { traceRoute } from '@engi/observability';
import { sendEmail } from '@engi/email';

// POST /api/notifications/low-credits-reminder
const POSTHandler = async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { email, name, balance, threshold, purchaseUrl } = body;
  if (!email || balance == null || threshold == null) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }
  const origin = new URL(request.url).origin;
  await sendEmail({
    to: email,
    subject: `Low credits reminder: ${balance} credits remaining`,
    template: 'low_credits_reminder',
    vars: {
      name: name || '',
      balance,
      threshold,
      purchaseUrl: purchaseUrl || `${origin}/credit-purchase`,
      origin,
      year: new Date().getFullYear(),
    } as Record<string, string | number>,
  });

  import('@engi/email')
    .then(({ emitCreditEvent }) =>
      emitCreditEvent({ type: 'LOW_BALANCE', userId: email, balance, threshold })
    )
    .catch((err) => console.warn('[notifications] event emit failed', err));

  return NextResponse.json({ ok: true });
}
export const POST = traceRoute('/notifications/low-credits-reminder', POSTHandler);