/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Unit-test for getDigest orchestration layer.
//  – Mocks Supabase, artifacts helper and underlying generateDigest so that
//    no network / LLM calls are performed.

const productDoc = `###### What is this document?

# PRODUCT'S PURPOSE:
Auto purpose

# PRODUCT'S FEATURES:
- Auto feature

# SOURCE FILES:
- src/index.ts`;

const agentDoc = `###### What is this document?

# AGENTS' INSTRUCTIONS:
- Follow the playbook.

# AGENTS' SEEKING QUESTIONS:
- What unknowns remain?`;

jest.mock('@bitcode/supabase', () => {
  const selectMock = jest.fn().mockReturnThis();
  const matchMock = jest.fn().mockReturnThis();
  const maybeSingleMock = jest.fn(async () => ({ data: null, error: null }));
  const insertMock = jest.fn(async () => ({ error: null }));
  const upsertMock = jest.fn(async () => ({ error: null }));

  return {
    supabaseAdmin: {
      from: jest.fn(() => ({
        select: selectMock,
        match: matchMock,
        maybeSingle: maybeSingleMock,
        insert: insertMock,
        upsert: upsertMock,
      })) as jest.Mock,
    },
  };
});

const generateDigestMock = jest.fn(async () => ({
  digestPath: '/tmp/mock-product.md',
  productDocument: productDoc,
  agentDocument: agentDoc,
  stats: { filesProcessed: 1 },
}));

jest.mock('@/digest/run/digest', () => ({
  generateDigest: generateDigestMock,
}));

const saveArtifactMock = jest.fn(async (_buf: any, name: string) => {
  return { url: `https://example.com/${name}`, size: 123, name };
});

jest.mock('@/artifacts', () => ({
  saveArtifact: saveArtifactMock,
}));

import { getDigest } from '../index';

describe('getDigest', () => {
  const snapshot = { org: 'acme', repo: 'demo', commit: 'abc123' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const runDigest = () => getDigest(snapshot);

  it('uploads PRODUCT markdown when cache is cold', async () => {
    const result = await runDigest();

    expect(result.cacheHit).toBe(false);
    expect(result.url).toBe('https://example.com/demo-product.md');

    expect(saveArtifactMock).toHaveBeenCalledTimes(2);
    const productCall = saveArtifactMock.mock.calls.find(([, name]) => name === 'demo-product.md');
    expect(productCall).toBeDefined();
    const [buffer] = productCall!;
    expect(Buffer.isBuffer(buffer)).toBe(true);
    expect((buffer as Buffer).toString()).toContain('Auto purpose');
  });

  it('uploads AGENTS markdown and returns agents URL when cache is cold', async () => {
    const result = await runDigest();

    expect(result.cacheHit).toBe(false);
    expect(result.agentsUrl).toBe('https://example.com/demo-agents.md');

    expect(saveArtifactMock).toHaveBeenCalledTimes(2);
    const agentCall = saveArtifactMock.mock.calls.find(([, name]) => name === 'demo-agents.md');
    expect(agentCall).toBeDefined();
    const [buffer] = agentCall!;
    expect(Buffer.isBuffer(buffer)).toBe(true);
    expect((buffer as Buffer).toString()).toContain('Follow the playbook.');
  });

  it('returns cached documents on subsequent calls', async () => {
    const { supabaseAdmin } = require('@bitcode/supabase');
    (supabaseAdmin.from as jest.Mock).mockReturnValueOnce({
      select: jest.fn().mockReturnThis() as jest.Mock,
      match: jest.fn().mockReturnThis() as jest.Mock,
      maybeSingle: jest.fn(async () => ({
        data: {
          url: 'https://example.com/demo-product.md',
          stats: { agentsUrl: 'https://example.com/demo-agents.md' },
          created_at: 'now',
        },
        error: null,
      })) as jest.Mock,
    });

    const result = await getDigest(snapshot);
    expect(result.cacheHit).toBe(true);
    expect(result.url).toBe('https://example.com/demo-product.md');
    expect(result.agentsUrl).toBe('https://example.com/demo-agents.md');
    expect(saveArtifactMock).not.toHaveBeenCalled();
  });
});
