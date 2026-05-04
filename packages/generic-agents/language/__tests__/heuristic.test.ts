import { expect, describe, it } from 'vitest';
import { LanguageAnalysisAgent } from '../src/index';

describe('LanguageAnalysisAgent – position heuristic', () => {
  it('guesses position when missing', async () => {
    const tmp = '/tmp/bitcode_heuristic.ts';
    require('fs').writeFileSync(tmp, 'function foo() { return 1; }\n');

    const result = await LanguageAnalysisAgent.tool({
      query: 'where is foo defined',
      filePath: tmp,
    } as any);

    expect(result).toBeDefined();
  });
});
