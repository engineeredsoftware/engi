import { NextResponse } from 'next/server';

import { getBitcodeAppContext, toBitcodeErrorResponse } from '@/lib/bitcode-app-context';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    return NextResponse.json(
      getBitcodeAppContext().getExternalRealization({
        environmentMode: url.searchParams.get('environmentMode'),
      }),
    );
  } catch (error) {
    return toBitcodeErrorResponse(error);
  }
}
