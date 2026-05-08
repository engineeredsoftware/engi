import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { resolveDemonstrationWitnessPublicDir } from '../demonstration-witness-public-dir';

export const runtime = 'nodejs';

export async function GET() {
  const script = await readFile(path.join(resolveDemonstrationWitnessPublicDir(), 'app.js'), 'utf8');

  return new Response(script, {
    headers: {
      'Content-Type': 'text/javascript; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
