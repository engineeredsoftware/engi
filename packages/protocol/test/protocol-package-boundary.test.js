import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const importBoundaryPattern = /(?:import\s+(?:[^'"]+\s+from\s+)?|import\s*\(|require\s*\()\s*['"][^'"]*(?:@bitcode\/protocol-demonstration|protocol-demonstration\/)/;

function collectRuntimeFiles(root) {
  const files = [];

  for (const entry of readdirSync(root)) {
    const absolutePath = path.join(root, entry);
    const stat = statSync(absolutePath);

    if (stat.isDirectory()) {
      if (entry === 'node_modules' || entry === 'coverage' || entry === 'dist') continue;
      files.push(...collectRuntimeFiles(absolutePath));
      continue;
    }

    if (entry.endsWith('.js') || entry.endsWith('.mjs') || entry.endsWith('.cjs')) {
      files.push(absolutePath);
    }
  }

  return files;
}

test('@bitcode/protocol does not import the standalone protocol demonstration', async () => {
  const runtimeFiles = [path.join(packageRoot, 'server.js'), ...collectRuntimeFiles(path.join(packageRoot, 'src'))];
  const violations = runtimeFiles
    .filter((filePath) => importBoundaryPattern.test(readFileSync(filePath, 'utf8')))
    .map((filePath) => path.relative(packageRoot, filePath));

  assert.deepEqual(violations, []);
  const protocol = await import('../src/index.js');
  assert.equal(typeof protocol.createAppContext, 'function');
});

test('@bitcode/protocol witness bundle does not overwrite commercial route titles when embedded', () => {
  const appBundle = readFileSync(path.join(packageRoot, 'public', 'app.js'), 'utf8');

  assert.match(appBundle, /function shouldUpdateDocumentTitle\(\)/);
  assert.match(appBundle, /data-bitcode-demonstration-witness-host/);
  assert.match(appBundle, /if \(shouldUpdateDocumentTitle\(\)\) \{\s*document\.title =/);
});
