import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { resolveDemonstrationWitnessPublicDir } from '../demonstration-witness-public-dir';
import { BITCODE_DEMONSTRATION_WITNESS_THEME_OVERRIDES } from '../demonstration-witness-theme-overrides';

export const runtime = 'nodejs';

export async function GET() {
  const stylesheet = await readFile(path.join(resolveDemonstrationWitnessPublicDir(), 'styles.css'), 'utf8');
  return new Response(`${stylesheet}\n${BITCODE_DEMONSTRATION_WITNESS_THEME_OVERRIDES}`, {
    headers: {
      'Content-Type': 'text/css; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}
