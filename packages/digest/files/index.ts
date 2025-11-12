import crypto from 'crypto';

/**
 * Normalize file content so identical logical files map to identical hashes.
 * (Copied from legacy digest implementation.)
 */
export function normalizeContent(content: string): string {
  if (!content) return '';

  // Strip UTF-8 BOM if present
  content = content.replace(/^\uFEFF/, '');

  // Convert CRLF / CR to LF
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Trim trailing whitespace on every line
  const lines = content.split('\n').map((l) => l.trimEnd());

  return lines.join('\n');
}

/**
 * Produce a stable hash for a file using its relative path + normalized content.
 * Mirrors behaviour of `hashContent` in the monolith so the cache dir remains
 * deterministic across the refactor.
 */
export function hashFile(relativePath: string, rawContent: string): string {
  const normalizedPath = relativePath.split(/\\|\//).join('/');
  const normalizedContent = normalizeContent(rawContent);

  const pathHash = crypto.createHash('sha256').update(normalizedPath).digest('hex').slice(0, 12);
  const contentHash = crypto.createHash('sha256').update(normalizedContent).digest('hex').slice(0, 24);

  return `v1_${pathHash}_${contentHash}`;
}

// Back-compat alias (will be removed when monolith is fully migrated)
export const hashContent = hashFile;

// ------------------------------------------------------------
// Ignoring / scanning helpers (ported from legacy digest)
// ------------------------------------------------------------

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { minimatch } from 'minimatch';

export interface FileEntry {
  path: string;   // relative path from repo root
  size: number;   // bytes
  fullPath?: string; // absolute path (internal use)
}

/**
 * Read local .gitignore and return raw patterns (comments trimmed).
 */
export function readGitignore(rootDir: string): string[] {
  const gitignorePath = path.join(rootDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) return [];

  try {
    return fs.readFileSync(gitignorePath, 'utf8')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'));
  } catch {
    return [];
  }
}

/** Basic binary check – looks for NUL byte in first 1 KB. */
export function isBinary(filePath: string): boolean {
  try {
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(1024);
    const bytesRead = fs.readSync(fd, buffer, 0, 1024, 0);
    fs.closeSync(fd);
    for (let i = 0; i < bytesRead; i++) {
      if (buffer[i] === 0) return true;
    }
    return false;
  } catch {
    return false;
  }
}

function matchesPattern(filePath: string, pattern: string): boolean {
  // Negation handled by caller (shouldIgnoreFile)
  return minimatch(filePath, pattern, { dot: true });
}

function shouldIgnoreFile(relPath: string, ignorePatterns: string[]): boolean {
  if (!relPath || relPath === '.' || relPath === './') return false;
  const normalized = relPath.replace(/\\/g, '/');

  let ignored = false;
  for (const pat of ignorePatterns) {
    if (!pat) continue;
    if (pat.startsWith('!')) {
      if (matchesPattern(normalized, pat.slice(1))) ignored = false;
    } else {
      if (matchesPattern(normalized, pat)) ignored = true;
    }
  }
  return ignored;
}

export function isGitRepository(dir: string): boolean {
  try {
    return fs.existsSync(path.join(dir, '.git'));
  } catch {
    return false;
  }
}

function getGitTrackedFilesSync(dir: string): FileEntry[] | null {
  try {
    const output = execSync('git ls-files', { cwd: dir, encoding: 'utf8' }).trim();
    return output.split('\n')
      .filter(Boolean)
      .map((relativePath) => {
        const fullPath = path.join(dir, relativePath);
        const stats = fs.statSync(fullPath);
        return { path: relativePath, size: stats.size, fullPath } as FileEntry;
      });
  } catch {
    return null;
  }
}

function getAllFilesRecursive(dir: string, baseDir: string = dir, depth = 0, visited = new Set<string>()): FileEntry[] {
  const MAX_DEPTH = 50;
  if (depth > MAX_DEPTH) return [];

  let results: FileEntry[] = [];
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  for (const entry of entries) {
    const resPath = path.resolve(dir, entry.name);
    if (visited.has(resPath)) continue;
    visited.add(resPath);

    if (entry.isDirectory()) {
      results = results.concat(getAllFilesRecursive(resPath, baseDir, depth + 1, visited));
    } else if (entry.isFile()) {
      try {
        const stats = fs.statSync(resPath);
        results.push({ path: path.relative(baseDir, resPath), size: stats.size, fullPath: resPath });
      } catch {/* ignore */}
    }
  }

  return results;
}

/**
 * Return FileEntry list for entire repo – attempts git ls-files first then falls back to FS walk.
 */
export async function listAllFiles(rootDir: string, ignorePatterns: string[]): Promise<FileEntry[]> {
  let files: FileEntry[] | null = null;

  if (isGitRepository(rootDir)) {
    files = getGitTrackedFilesSync(rootDir);
  }

  if (!files) {
    files = getAllFilesRecursive(rootDir);
  }

  if (!files) return [];

  // Apply ignore patterns
  return files.filter((f) => !shouldIgnoreFile(f.path, ignorePatterns));
}

// Expose util for tests / external callers
export { shouldIgnoreFile, matchesPattern };

