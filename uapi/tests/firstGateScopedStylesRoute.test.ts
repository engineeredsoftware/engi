jest.mock('@bitcode/protocol-demonstration', () => ({
  DEFAULT_BITCODE_PUBLIC_DIR: require('node:path').join(process.cwd(), '../protocol-demonstration/public'),
}));

import { GET } from '@/app/application/first-gate-scoped-styles/route';

describe('first gate scoped stylesheet route', () => {
  it('scopes the demonstration stylesheet to the embedded runtime root', async () => {
    const response = await GET();
    const stylesheet = await response.text();

    expect(stylesheet).toContain('.bitcode-first-gate-root {');
    expect(stylesheet).toContain('.bitcode-first-gate-root button {');
    expect(stylesheet).toContain('.bitcode-first-gate-root .grid');
    expect(stylesheet).toContain('linear-gradient(180deg, rgba(16, 185, 129, .92), rgba(4, 120, 87, .96))');
    expect(stylesheet).not.toMatch(/(^|\n)\s*body\s*\{/);
    expect(stylesheet).not.toMatch(/(^|\n)\s*button\s*\{/);
  });
});
