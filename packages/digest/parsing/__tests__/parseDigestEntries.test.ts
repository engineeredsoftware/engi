import { describe, it, expect } from '@jest/globals';
import { parseDigestEntries } from '../parseDigestEntries';

describe('parseDigestEntries', () => {
  it('returns empty array when content is empty or whitespace', () => {
    expect(parseDigestEntries('')).toEqual([]);
    expect(parseDigestEntries('   ')).toEqual([]);
  });

  it('parses entries with tags and dependencies', () => {
    const content = `
### path/to/file.js
**Type:** code
**Token Count:** 42
**Summary:**
Some summary text. Tags: tag1, tag2 Dependencies: dep1,dep2

### another/file.py
**Type:** logic
**Token Count:** 10
**Summary:**
Other summary. Tags: foo Dependencies: bar
`.trim();

    const entries = parseDigestEntries(content);
    expect(entries).toHaveLength(2);

    expect(entries[0]).toMatchObject({
      path: 'path/to/file.js',
      type: 'code',
      summary: expect.stringContaining('Some summary text.'),
      tags: ['tag1', 'tag2'],
      dependencies: ['dep1', 'dep2'],
    });

    expect(entries[1]).toMatchObject({
      path: 'another/file.py',
      type: 'logic',
      tags: ['foo'],
      dependencies: ['bar'],
    });
  });

  it('skips invalid entries', () => {
    const content = `
### bad/entry.txt
**Type:** 
**Token Count:** 0
**Summary:**
`.trim();

    expect(parseDigestEntries(content)).toEqual([]);
  });
});
