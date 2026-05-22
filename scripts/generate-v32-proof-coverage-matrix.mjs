#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  V32_PROOF_COVERAGE_MATRIX_ARTIFACT,
  buildV32ProofCoverageMatrix,
  stableStringify
} from './v32-proof-coverage-matrix.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const outputPath = path.join(repoRoot, V32_PROOF_COVERAGE_MATRIX_ARTIFACT);

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, stableStringify(buildV32ProofCoverageMatrix()), 'utf8');
process.stdout.write(`Generated ${V32_PROOF_COVERAGE_MATRIX_ARTIFACT}\n`);
