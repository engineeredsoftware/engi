import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { DEFAULT_BITCODE_PUBLIC_DIR } from '@bitcode/protocol-demonstration';

import { BITCODE_DEMONSTRATION_WITNESS_THEME_OVERRIDES } from '../demonstration-witness-theme-overrides';

export const runtime = 'nodejs';

export async function GET() {
  const stylesheet = await readFile(path.join(DEFAULT_BITCODE_PUBLIC_DIR, 'styles.css'), 'utf8');
  return new Response(`${stylesheet}\n${BITCODE_DEMONSTRATION_WITNESS_THEME_OVERRIDES}`, {
    headers: {
      'Content-Type': 'text/css; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}
