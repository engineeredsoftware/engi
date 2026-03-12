import { NextResponse } from 'next/server';
import { traceRoute } from '@engi/observability';
import { sendEmail } from '@engi/email';

// POST /api/notifications/credit-transfer
const POSTHandler = async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { recipientEmail, recipientName, senderName, credits, newBalance } = body;
  if (!recipientEmail || !senderName || credits == null || newBalance == null) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }
  const origin = new URL(request.url).origin;
  await sendEmail({
    to: recipientEmail,
    subject: `${senderName} sent you ${credits} credits`,
    template: 'credit_transfer',
    vars: {
      recipientName: recipientName || '',
      senderName,
      credits,
      newBalance,
      origin,
      year: new Date().getFullYear(),
    },
  });
  return NextResponse.json({ ok: true });
}
export const POST = traceRoute('/notifications/credit-transfer', POSTHandler);