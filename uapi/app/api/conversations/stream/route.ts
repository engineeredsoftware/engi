import { NextResponse } from 'next/server';

import { createMockConversationStreamResponse, isConversationMockMode } from '../_shared';

export const runtime = 'nodejs';

type LegacyStreamRequest = {
  message?: string;
  content?: string;
  tokens?: Array<{ type?: string; value?: string; metadata?: Record<string, unknown> }>;
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({} as LegacyStreamRequest));

  if (isConversationMockMode()) {
    return createMockConversationStreamResponse({
      content: body.content || body.message,
      tokens: body.tokens,
    });
  }

  return NextResponse.json(
    { error: 'Conversation streaming is not yet mounted outside mock mode in the App Router surface.' },
    { status: 501 },
  );
}
