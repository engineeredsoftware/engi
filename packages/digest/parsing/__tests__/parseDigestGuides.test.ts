import { describe, it, expect } from '@jest/globals';
import { parseDigestGuides } from '../parseDigestGuides';

describe('parseDigestGuides', () => {
  it('returns empty sections when content is empty', () => {
    expect(parseDigestGuides('')).toEqual({ sections: [] });
  });

  it('parses guide sections when markers are present', () => {
    const content = `
# Title
# Task Guides

(Generated Task Guides)
# Guide A
Line A1
Line A2
# Guide B
Another line
`.trim();

    const { sections } = parseDigestGuides(content);
    expect(sections).toHaveLength(2);
    expect(sections[0]).toEqual({ title: 'Guide A', content: 'Line A1\nLine A2' });
    expect(sections[1]).toEqual({ title: 'Guide B', content: 'Another line' });
  });

  it('returns empty when markers are missing', () => {
    const content = '# Something else\nNo guides here';
    expect(parseDigestGuides(content)).toEqual({ sections: [] });
  });
});
