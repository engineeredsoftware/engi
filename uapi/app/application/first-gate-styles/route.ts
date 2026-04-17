import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { DEFAULT_BITCODE_PUBLIC_DIR } from '@bitcode/bitcode';

export const runtime = 'nodejs';

export async function GET() {
  const stylesheet = await readFile(path.join(DEFAULT_BITCODE_PUBLIC_DIR, 'styles.css'), 'utf8');
  return new Response(stylesheet, {
    headers: {
      'Content-Type': 'text/css; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}
