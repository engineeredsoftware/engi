#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const FIX = process.argv.slice(2).includes('--fix');

if (FIX) {
  process.stdout.write('Scanning and fixing case-mismatched imports vs filenames...\n');
} else {
  process.stdout.write('Scanning for case-mismatched imports vs filenames...\n');
}

const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx']);
const sourceFiles = execFileSync('git', ['ls-files'], { encoding: 'utf8' })
  .split(/\r?\n/u)
  .filter(Boolean)
  .filter((file) => sourceExtensions.has(path.posix.extname(file)));

const fileMap = new Map();
for (const file of sourceFiles) {
  fileMap.set(file.toLowerCase(), file);
}

function stripJsonc(value) {
  return value
    .split(/\r?\n/u)
    .filter((line) => !line.trim().startsWith('//'))
    .join('\n')
    .replace(/,\s*([}\]])/gu, '$1');
}

function readTsPaths() {
  if (!existsSync('tsconfig.json')) return new Map();

  try {
    const config = JSON.parse(stripJsonc(readFileSync('tsconfig.json', 'utf8')));
    const paths = config?.compilerOptions?.paths || {};
    const result = new Map();
    for (const [key, values] of Object.entries(paths)) {
      if (Array.isArray(values) && typeof values[0] === 'string') {
        result.set(key, values[0]);
      }
    }
    return result;
  } catch {
    return new Map();
  }
}

const tsPaths = readTsPaths();

function resolveTsPath(spec) {
  if (!spec) return null;
  if (tsPaths.has(spec)) return tsPaths.get(spec);

  for (const [key, target] of tsPaths.entries()) {
    if (!key.includes('*')) continue;
    const prefix = key.slice(0, key.indexOf('*'));
    if (spec.startsWith(prefix)) {
      const rest = spec.slice(prefix.length);
      const base = target.slice(0, target.indexOf('*'));
      return `${base}${rest}`;
    }
  }

  return null;
}

function normalizeGitPath(file) {
  return path.posix.normalize(file).replace(/^\.\//u, '');
}

function findMatch(candidateBase) {
  const normalizedBase = normalizeGitPath(candidateBase);
  for (const ext of ['.ts', '.tsx', '.js', '.jsx', '']) {
    const direct = normalizeGitPath(`${normalizedBase}${ext}`);
    const actualDirect = fileMap.get(direct.toLowerCase());
    if (actualDirect) return { actual: actualDirect, ext, indexed: false };

    const indexed = normalizeGitPath(`${normalizedBase}/index${ext}`);
    const actualIndexed = fileMap.get(indexed.toLowerCase());
    if (actualIndexed) return { actual: actualIndexed, ext, indexed: true };
  }
  return null;
}

function importSpecFromMatch(sourceFile, matchResult) {
  const target = targetPathFromMatch(matchResult);

  let relative = path.posix.relative(path.posix.dirname(sourceFile), target);
  if (!relative.startsWith('.')) relative = `./${relative}`;
  return relative;
}

function targetPathFromMatch(matchResult) {
  const { actual, ext, indexed } = matchResult;
  let target = indexed ? path.posix.dirname(actual) : actual;
  if (!indexed && ext) target = target.slice(0, -ext.length);
  return target;
}

function bitcodeAliasFromMatch(pkg, matchResult) {
  const root = `packages/${pkg}/src`;
  const target = targetPathFromMatch(matchResult);
  const suffix = path.posix.relative(root, target);

  if (suffix === '.' || suffix === '') return `@bitcode/${pkg}`;
  return `@bitcode/${pkg}/${suffix}`;
}

function rewriteImportSpec(source, from, to) {
  return source
    .split(`from '${from}'`).join(`from '${to}'`)
    .split(`from "${from}"`).join(`from "${to}"`)
    .split(`import('${from}')`).join(`import('${to}')`)
    .split(`import("${from}")`).join(`import("${to}")`);
}

const importPattern = /(?:from\s+['"]([^'"]+)['"])|(?:import\s*\(\s*['"]([^'"]+)['"]\s*\))/gu;
let mismatch = false;

for (const sourceFile of sourceFiles) {
  const content = readFileSync(sourceFile, 'utf8');
  if (!content.includes('from ') && !content.includes('import(')) continue;

  const imports = new Set();
  let match;
  while ((match = importPattern.exec(content)) !== null) {
    imports.add(match[1] || match[2]);
  }
  if (imports.size === 0) continue;

  let nextContent = content;
  for (const spec of imports) {
    if (spec.startsWith('./') || spec.startsWith('../')) {
      const resolved = findMatch(path.posix.join(path.posix.dirname(sourceFile), spec));
      if (!resolved) continue;

      const importedTarget = normalizeGitPath(path.posix.join(path.posix.dirname(sourceFile), spec));
      if (importedTarget === targetPathFromMatch(resolved)) continue;

      const wanted = importSpecFromMatch(sourceFile, resolved);
      if (spec !== wanted) {
        process.stdout.write(`Case mismatch in ${sourceFile}: '${spec}' -> '${wanted}' (actual '${resolved.actual}')\n`);
        mismatch = true;
        if (FIX) nextContent = rewriteImportSpec(nextContent, spec, wanted);
      }
      continue;
    }

    if (resolveTsPath(spec)) continue;

    const aliasMatch = spec.match(/^@bitcode\/([^/]+)(\/.*)?$/u);
    if (aliasMatch) {
      const pkg = aliasMatch[1];
      const rest = aliasMatch[2] || '';
      const resolved = findMatch(`packages/${pkg}/src${rest}`);
      if (!resolved) continue;

      const importedTarget = normalizeGitPath(`packages/${pkg}/src${rest}`);
      if (importedTarget === targetPathFromMatch(resolved)) continue;

      const wanted = bitcodeAliasFromMatch(pkg, resolved);
      if (spec !== wanted) {
        process.stdout.write(`Alias case mismatch in ${sourceFile}: '${spec}' -> '${wanted}' (actual '${resolved.actual}')\n`);
        mismatch = true;
        if (FIX) nextContent = rewriteImportSpec(nextContent, spec, wanted);
      }
    }
  }

  if (FIX && nextContent !== content) {
    writeFileSync(sourceFile, nextContent);
  }
}

if (!mismatch) {
  process.stdout.write(FIX ? 'No mismatches found to fix.\n' : 'No case-mismatched imports found.\n');
} else if (FIX) {
  process.stdout.write('Applied fixes for mismatched imports. Review diffs and commit.\n');
} else {
  process.stdout.write('Review the above mismatches or rerun with --fix.\n');
  process.exitCode = 1;
}
