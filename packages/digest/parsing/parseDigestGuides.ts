import { log } from '@bitcode/logger';

export interface GuideSection {
  title: string;
  content: string;
}

/**
 * Extracts the Task Guide sections from a digest markdown string.
 * The digest is expected to contain a `# Task Guides` header followed by a
 * `(Generated Task Guides)` marker. Everything after that marker is split
 * on top-level `#` headers and returned as `{ title, content }[]`.
 */
export function parseDigestGuides(content: string): { sections: GuideSection[] } {
  if (!content) {
    return { sections: [] };
  }

  const guidesMatch = content.match(/# Task Guides\s*\n([\s\S]*?)$/);
  if (!guidesMatch) {
    log('No Task Guides section found', 'warn', { contentPreview: content.slice(0, 200) });
    return { sections: [] };
  }

  const guidesContent = guidesMatch[1];

  const generatedGuidesMatch = guidesContent.match(/\(Generated Task Guides\)([\s\S]*?)$/);
  if (!generatedGuidesMatch) {
    log('No Generated Task Guides marker found', 'warn');
    return { sections: [] };
  }

  const generatedContent = generatedGuidesMatch[1];

  // Split into sections by top-level headers (# <title>)
  const sectionMatches = generatedContent
    .split(/^#\s+/m)
    .map(section => section.trim())
    .filter(section => section.length > 0);

  const guides = sectionMatches
    .map(section => {
      const lines = section.split('\n');
      const title = lines[0]?.trim() ?? '';
      const content = lines.slice(1).join('\n').trim();
      return { title, content };
    })
    .filter(guide => guide.title.length > 0);

  log('Parsed guide sections', 'debug', {
    totalGuides: guides.length,
    firstGuide: guides[0]?.title || 'No guides found',
    contentLength: guidesContent.length
  });

  return { sections: guides };
}
