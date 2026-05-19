#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

const checks = [
  {
    file: 'BITCODE_SPEC_V28.md',
    needles: [
      'Gate 10: Read Request To Read-Need Comprehension',
      'ReadNeedComprehensionSynthesis',
      'request Read, synthesize a',
      'block Finding Fits until the Need',
    ],
  },
  {
    file: 'BITCODE_SPEC_V28_PARITY_MATRIX.md',
    needles: [
      'Read Request capture',
      'Read-Need synthesis, review, and resynthesis',
      'ReadNeedComprehensionSynthesis',
    ],
  },
  {
    file: 'packages/pipelines/asset-pack/src/read-need.ts',
    needles: [
      "schema: 'bitcode.read.request'",
      'export interface ReadNeedRequest',
      'previousReadNeed',
      'previousNeedId',
      'synthesizeReadNeedForPipelineInputWithInference',
      'admitReadFindingFits',
    ],
  },
  {
    file: 'packages/pipelines/asset-pack/src/reading-pipeline-contract.ts',
    needles: [
      'READ_NEED_COMPREHENSION_SYNTHESIS',
      'type PTRRAgentConfig',
      'listReadingPipelineTelemetryTrace',
      'factoryAgentWithPTRR',
      'thricifiedGenerationIds',
    ],
    forbidden: ['PptrAgentConfig', 'PtrrAgentConfig'],
  },
  {
    file: 'uapi/app/api/read-review/route.ts',
    needles: [
      'synthesize_read_need',
      'resynthesize_read_need',
      'accept_read_need',
      'readRequest: readNeed.request',
      'pipelineTrace: listReadingPipelineTelemetryTrace',
      'findingFitsAdmission',
    ],
  },
  {
    file: 'uapi/app/terminal/TerminalDepositReadWorkbench.tsx',
    needles: [
      'Synthesize Read-Need',
      'Resynthesize with feedback',
      'Accept Read-Need',
      'Request Fit',
      'previousReadNeed',
      'findingFitsAdmission',
    ],
  },
  {
    file: 'uapi/tests/api/readReviewRoute.test.ts',
    needles: [
      'resynthesizes a Read-Need with feedback',
      'pipelineTrace',
      'previousNeedId',
    ],
  },
  {
    file: 'packages/pipelines/asset-pack/src/__tests__/read-need.test.ts',
    needles: [
      'carries Read Request lineage and feedback through resynthesis',
      'bitcode.read.request',
    ],
  },
];

const failures = [];

for (const check of checks) {
  const absolute = path.join(repoRoot, check.file);
  if (!fs.existsSync(absolute)) {
    failures.push(`${check.file}: missing`);
    continue;
  }

  const text = fs.readFileSync(absolute, 'utf8');
  for (const needle of check.needles) {
    if (!text.includes(needle)) {
      failures.push(`${check.file}: missing "${needle}"`);
    }
  }
  for (const forbidden of check.forbidden || []) {
    if (text.includes(forbidden)) {
      failures.push(`${check.file}: forbidden "${forbidden}"`);
    }
  }
}

if (failures.length) {
  console.error('V28 Gate 10 Read-Need comprehension check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('V28 Gate 10 Read-Need comprehension check passed.');
