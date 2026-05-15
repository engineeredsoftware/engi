import { NextResponse } from 'next/server';

import {
  getBitcodeAppContext,
  readBitcodeRequestBody,
  toBitcodeErrorResponse,
} from '@/lib/bitcode-app-context';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    return NextResponse.json(
      getBitcodeAppContext().getReadReview({
        scenarioId: url.searchParams.get('scenarioId') || undefined,
      }),
    );
  } catch (error) {
    return toBitcodeErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await readBitcodeRequestBody(request);
    return NextResponse.json(getBitcodeAppContext().reviewRead(body));
  } catch (error) {
    return toBitcodeErrorResponse(error);
  }
}
