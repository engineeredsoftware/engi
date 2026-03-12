import { NextResponse } from 'next/server';
import { traceRoute } from '@engi/observability';
import { sendEmail } from '@engi/email';

// POST /api/notifications/out-of-credits
const POSTHandler = async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { email, name, purchaseUrl } = body;
  if (!email) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }
  const origin = new URL(request.url).origin;
  await sendEmail({
    to: email,
    subject: `Out of credits`,
    template: 'out_of_credits',
    vars: {
      name: name || '',
      purchaseUrl: purchaseUrl || `${origin}/credit-purchase`,
      origin,
      year: new Date().getFullYear(),
    },
  });

  import('@engi/email')
    .then(({ emitCreditEvent }) =>
      emitCreditEvent({ type: 'OUT_OF_CREDITS', userId: email, balance: 0 })
    )
    .catch((err) => console.warn('[notifications] event emit failed', err));

  return NextResponse.json({ ok: true });
}
export const POST = traceRoute('/notifications/out-of-credits', POSTHandler);