import { GET } from '@/app/terminal/demonstration-witness-scoped-styles/route';

describe('demonstration witness scoped stylesheet route', () => {
  it('scopes the demonstration stylesheet to the demonstration witness root', async () => {
    const response = await GET();
    const stylesheet = await response.text();

    expect(stylesheet).toContain('.bitcode-demonstration-witness-root {');
    expect(stylesheet).toContain('.bitcode-demonstration-witness-root button {');
    expect(stylesheet).toContain('.bitcode-demonstration-witness-root .grid');
    expect(stylesheet).toContain('linear-gradient(180deg, rgba(16, 185, 129, .92), rgba(4, 120, 87, .96))');
    expect(stylesheet).not.toMatch(/(^|\n)\s*body\s*\{/);
    expect(stylesheet).not.toMatch(/(^|\n)\s*button\s*\{/);
  });
});
