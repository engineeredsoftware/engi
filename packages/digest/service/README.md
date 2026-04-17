# Digest Service Layer

This package adds a **thin orchestration layer** on top of the low-level
`generateDigest()` implementation.  Its sole responsibility is to ensure that
callers can obtain a URL to a repository digest **in O(1) calls** while
respecting all existing file-level caching logic.

````mermaid
flowchart TD
  A[getDigest(snapshot)] -->|lookup| B[Supabase digests table]
  B -- hit --> C[(return URL)]
  B -- miss --> D[generateDigest()]
  D --> E[[S3 / Supabase Storage]]
  E --> F[(URL)]
  F --> G[Supabase upsert]
  F --> C
````

## API

```ts
import { getDigest } from '@/digest/service';

const { url, stats, cacheHit } = await getDigest(
  { org: 'acme', repo: 'demo', commit: 'a1b2c3' },
  { forceRegenerate: false },
);
```

## Implementation details

1. **Supabase table** `digests (org, repo, commit)` is the source of truth for
   deduplication.  A migration lives in `supabase/migrations/…create_digests.sql`.
2. **Artifact storage** delegates to the existing `saveArtifact` helper which
   prefers S3 and transparently falls back to Supabase Storage when AWS creds
   are absent.
3. **File-level cache** remains unchanged – it is initialised inside
   `generateDigest` and guarantees that structural LLM calls are skipped when
   files have not changed.

## Testing

Unit tests in `__tests__/getDigest.test.ts` fully mock:

* Supabase admin client (DB hit/miss)
* `generateDigest` heavy worker
* `saveArtifact` network call

This keeps the test hermetic and <100 ms.

Run:

```bash
pnpm --filter @bitcode/digest run test
```

## Future work

* Add Grafana/Loki log shim for end-to-end timings.
* Cron job that purges `/tmp/engi/digest-cache` with LRU semantics.
