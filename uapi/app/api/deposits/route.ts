import { NextResponse } from 'next/server';

import {
  getBitcodeAppContext,
  readBitcodeRequestBody,
  toBitcodeErrorResponse
} from '@/lib/bitcode-app-context';
import { requireBitcodeSignedTransactionReadiness } from '@/app/application/bitcode-transaction-route-readiness';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await readBitcodeRequestBody(request);
    await requireBitcodeSignedTransactionReadiness(body, { requiresRepositoryAnchor: true });
    return NextResponse.json(getBitcodeAppContext().createDeposit(body));
  } catch (error) {
    return toBitcodeErrorResponse(error);
  }
}
