import { NextResponse } from 'next/server';
import { traceRoute } from '@engi/observability';
import { sendEmail } from '@engi/email';

// POST /api/notifications/newsletter
const POSTHandler = async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { email, name, subject, headline, body: htmlBody, buttonText, buttonUrl, unsubscribeUrl } = body;
  if (!email || !subject || !headline || !htmlBody) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }
  const origin = new URL(request.url).origin;
  await sendEmail({
    to: email,
    subject,
    template: 'newsletter',
    vars: {
      name: name || '',
      subject,
      headline,
      body: htmlBody,
      buttonText: buttonText || 'Read more',
      buttonUrl: buttonUrl || origin,
      unsubscribeUrl: unsubscribeUrl || `${origin}/unsubscribe`,
      origin,
      year: new Date().getFullYear(),
    } as Record<string, string | number>,
  });
  return NextResponse.json({ ok: true });
}
export const POST = traceRoute('/notifications/newsletter', POSTHandler);