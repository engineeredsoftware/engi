import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname, '..');

function readRepoFile(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

test('V26 need-comprehension compatibility keeps canonical owners separate from task-named wrappers', () => {
  const canonicalToolTs = readRepoFile('packages/generic-tools/task-comprehension/src/AnalyzeNeedSemanticsTool.ts');
  const compatibilityToolTs = readRepoFile('packages/generic-tools/task-comprehension/src/AnalyzeTaskSemanticsTool.ts');
  const canonicalToolJs = readRepoFile('packages/generic-tools/task-comprehension/src/AnalyzeNeedSemanticsTool.js');
  const compatibilityToolJs = readRepoFile('packages/generic-tools/task-comprehension/src/AnalyzeTaskSemanticsTool.js');
  const canonicalPrimitivesTs = readRepoFile('packages/generic-tools/task-comprehension/src/need-comprehension-primitives.ts');
  const compatibilityPrimitivesTs = readRepoFile('packages/generic-tools/task-comprehension/src/primitives.ts');
  const canonicalPrimitivesJs = readRepoFile('packages/generic-tools/task-comprehension/src/need-comprehension-primitives.js');
  const compatibilityPrimitivesJs = readRepoFile('packages/generic-tools/task-comprehension/src/primitives.js');
  const canonicalSchemasTs = readRepoFile('packages/generic-tools/task-comprehension/src/need-comprehension-schemas.ts');
  const compatibilitySchemasTs = readRepoFile('packages/generic-tools/task-comprehension/src/schemas.ts');
  const canonicalSchemasJs = readRepoFile('packages/generic-tools/task-comprehension/src/need-comprehension-schemas.js');
  const compatibilitySchemasJs = readRepoFile('packages/generic-tools/task-comprehension/src/schemas.js');
  const indexTs = readRepoFile('packages/generic-tools/task-comprehension/src/index.ts');
  const indexJs = readRepoFile('packages/generic-tools/task-comprehension/src/index.js');

  assert.match(canonicalToolTs, /Canonical Bitcode need-semantics tool owner/u);
  assert.match(canonicalToolTs, /export class AnalyzeNeedSemanticsTool/u);
  assert.match(canonicalToolTs, /use = analyzeNeedSemantics/u);
  assert.match(compatibilityToolTs, /Compatibility wrapper for the former task-named tool owner/u);
  assert.match(compatibilityToolTs, /extends AnalyzeNeedSemanticsTool/u);
  assert.match(canonicalToolJs, /Canonical Bitcode need-semantics tool owner/u);
  assert.match(compatibilityToolJs, /Compatibility wrapper for the former task-named tool owner/u);

  assert.match(canonicalPrimitivesTs, /export async function analyzeNeedSemantics/u);
  assert.match(canonicalPrimitivesTs, /export async function extractNeedRequirements/u);
  assert.match(canonicalPrimitivesTs, /export async function identifyNeedConstraints/u);
  assert.match(canonicalPrimitivesTs, /export async function generateNeedSatisfactionCriteria/u);
  assert.match(canonicalPrimitivesTs, /export async function validateNeedComprehension/u);
  assert.match(canonicalPrimitivesTs, /export async function analyzeNeedSatisfactionImplementationComplexity/u);
  assert.match(compatibilityPrimitivesTs, /Compatibility wrapper around canonical need-first primitive owners/u);
  assert.match(compatibilityPrimitivesTs, /analyzeNeedSemantics as analyzeTaskSemantics/u);
  assert.match(canonicalPrimitivesJs, /exports\.analyzeNeedSemantics = analyzeNeedSemantics/u);
  assert.match(compatibilityPrimitivesJs, /Compatibility wrapper around canonical need-first primitive owners/u);
  assert.match(compatibilityPrimitivesJs, /analyzeNeedSemantics/u);

  assert.match(canonicalSchemasTs, /NeedComprehensionCompatibilityPrimaryTypeSchema/u);
  assert.match(canonicalSchemasTs, /NeedRequirementSchema/u);
  assert.match(canonicalSchemasTs, /NeedConstraintSchema/u);
  assert.match(canonicalSchemasTs, /NeedSatisfactionCriterionSchema/u);
  assert.match(compatibilitySchemasTs, /Compatibility wrapper around the canonical need-first schema owners/u);
  assert.match(compatibilitySchemasTs, /NeedComprehensionCompatibilityPrimaryTypeSchema as TaskTypeSchema/u);
  assert.match(canonicalSchemasJs, /exports\.NeedComprehensionCompatibilityPrimaryTypeSchema/u);
  assert.match(compatibilitySchemasJs, /Compatibility wrapper around the canonical need-first schema owners/u);

  assert.match(indexTs, /AnalyzeNeedSemanticsTool/u);
  assert.match(indexTs, /need-comprehension-primitives/u);
  assert.match(indexTs, /need-comprehension-schemas/u);
  assert.match(indexJs, /AnalyzeNeedSemanticsTool/u);
  assert.match(indexJs, /need-comprehension-primitives/u);
  assert.match(indexJs, /need-comprehension-schemas/u);
});
