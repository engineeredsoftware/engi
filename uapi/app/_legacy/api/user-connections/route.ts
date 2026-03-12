import { NextRequest, NextResponse } from 'next/server';

// GA-1: Placeholder for user connections
// This will be properly implemented when connections feature is added

export async function GET(request: NextRequest) {
  return NextResponse.json({ connections: [] });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ success: true });
}