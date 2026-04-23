import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const promptSurfaceSource = readFileSync(new URL('../V26_PROMPT_SURFACES.md', import.meta.url), 'utf8');
const inferenceSystemsSource = readFileSync(new URL('../V26_INFERENCE_SYSTEMS.md', import.meta.url), 'utf8');
const uapiTsconfigSource = readFileSync(new URL('../../uapi/tsconfig.json', import.meta.url), 'utf8');
const promptSpaceCompletenessProof = JSON.parse(
  readFileSync(new URL('../../.bitcode/prompt-space-completeness-proof.json', import.meta.url), 'utf8')
);

test('V26 prompt surface map keeps active, support, and reference corridors explicit', () => {
  assert.match(promptSurfaceSource, /## Public prompt contract/u);
  assert.match(promptSurfaceSource, /V26_INFERENCE_SYSTEMS\.md/u);
  assert.match(promptSurfaceSource, /need, prompt surface, tool contract, agentic role, execution carrier, asset-pack effect, and verification/u);
  assert.match(promptSurfaceSource, /## Active fifth-gate prompt consumers/u);
  assert.match(promptSurfaceSource, /## Support prompt consumers/u);
  assert.match(promptSurfaceSource, /## Reference-only or retained old-world prompt ports/u);

  assert.match(promptSurfaceSource, /packages\/execution-generics\/src\/prompts\/ExecutionPrompt\.ts/u);
  assert.match(promptSurfaceSource, /@bitcode\/execution-generics\/prompts\/ExecutionPrompt/u);
  assert.match(promptSurfaceSource, /packages\/pipelines-generics\/src\/prompts\/PipelinePrompt\.ts/u);
  assert.match(promptSurfaceSource, /packages\/agent-generics\/src\/\{prompts\/\*,execution\/prompt-overlays\.ts,substeps\/factories\.ts\}/u);
  assert.match(promptSurfaceSource, /packages\/\{agent-generics\/src\/execution\/\{AgentExecution\.ts,Agent\*Registry\.ts\},pipelines-generics\/src\/execution\/\{PipelineExecution\.ts,Pipeline\*Registry\.ts\},conversations-generics\/src\/agent\/ConversationAgent\.ts\}/u);
  assert.match(promptSurfaceSource, /packages\/\{agent-generics\/src\/\{agents\/factories\.ts,diagnostics\/\{trace\.ts,instrumentation\.ts\},execution\/file-diff-integration\.ts,substeps\/factories\.ts,types\.ts\},pipelines-generics\/src\/\{execution\/\{Metrics\.ts,pipeline-types\.ts,resume\.ts,route-pipeline-execution\.ts\},phases\/\{phase-factory\.ts,sdivs-factory\.ts\},pipeline-factory\.ts,gate-system\/\{meta-phase-orchestrator\.ts,types\.ts\},executors\/wait-for-instruction\.ts,streaming\/pipeline-stream-integration\.ts\}\}/u);
  assert.match(promptSurfaceSource, /packages\/conversations-generics\/src\/\{prompts\/ConversationSystemPrompt\.ts,agent\/ConversationAgent\.ts\}/u);
  assert.match(promptSurfaceSource, /uapi\/prompts\/conversations-system-prompt\.ts/u);
  assert.match(promptSurfaceSource, /packages\/\{doc-comment,doc-code\}\/\*/u);
  assert.match(promptSurfaceSource, /packages\/tools-generics\/src\/doc-code-tool\/\*/u);
  assert.match(promptSurfaceSource, /Prompt repair and migration scripts/u);
  assert.match(promptSurfaceSource, /scripts\/\{fix-remaining-imports,fix-barrel-imports,fix-multiline-imports,fix-corrupted-imports\}\.sh/u);
  assert.match(promptSurfaceSource, /public `@bitcode\/prompts` and `raw_promptparts` boundaries/u);
  assert.match(promptSurfaceSource, /Prompt generation and update scripts/u);
  assert.match(promptSurfaceSource, /scripts\/\{generate-massive-prompt-parts,mass-update-prompt-parts,architecture-review\}\.ts/u);
  assert.match(promptSurfaceSource, /public `@bitcode\/prompts\/raw_promptparts\/\*` package subpaths/u);
  assert.match(promptSurfaceSource, /canonical V26 inference records/u);
  assert.match(promptSurfaceSource, /doc-comment\/tool-prompt injection bridge/u);
  assert.match(promptSurfaceSource, /Obsolete one-off prompt migration scripts/u);
  assert.match(promptSurfaceSource, /_legacy\/old-world-prompt-migration-scripts\/README\.md/u);
  assert.match(promptSurfaceSource, /not an active prompt-system owner/u);

  assert.match(promptSurfaceSource, /packages\/generic-agents\/\*/u);
  assert.match(promptSurfaceSource, /packages\/generic-tools\/\*/u);
  assert.match(promptSurfaceSource, /`task-comprehension` is now a compatibility package/u);
  assert.match(promptSurfaceSource, /need-comprehension, written-asset, asset-pack, and shipping-wrapper analysis/u);
  assert.match(promptSurfaceSource, /protocol-demonstration\/V26_DOC_COMMENT_REFORM\.md/u);
  assert.match(promptSurfaceSource, /prefer `@bitcode\/prompts\/prompt` and `@bitcode\/prompts\/parts\/PromptPart`/u);
  assert.match(promptSurfaceSource, /prefer `@bitcode\/execution-generics\/Execution` and `@bitcode\/execution-generics\/prompts\/ExecutionPrompt`/u);
  assert.match(promptSurfaceSource, /broader active execution-bearing runtime carriers/u);
  assert.match(promptSurfaceSource, /retained reference test\/build configs should use exact public prompt subpath maps/u);
  assert.match(promptSurfaceSource, /Jira remains reader-first need-ingestion\/reference posture/u);
  assert.match(promptSurfaceSource, /Runtime JavaScript PromptPart carry-through must match the TypeScript content/u);
  assert.match(promptSurfaceSource, /retained deliverable substep PromptParts carrying Bitcode need \/ written-asset \/ asset-pack \/ proof \/ delivery-wrapper semantics/u);
  assert.match(promptSurfaceSource, /broad prompt normalization must be idempotent/u);
  assert.match(promptSurfaceSource, /runtime `\.js` PromptPart strings must synchronize from canonical `\.ts` PromptPart source/u);
  assert.match(promptSurfaceSource, /doc-comment metadata must also be Bitcode-native/u);
  assert.match(promptSurfaceSource, /`current_version` cannot preserve GA1 lineage/u);
  assert.match(promptSurfaceSource, /every retained deliverable substep `intent` must name the need-first written-asset \/ asset-pack \/ proof \/ delivery-wrapper role/u);
  assert.match(promptSurfaceSource, /whole retained deliverable-family raw PromptPart corpus/u);
  assert.match(promptSurfaceSource, /agent, phase, pipeline, tool, setup, discovery, implementation, validation, and shipping PromptParts/u);
  assert.match(promptSurfaceSource, /doc-comment `intent` and `current_version` metadata must describe Bitcode need-first written-asset \/ asset-pack execution/u);
  assert.match(promptSurfaceSource, /fifth-gate prompt baseline proves/u);
  assert.match(promptSurfaceSource, /final prompt-space completeness remains an eighth-gate closure obligation/u);
  assert.match(promptSurfaceSource, /baselinePassed/u);
  assert.match(promptSurfaceSource, /\.bitcode\/prompt-space-completeness-proof\.json/u);
  assert.match(promptSurfaceSource, /\.bitcode\/inference-implementation-records-proof\.json/u);
  assert.match(promptSurfaceSource, /protocol-demonstration\/src\/canonical\/inference-implementation-records\.js/u);
  assert.match(promptSurfaceSource, /protocol-demonstration\/test\/v26-inference-implementation-records\.test\.js/u);
});

test('V26 inference systems spec binds prompts, tools, agents, and executions together', () => {
  assert.match(inferenceSystemsSource, /No prompt, tool, agent, phase, pipeline, MCP operation, or execution carrier/u);
  assert.match(inferenceSystemsSource, /Need \| Name the Bitcode need/u);
  assert.match(inferenceSystemsSource, /Prompt ownership \| Identify the exact prompt class/u);
  assert.match(inferenceSystemsSource, /Tool ownership \| Identify callable tools/u);
  assert.match(inferenceSystemsSource, /Agent ownership \| Identify agent role/u);
  assert.match(inferenceSystemsSource, /Execution ownership \| Identify where runtime state is stored/u);
  assert.match(inferenceSystemsSource, /`packages\/generic-tools\/task-comprehension\/\*`/u);
  assert.match(inferenceSystemsSource, /retained compatibility tool reservoir now specified as Bitcode need-comprehension/u);
  assert.match(inferenceSystemsSource, /## Inference Implementation Record/u);
  assert.match(inferenceSystemsSource, /protocol-demonstration\/src\/canonical\/inference-implementation-records\.js/u);
  assert.match(inferenceSystemsSource, /\.bitcode\/inference-implementation-records-proof\.json/u);
  assert.match(inferenceSystemsSource, /recordId/u);
  assert.match(inferenceSystemsSource, /canonicalNeed/u);
  assert.match(inferenceSystemsSource, /promptImplementation/u);
  assert.match(inferenceSystemsSource, /toolImplementation/u);
  assert.match(inferenceSystemsSource, /agentImplementation/u);
  assert.match(inferenceSystemsSource, /executionImplementation/u);
  assert.match(inferenceSystemsSource, /assetPackImplementation/u);
  assert.match(inferenceSystemsSource, /## Complete Coverage Ledger/u);
  assert.match(inferenceSystemsSource, /Prompt primitives \| `PromptPart`, `Prompt`, `PromptExecution`/u);
  assert.match(inferenceSystemsSource, /Tool prompt infrastructure \| `DocCodeToolPrompt`/u);
  assert.match(inferenceSystemsSource, /Agent infrastructure \| `AgentPrompt`, `AgentStepPrompt`/u);
  assert.match(inferenceSystemsSource, /Pipeline infrastructure \| `PipelinePrompt`/u);
  assert.match(inferenceSystemsSource, /Conversation inference \| `ConversationSystemPrompt`/u);
  assert.match(inferenceSystemsSource, /Need-comprehension compatibility/u);
  assert.match(inferenceSystemsSource, /package-local no-emit typecheck/u);
  assert.match(inferenceSystemsSource, /## Prompt-Space Witness Baseline/u);
  assert.match(inferenceSystemsSource, /application conversation prompt binding and admitted Bitcode MCP prompt\/tool ingress/u);
  assert.match(inferenceSystemsSource, /`passed: true` is not allowed until eighth-gate prompt-space saturation/u);
  assert.match(inferenceSystemsSource, /runtime and proof evidence can be regenerated from source/u);
});

test('V26 active app config no longer preserves deprecated prompt source aliases', () => {
  assert.doesNotMatch(uapiTsconfigSource, /"@bitcode\/prompts\/src\/\*"/u);
  assert.doesNotMatch(uapiTsconfigSource, /"@bitcode\/prompts\/src\/raw_promptparts\/\*"/u);
  assert.match(uapiTsconfigSource, /"@bitcode\/prompts": \["\.\.\/packages\/prompts\/src\/index\.ts"\]/u);
  assert.match(uapiTsconfigSource, /"@bitcode\/prompts\/\*": \["\.\.\/packages\/prompts\/src\/\*"\]/u);
});

test('V26 prompt-space proof proves the fifth-gate baseline without claiming eighth-gate closure', () => {
  assert.equal(promptSpaceCompletenessProof.reportId, 'v26-prompt-space-completeness-proof');
  assert.equal(promptSpaceCompletenessProof.baselinePassed, true);
  assert.equal(promptSpaceCompletenessProof.witnessFamilyComplete, true);
  assert.equal(promptSpaceCompletenessProof.passed, false);
  assert.equal(promptSpaceCompletenessProof.closureGate, 'eighth-gate');
  assert.deepEqual(
    promptSpaceCompletenessProof.checks.map((check) => check.promptSpaceRole),
    [
      'primitive-contract',
      'active-inference-carriers',
      'tool-prompt-injection',
      'asset-pack-need-comprehension',
      'raw-promptpart-carry-through',
      'app-mcp-ingress',
      'proof-and-specification'
    ]
  );
  assert.deepEqual(
    promptSpaceCompletenessProof.checks.filter((check) => check.passed !== true),
    []
  );
  assert.match(
    promptSpaceCompletenessProof.openReason,
    /without claiming final prompt-space saturation/u
  );
});
