import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { DEFAULT_BITCODE_PUBLIC_DIR } from '@bitcode/protocol-demonstration';

import { BITCODE_DEMONSTRATION_WITNESS_THEME_OVERRIDES } from '../demonstration-witness-theme-overrides';

export const runtime = 'nodejs';

const BITCODE_DEMONSTRATION_WITNESS_SCOPE = '.bitcode-demonstration-witness-root';

function scopeSelector(selector: string) {
  return selector
    .split(',')
    .map((part) => {
      const trimmed = part.trim();

      if (!trimmed) {
        return trimmed;
      }

      if (trimmed === ':root' || trimmed === 'html' || trimmed === 'body') {
        return BITCODE_DEMONSTRATION_WITNESS_SCOPE;
      }

      if (trimmed === '*') {
        return `${BITCODE_DEMONSTRATION_WITNESS_SCOPE}, ${BITCODE_DEMONSTRATION_WITNESS_SCOPE} *`;
      }

      if (trimmed.startsWith(BITCODE_DEMONSTRATION_WITNESS_SCOPE)) {
        return trimmed;
      }

      return `${BITCODE_DEMONSTRATION_WITNESS_SCOPE} ${trimmed}`;
    })
    .filter(Boolean)
    .join(', ');
}

function scopeDemonstrationWitnessStylesheet(stylesheet: string) {
  return stylesheet.replace(/([^{}]+)\{/g, (match, selector: string) => {
    const trimmed = selector.trim();

    if (trimmed.startsWith('@')) {
      return match;
    }

    return `${scopeSelector(selector)} {`;
  });
}

export async function GET() {
  const stylesheet = await readFile(path.join(DEFAULT_BITCODE_PUBLIC_DIR, 'styles.css'), 'utf8');
  const scopedStylesheet = scopeDemonstrationWitnessStylesheet(stylesheet);

  return new Response(`${scopedStylesheet}\n${BITCODE_DEMONSTRATION_WITNESS_THEME_OVERRIDES}`, {
    headers: {
      'Content-Type': 'text/css; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
