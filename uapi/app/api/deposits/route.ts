import { NextResponse } from 'next/server';

import {
  getBitcodeAppContext,
  readBitcodeRequestBody,
  toBitcodeErrorResponse
} from '@/lib/bitcode-app-context';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await readBitcodeRequestBody(request);
    return NextResponse.json(getBitcodeAppContext().createDeposit(body));
  } catch (error) {
    return toBitcodeErrorResponse(error);
  }
}
