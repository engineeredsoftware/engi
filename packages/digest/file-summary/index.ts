import path from 'path';

/**
 * Determine high-level file type categories used by the digest pipeline.
 */
export function getFileType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const normalizedPath = filePath.split(path.sep).join('/');

  // API routes are detected before the general extension mapping.
  if (ext === '.tsx' && normalizedPath.includes('app/api/')) return 'api-route';
  if (normalizedPath.includes('app/api/')) return 'api-route';

  const codeExtensions = new Set(
    [
      '.py', '.pyi', '.js', '.ts', '.jsx', '.tsx', '.mjs', '.cjs',
      '.rs', '.c', '.cpp', '.h', '.hpp', '.java', '.kt', '.kts', '.swift', '.php',
    ],
  );

  if (ext === '.ipynb') return 'notebook';
  if (ext === '.tsx' || ext === '.jsx') return 'ui-component';
  if (codeExtensions.has(ext)) return 'code';
  if (['.md', '.rst', '.txt', '.adoc', '.asciidoc', '.wiki', '.org'].includes(ext)) return 'documentation';
  if (['.json', '.yaml', '.yml', '.toml', '.ini', '.cfg', '.conf', '.env'].includes(ext)) return 'config';

  return 'unknown';
}

/**
 * Quick content sanity check so we don’t feed garbage / binaries to the LLM.
 */
export function validateContent(filePath: string, content: string): boolean {
  if (!content || typeof content !== 'string') return false;
  if (!content.trim()) return false;

  // detect binary by NUL byte in first chunk
  if (content.slice(0, 1000).includes('\x00')) return false;

  // JSON files must be valid JSON (prevents half-written lock files, etc.)
  if (filePath.toLowerCase().endsWith('.json')) {
    try {
      JSON.parse(content);
    } catch {
      return false;
    }
  }

  return true;
}

export interface RawFile {
  relativePath: string;
  content: string;
}

export interface FileInfo extends RawFile {
  type: string;
  tokenCount: number;
}

import { estimateTokens } from '@/digest/tokens';

/**
 * Convert raw file content into the enriched structure used across the digest
 * pipeline.  (Path should be repo-relative.)
 */
export function buildFileInfo(relativePath: string, content: string): FileInfo {
  return {
    relativePath,
    content,
    type: getFileType(relativePath),
    tokenCount: estimateTokens(content),
  };
}

// ---------------------------------------------------------------------------
// Batch summarisation (ported from legacy digest)
// ---------------------------------------------------------------------------

import {
  BATCH_SUMMARY_MODEL,
  callLLMAPI,
} from '@/digest/llm';

import { FILE_SUMMARIES_PROMPT } from '@/digest/prompts/file-summaries-prompts';

interface BatchContext {
  current: number;
  total: number;
  type?: string;
  parentSize?: number;
}

export interface FileDigest {
  relativePath: string;
  type: string;
  summary: string;
  tags: string[];
  dependencies: string[];
  keywords?: string[];
  tokenCount?: number;
  path?: string;
}

/**
 * Send a batch of files to the LLM and parse the resulting digests.
 * Thin wrapper; heavy validation lives in the orchestrator for now.
 */
export async function batchSummarizeFiles(
  files: FileInfo[],
  additionalPrompt: string = '',
  batchContext: BatchContext | null = null,
): Promise<FileDigest[]> {
  const input = files.map((f) => `### File: ${f.relativePath}\n${f.content}`).join('\n\n');

  const prompt = `${FILE_SUMMARIES_PROMPT}\n${additionalPrompt}\n${input}`;

  const raw = await callLLMAPI(prompt, 2048, true, BATCH_SUMMARY_MODEL, 0, batchContext);

  if (Array.isArray(raw)) return raw as FileDigest[];

  // Attempt to parse string → JSON.
  try {
    return JSON.parse(raw as unknown as string) as FileDigest[];
  } catch {
    throw new Error('Failed to parse JSON from batchSummarizeFiles response');
  }
}

