/**
 * High-level façade around the low-level digest generation logic
 * (`packages/digest/run/digest.ts`) that adds:
 *   1. Persistence layer (Supabase table `digests`)
 *   2. Artifact storage (S3 or Supabase Storage via `saveArtifact` helper)
 *
 * The exported `getDigest` function is meant to be consumed by backend
 * route handlers or other server-side processes.  It guarantees that, for a
 * given repository snapshot (org, repo, commit), we will return a URL to an
 * existing digest – generating and caching one if necessary.
 *
 * The underlying digest generation (file scanning, LLM calls, on-disk cache
 * reuse, etc.) lives unchanged in `generateDigest`.  This module concerns
 * itself purely with orchestrating persistence and optimising for
 * idempotency.
 */

import * as crypto from 'crypto';
import { generateDigest } from '@/digest/run/digest';
import { saveArtifact } from '@/artifacts';
import { supabaseAdmin } from '@engi/supabase';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RepoSnapshot {
  org: string;
  repo: string;
  commit: string;
}

export interface DigestRecord {
  id: string;
  org: string;
  repo: string;
  commit: string;
  url: string;
  created_at: string;
  stats: any; // JSONB
}

export interface GetDigestResult {
  url: string;
  agentsUrl?: string;
  stats?: any;
  createdAt?: string;
  cacheHit: boolean;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

async function fetchExistingDigest(snapshot: RepoSnapshot): Promise<DigestRecord | null> {
  const { data, error } = await supabaseAdmin
    .from<DigestRecord>('digests')
    .select('*')
    .match({ org: snapshot.org, repo: snapshot.repo, commit: snapshot.commit })
    .maybeSingle();

  if (error) {
    // We never want Supabase failures to break the build – log and continue.
    console.error('[getDigest] Supabase lookup failed:', error.message);
    return null;
  }
  return data ?? null;
}

async function storeDigestRecord(snapshot: RepoSnapshot, url: string, stats: any): Promise<void> {
  const payload: Partial<DigestRecord> = {
    org: snapshot.org,
    repo: snapshot.repo,
    commit: snapshot.commit,
    url,
    created_at: new Date().toISOString(),
    stats,
  };

  const { error } = await supabaseAdmin
    .from('digests')
    .upsert(payload, { onConflict: 'org,repo,commit' });

  if (error) {
    // Non-fatal – the digest itself is still useful even if we failed to store meta.
    console.error('[getDigest] Supabase upsert failed:', error.message);
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Ensure a digest exists for the given repository snapshot and return its URL.
 *
 * 1. Check the `digests` table – fast path.
 * 2. If missing, run `generateDigest`, upload resulting markdown to S3, and
 *    persist a new DB record.
 *
 * By default we *do not* force regeneration; callers can override by passing
 * `forceRegenerate: true` which bypasses both the DB lookup and the on-disk
 * cache used during generation.
 */
export async function getDigest(
  snapshot: RepoSnapshot,
  options: { forceRegenerate?: boolean } = {},
): Promise<GetDigestResult> {
  if (!options.forceRegenerate) {
    const cached = await fetchExistingDigest(snapshot);
    if (cached) {
      const agentsUrl = cached.stats?.agentsUrl;
      return { url: cached.url, agentsUrl, stats: cached.stats, createdAt: cached.created_at, cacheHit: true };
    }
  }

  // A new digest is required – run the heavy generator.
  // We re-use file-level cache inside generateDigest, so this is still cheap if
  // only a few files were updated.

  // CorrelationId purely for traceability/logging.
  const correlationId = crypto.randomUUID();

  const result = await generateDigest({
    owner: snapshot.org,
    repo: snapshot.repo,
    commit: snapshot.commit,
    correlationId,
    usePreClonedRepo: false,
    forceRegenerate: options.forceRegenerate,
  });

  // Upload to artifact storage (S3 preferred, fallback to Supabase Storage).
  const productBuffer = Buffer.from(result.productDocument, 'utf8');
  const agentBuffer = Buffer.from(result.agentDocument, 'utf8');
  const productArtifact = await saveArtifact(productBuffer, `${snapshot.repo}-product.md`, 'text/markdown');
  const agentArtifact = await saveArtifact(agentBuffer, `${snapshot.repo}-agents.md`, 'text/markdown');

  // Persist metadata asynchronously – failures are logged but non-fatal.
  const statsWithAgents = {
    ...result.stats,
    agentsUrl: agentArtifact.url
  };
  await storeDigestRecord(snapshot, productArtifact.url, statsWithAgents);

  return {
    url: productArtifact.url,
    agentsUrl: agentArtifact.url,
    stats: statsWithAgents,
    createdAt: new Date().toISOString(),
    cacheHit: false
  };
}
