/**
 * Middleware utilities for API routes
 */

import { NextRequest, NextResponse } from 'next/server';

export type RouteHandler = (
  request: NextRequest,
  context?: any
) => Promise<NextResponse> | NextResponse;

/**
 * Wraps an API route with standard error handling and logging
 */
export function createRouteWrapper(handler: RouteHandler): RouteHandler {
  return async (request: NextRequest, context?: any) => {
    try {
      return await handler(request, context);
    } catch (error) {
      console.error('[Route Error]', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  };
}

/**
 * Simple in-memory rate limiter
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const now = Date.now();
  const key = `rate-limit:${identifier}`;
  
  const existing = rateLimitMap.get(key);
  
  if (!existing || existing.resetTime < now) {
    const resetTime = now + windowMs;
    rateLimitMap.set(key, { count: 1, resetTime });
    
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: resetTime
    };
  }
  
  if (existing.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: existing.resetTime
    };
  }
  
  existing.count++;
  rateLimitMap.set(key, existing);
  
  return {
    success: true,
    limit,
    remaining: limit - existing.count,
    reset: existing.resetTime
  };
}

export default createRouteWrapper;