import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

// Light-weight extraction of digest caching helpers.
// The goal is to replicate the public surface (getCacheDir, getCachePath, etc.)
// while keeping dependencies minimal so we can iterate quickly.

/**
 * Logger interface – intentionally tiny so callers can provide their own impl.
 */
export interface Logger {
  info: (msg: string, data?: any) => void;
  warn?: (msg: string, data?: any) => void;
  error?: (msg: string, data?: any) => void;
  debug?: (msg: string, data?: any) => void;
}

const noop = () => undefined;

function normaliseLogger(logger?: Partial<Logger>): Logger {
  return {
    info: logger?.info ?? console.log,
    warn: logger?.warn ?? console.warn,
    error: logger?.error ?? console.error,
    debug: logger?.debug ?? noop,
  };
}

/**
 * Compute cache directory path based on execution context (GitHub vs local).
 * Mirrors the behaviour of the legacy helper in `uapi/lib/digest/digest.ts`
 * but without side-effects.  The caller may create the directory if needed.
 */
export function getCacheDir(
  isGitHubMode: boolean,
  rootDir: string,
  gitInfo: { repoOrgUser?: string; remoteUrl?: string } = {},
  logger?: Partial<Logger>,
): string {
  const { info, debug } = normaliseLogger(logger);

  const baseDir = '/tmp/engi/digest-cache';
  info?.('\n🔑 Determining cache directory (digest/caching)…');

  if (isGitHubMode) {
    // When running on GitHub repos we use a stable path based on org/repo.
    const repoOrgUser = gitInfo.repoOrgUser || 'unknown-repo';
    const cacheDir = path.join(baseDir, 'github', repoOrgUser, 'files');
    info?.(`├─ Mode: GitHub`);
    info?.(`├─ Repository: ${repoOrgUser}`);
    info?.(`└─ Cache Dir: ${cacheDir}`);
    return cacheDir;
  }

  // Local mode – derive a stable hash from the absolute root path or remote URL.
  const absPath = path.resolve(rootDir);
  const identifier = gitInfo.remoteUrl ?? absPath;
  const stableHash = crypto.createHash('sha256').update(identifier).digest('hex').slice(0, 12);
  const cacheDir = path.join(baseDir, 'local', stableHash, 'files');

  info?.(`├─ Mode: Local`);
  info?.(`├─ Root Path: ${absPath}`);
  info?.(`└─ Cache Dir: ${cacheDir}`);

  debug?.(`Computed cache dir using identifier: ${identifier}`);
  return cacheDir;
}

export function getCachePath(cacheDir: string, fileHash: string): string {
  return path.join(cacheDir, `${fileHash}.json`);
}

// ---------------------------------------------------------------------------
// Bound helpers – created through `createCache()` so they capture config/state
// ---------------------------------------------------------------------------

export interface CreateCacheOptions {
  rootDir: string;
  cacheDir: string;
  forceRegenerate?: boolean;
  dryRun?: boolean;
  debug?: boolean;
  logger?: Partial<Logger>;
}

export interface CacheStats {
  attempts: number;
  hits: number;
  misses: number;
  expired: number;
  byType: Record<string, { attempts: number; hits: number }>;
  totalTokensSaved: number;
  missesByReason?: Record<string, number>;
}

export interface CacheHelpers {
  /** Return /tmp/… path for a given hash */
  getCachePath: (fileHash: string) => string;
  /** Try reading from cache; returns parsed JSON or null */
  loadFromCache: (fileHash: string, relativePath: string) => Promise<any | null>;
  /** Persist digest JSON to disk */
  saveToCache: (fileHash: string, data: any) => Promise<void>;
  /** Pretty log at the very end */
  logFinalCacheReport: () => void;
  /** Live stats object */
  stats: CacheStats;
}

export function createCache(opts: CreateCacheOptions): CacheHelpers {
  const {
    rootDir,
    cacheDir,
    forceRegenerate = false,
    dryRun = false,
    debug = false,
    logger,
  } = opts;

  const { info, warn, error, debug: dbg } = normaliseLogger(logger);

  // Ensure the directory exists early – let caller handle errors.
  try {
    fs.mkdirSync(cacheDir, { recursive: true });
  } catch (e) {
    // Ignore – saves will throw later.
  }

  const stats: CacheStats = {
    attempts: 0,
    hits: 0,
    misses: 0,
    expired: 0,
    byType: {},
    totalTokensSaved: 0,
  };

  const getCachePathBound = (fileHash: string) => getCachePath(cacheDir, fileHash);

  async function loadFromCache(fileHash: string, relativePath: string): Promise<any | null> {
    stats.attempts += 1;

    if (forceRegenerate) {
      stats.misses += 1;
      return null;
    }

    const cachePath = getCachePathBound(fileHash);
    if (!fs.existsSync(cachePath)) {
      stats.misses += 1;
      return null;
    }

    try {
      const raw = await fs.promises.readFile(cachePath, 'utf8');
      const data = JSON.parse(raw);
      stats.hits += 1;
      // Track by type if present.
      if (data?.type) {
        if (!stats.byType[data.type]) stats.byType[data.type] = { attempts: 0, hits: 0 };
        stats.byType[data.type].attempts += 1;
        stats.byType[data.type].hits += 1;
      }
      return data;
    } catch (err) {
      warn?.(`Failed to read cache for ${relativePath}: ${(err as Error).message}`);
      stats.misses += 1;
      return null;
    }
  }

  async function saveToCache(fileHash: string, data: any): Promise<void> {
    if (dryRun) {
      dbg?.(`[DRY RUN] Skipping cache write for ${data?.relativePath ?? fileHash}`);
      return;
    }

    const cachePath = getCachePathBound(fileHash);
    try {
      await fs.promises.mkdir(path.dirname(cachePath), { recursive: true });
      await fs.promises.writeFile(cachePath, JSON.stringify(data, null, 2), 'utf8');
      dbg?.(`Saved digest cache → ${cachePath}`);
    } catch (err) {
      error?.(`Failed to write cache file ${cachePath}: ${(err as Error).message}`);
    }
  }

  function logFinalCacheReport(): void {
    const hitRate = ((stats.hits / Math.max(1, stats.attempts)) * 100).toFixed(1);
    info?.('\n📊 Final Cache Report (digest/caching):');
    info?.(`├─ Attempts: ${stats.attempts}`);
    info?.(`├─ Hits: ${stats.hits} (${hitRate}%)`);
    info?.(`└─ Misses: ${stats.misses}`);
  }

  return {
    getCachePath: getCachePathBound,
    loadFromCache,
    saveToCache,
    logFinalCacheReport,
    stats,
  };
}

// ---------------------------------------------------------------------------
// Legacy placeholders – allow callers to import symbols even if they haven’t
// migrated to the bound-helper pattern yet. These simply throw.
// ---------------------------------------------------------------------------

export async function loadFromCache(): Promise<never> {
  throw new Error('digest/caching: loadFromCache is only available via createCache(...)');
}

export async function saveToCache(): Promise<never> {
  throw new Error('digest/caching: saveToCache is only available via createCache(...)');
}

export function logFinalCacheReport(): never {
  throw new Error('digest/caching: logFinalCacheReport is only available via createCache(...)');
}
