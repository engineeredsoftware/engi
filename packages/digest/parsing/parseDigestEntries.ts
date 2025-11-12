import { log } from '@engi/logger';

export interface DigestEntry {
  path: string;
  type: string;
  summary: string;
  tags: string[];
  dependencies: string[];
}

/**
 * Splits a digest content string into `DigestEntry[]`, looking for Markdown headings and known sections.
 * To be clear these are 'file entries'
 */
export function parseDigestEntries(content: string): DigestEntry[] {
  if (!content?.trim()) {
    log('Empty content passed to parseDigestEntries', 'warn');
    return [];
  }

  const entries: DigestEntry[] = [];

  // The content passed here should already be just the File Digests section
  // We'll parse each file entry which starts with ### and contains Type and Summary
  const fileEntryPattern = /### ([^\n]+)\s*\n\*\*Type:\*\* ([^\n]+)\s*\n\*\*Token Count:\*\* [^\n]+\s*\n\*\*Summary:\*\*\s*\n([\s\S]+?)(?=\n### |\n# |$)/g;

  let match;
  while ((match = fileEntryPattern.exec(content)) !== null) {
    try {
      const [_, path, type, summary] = match;

      if (!path?.trim() || !type?.trim() || !summary?.trim()) {
        log('Invalid digest entry - missing required fields', 'warn', {
          path: path?.slice(0, 50),
          type,
          summaryPreview: summary?.slice(0, 50),
        });
        continue;
      }

      entries.push({
        path: path.trim(),
        type: type.trim(),
        summary: summary.trim(),
        tags: extractDigestsTags(summary),
        dependencies: extractDigestsDependencies(summary),
      });
    } catch (error) {
      log('Error parsing digest entry', 'error', {
        error: error instanceof Error ? error.message : String(error),
        matchContent: match[0]?.slice(0, 200),
      });
    }
  }

  if (entries.length === 0) {
    log('No valid entries found in digest content', 'warn', {
      contentPreview: content.slice(0, 500),
      matches: content.match(/###\s+[^\n]+/g)?.length || 0,
    });
  }

  return entries;
}

function extractDigestsTags(summary: string): string[] {
  const tagMatch = summary.match(/Tags:\s*([^\n]*?)(?:\s+Dependencies:|$)/);
  if (!tagMatch) return [];
  return tagMatch[1]
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

function extractDigestsDependencies(summary: string): string[] {
  const depMatch = summary.match(/Dependencies:\s*([^\n]+)/);
  if (!depMatch) return [];
  return depMatch[1]
    .split(',')
    .map((d) => d.trim())
    .filter((d) => d.length > 0);
}
