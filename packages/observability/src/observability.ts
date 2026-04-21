import { startSpan } from '@bitcode/sentry';

// Friendly helper to measure a block of async work.  Automatically becomes a
// no-op when the Sentry SDK or DSN is not available.

export async function trace<T>(name: string, fn: () => Promise<T>): Promise<T> {
  return startSpan({ name }, fn);
}

// ---------------------------------------------------------------------------
// helper: tracedGenerateText (for calls using 'ai' generateText)
// ---------------------------------------------------------------------------

import { generateText as rawGenerateText } from 'ai';

export async function generateTextTraced(args: any): Promise<any> {
  const modelName = (args?.model?.model ?? args?.model?.id ?? 'unknown') as string;
  return trace(`llm:generateText:${modelName}`, () => rawGenerateText(args as any) as Promise<any>);
}

// ---------------------------------------------------------------------------
// Wrapper helper for Next.js route handlers
// ---------------------------------------------------------------------------

import { reportError, toHttpResponse } from '@bitcode/errors';

export function traceRoute<T extends (...args: any[]) => any>(name: string, fn: T): T {
  return (async (...args: any[]) => {
    try {
      return await trace(`api:${name}`, () => fn(...(args as any)));
    } catch (err) {
      const { status, body } = toHttpResponse(reportError(err));
      return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
      }) as any;
    }
  }) as unknown as T;
}

// ---------------------------------------------------------------------------
// helper: Step-level tracing (Plan / Generate / Refine / …)
// ---------------------------------------------------------------------------

export async function traceStep<T>(name: string, fn: () => Promise<T>): Promise<T> {
  return trace(`step:${name}`, fn);
}
