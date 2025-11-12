#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

async function loadFormatter() {
  const mod = await import(path.join(repoRoot, 'packages', 'prompts', 'src', 'formatters', 'hierarchical.ts'));
  return mod.hierarchicalFormatter;
}

function listDeliverablesPromptFiles() {
  const dir = path.join(repoRoot, 'packages', 'pipelines', 'deliverable', 'src', 'agents', 'prompts');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.ts')).map(f => path.join(dir, f));
}

function listGenericAgentsPromptFiles() {
  const base = path.join(repoRoot, 'packages', 'generic-agents');
  if (!fs.existsSync(base)) return [];
  const out = [];
  for (const name of fs.readdirSync(base)) {
    const dir = path.join(base, name, 'src', 'prompts');
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) if (f.endsWith('.ts')) out.push(path.join(dir, f));
  }
  return out;
}

function listGenericToolsPromptFiles() {
  const base = path.join(repoRoot, 'packages', 'generic-tools');
  if (!fs.existsSync(base)) return [];
  const out = [];
  for (const name of fs.readdirSync(base)) {
    const dir = path.join(base, name, 'src', 'prompts');
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) if (f.endsWith('.ts')) out.push(path.join(dir, f));
  }
  return out;
}

function listPromptFiles(scope) {
  if (scope === 'deliverables') return listDeliverablesPromptFiles();
  if (scope === 'generic-agents') return listGenericAgentsPromptFiles();
  if (scope === 'generic-tools') return listGenericToolsPromptFiles();
  return [
    ...listDeliverablesPromptFiles(),
    ...listGenericAgentsPromptFiles(),
    ...listGenericToolsPromptFiles(),
  ];
}

async function render() {
  const arg = process.argv.find(a => a.startsWith('--scope='));
  const scope = (arg ? arg.split('=')[1] : 'deliverables');
  const outName = scope === 'all' ? 'prompts-rendered.all.md' : scope === 'generic-agents' ? 'prompts-rendered.generic-agents.md' : scope === 'generic-tools' ? 'prompts-rendered.generic-tools.md' : 'prompts-rendered.md';
  const outPath = path.join(repoRoot, 'reports', outName);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const lines = [];
  lines.push(`# Rendered Prompts (${scope})`);
  lines.push('');
  const formatter = await loadFormatter();
  const files = listPromptFiles(scope);
  const unique = new Set(files);
  for (const fp of unique) {
    const mod = await import(fp);
    const expNames = Object.keys(mod);
    const factories = expNames.filter(k => /^create.*Prompt$/.test(k));
    const stepsObjs = expNames.filter(k => /PromptSteps$/.test(k));

    if (factories.length === 0 && stepsObjs.length === 0) continue;

    lines.push(`## ${path.basename(fp)}`);
    for (const k of factories) {
      try {
        const p = mod[k]();
        const s = p.format(formatter);
        lines.push(`### ${k}`);
        lines.push('```');
        lines.push(s);
        lines.push('```');
      } catch (e) {
        lines.push(`### ${k} (ERROR)`);
        lines.push('```');
        lines.push(String(e?.stack || e));
        lines.push('```');
      }
    }
    for (const k of stepsObjs) {
      const steps = mod[k];
      for (const step of ['plan', 'try', 'refine', 'retry']) {
        if (typeof steps?.[step] === 'function') {
          try {
            const p = steps[step]();
            const s = p.format(formatter);
            lines.push(`### ${k}.${step}`);
            lines.push('```');
            lines.push(s);
            lines.push('```');
          } catch (e) {
            lines.push(`### ${k}.${step} (ERROR)`);
            lines.push('```');
            lines.push(String(e?.stack || e));
            lines.push('```');
          }
        }
      }
    }
    lines.push('');
  }
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log('Wrote', outPath);
}

render().catch(e => { console.error(e); process.exit(1); });
