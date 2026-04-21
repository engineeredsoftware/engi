import { NextResponse } from 'next/server';
import { traceRoute } from '@bitcode/observability';
import { sendEmail } from '@bitcode/notifications';

const POSTHandler = async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const {
    recipientEmail,
    recipientName,
    senderName,
    btdAmount,
    newBtdBalance,
    credits,
    newBalance,
  } = body;
  const resolvedBtdAmount = btdAmount ?? credits;
  const resolvedNewBtdBalance = newBtdBalance ?? newBalance;

  if (!recipientEmail || !senderName || resolvedBtdAmount == null || resolvedNewBtdBalance == null) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  await sendEmail({
    to: recipientEmail,
    subject: `${senderName} sent you ${resolvedBtdAmount} $BTD`,
    template: 'btd_transfer',
    vars: {
      recipientName: recipientName || '',
      senderName,
      btdAmount: resolvedBtdAmount,
      newBtdBalance: resolvedNewBtdBalance,
      origin,
      year: new Date().getFullYear(),
    },
  });

  return NextResponse.json({ ok: true });
};

export const POST = traceRoute('/notifications/btd-transfer', POSTHandler);
