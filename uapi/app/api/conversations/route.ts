import { NextResponse } from 'next/server';
import { createConversation, listConversations } from '../../../../packages/api/src/conversations';

import {
  createMockConversation,
  getConversationRouteUserId,
  getEmptyConversationPage,
  isConversationMockMode,
  listMockConversations,
} from './_shared';

export const runtime = 'nodejs';

function parseLimit(value: string | null) {
  const parsed = Number.parseInt(String(value || ''), 10);
  if (!Number.isFinite(parsed)) {
    return 25;
  }
  return Math.max(1, Math.min(parsed, 100));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = parseLimit(url.searchParams.get('limit'));
  const cursor = url.searchParams.get('cursor');
  const search = url.searchParams.get('search');

  if (isConversationMockMode()) {
    return NextResponse.json(listMockConversations({ limit, cursor, search }));
  }

  const userId = await getConversationRouteUserId();
  if (!userId) {
    return NextResponse.json(getEmptyConversationPage());
  }

  return NextResponse.json(await listConversations(userId, { limit, cursor: cursor || undefined, search: search || undefined }));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({} as { title?: string }));
  const title = typeof body.title === 'string' ? body.title : undefined;

  if (isConversationMockMode()) {
    return NextResponse.json(createMockConversation(title));
  }

  const userId = await getConversationRouteUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(await createConversation(userId, title));
}
