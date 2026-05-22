#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildV32DeterministicReplayArtifactPackage } from './v32-deterministic-replay-artifacts.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const artifacts = buildV32DeterministicReplayArtifactPackage();

for (const [relativePath, content] of Object.entries(artifacts)) {
  const outputPath = path.join(repoRoot, relativePath);
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, content, 'utf8');
  process.stdout.write(`Generated ${relativePath}\n`);
}
