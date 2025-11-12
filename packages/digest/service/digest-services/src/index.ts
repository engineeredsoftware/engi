/**
 * Lightweight helper to return a compact digest / summary string for the
 * repository at the current commit.  In production this would analyse the git
 * history, file-tree and recent CI metadata then return a ~500-1k character
 * summary that helps the LLM ground its responses.
 *
 * For now we provide a stub implementation so the rest of the ad-hoc pipeline
 * can compile and run end-to-end.  Replace the body with a real digest
 * generator when available.
 */

export async function getRepoDigest(_repoId: string): Promise<string> {
  return '[repo-digest-placeholder]';
}
