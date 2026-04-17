import { NextResponse } from 'next/server';
import { branchConversation } from '../../../../../packages/api/src/conversations';

import { branchMockConversation, getConversationRouteUserId, isConversationMockMode } from '../_shared';

export const runtime = 'nodejs';

type BranchConversationRequest = {
  sourceConversationId?: string;
  title?: string;
  branchMessageId?: string;
  copyMessages?: boolean;
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({} as BranchConversationRequest));
  const sourceConversationId = typeof body.sourceConversationId === 'string' ? body.sourceConversationId : '';

  if (!sourceConversationId) {
    return NextResponse.json({ error: 'sourceConversationId is required' }, { status: 400 });
  }

  if (isConversationMockMode()) {
    return NextResponse.json(branchMockConversation(sourceConversationId, body.title));
  }

  const userId = await getConversationRouteUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(
    await branchConversation(userId, sourceConversationId, {
      title: body.title,
      branchMessageId: body.branchMessageId,
      copyMessages: body.copyMessages,
    }),
  );
}
