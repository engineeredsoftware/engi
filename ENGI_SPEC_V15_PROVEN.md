# ENGI Spec V15 Proven

- canonicalVersion: `V15`
- canonicalCommit: `1d851da022d8e3fb46cd8ff0893a9d8edd5e49d1`
- canonicalCommitRecordedAt: `2026-04-06T07:24:58-07:00`
- worktreeState: `dirty-preview`
- generatorId: `engi-demo.proven-generator.v1`
- generatedAt: `2026-04-06T07:24:58-07:00`
- outputPath: `ENGI_SPEC_V15_PROVEN.md`
- scenarioIds: `auth-issuer-rollback`, `rust-validator-proof-gap`, `config-policy-precedence-incident`, `unsafe-patch-review-recovery`, `infra-deployment-mismatch`, `privacy-boundary-proof-export`, `polyglot-gateway-benchmark-remediation`, `auth-many-asset-normalization`
- branchModes: `patch`, `context`

## Aggregate Verdict

- fullyProven: `true`
- runCount: `16`
- familyCount: `9`
- theoremCount: `57`
- memberCount: `45`
- artifactDigestCount: `688`

## Proof Family Inventory

| proofFamily | proofArtifactPath | memberCount | theoremCount | witnessArtifactCount | replayArtifactCount | replayStepCount |
| --- | --- | --- | --- | --- | --- | --- |
| `inference-synthesis` | `.engi/inference-synthesis-proof.json` | 5 | 6 | 6 | 7 | 3 |
| `prompt-completeness` | `.engi/prompt-completeness-proof.json` | 5 | 8 | 5 | 5 | 4 |
| `static-code-analysis` | `.engi/static-measurement-proof.json` | 4 | 5 | 3 | 5 | 3 |
| `verification-decisions` | `.engi/verification-decisions-proof.json` | 5 | 7 | 3 | 3 | 2 |
| `selection-and-materialization` | `.engi/selection-and-materialization-proof.json` | 5 | 7 | 7 | 7 | 2 |
| `authorization-and-sensitive-flow` | `.engi/authorization-and-sensitive-flow-proof.json` | 5 | 6 | 6 | 6 | 2 |
| `settlement-source-to-shares` | `.engi/settlement-source-to-shares-proof.json` | 7 | 7 | 7 | 7 | 2 |
| `disclosure-boundary` | `.engi/disclosure-boundary-proof.json` | 4 | 5 | 5 | 5 | 2 |
| `proof-contract` | `.engi/proof-contract.json` | 5 | 6 | 3 | 3 | 3 |

## Family Details

### inference-synthesis

- proofArtifactPath: `.engi/inference-synthesis-proof.json`
- witnessArtifactPaths: `.engi/inference-moment-contracts.json`, `.engi/inference-proofs.json`, `.engi/prompt-implementation-surface.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/inference-synthesis-proof.json`
- replayArtifacts: `.engi/inference-moment-contracts.json`, `.engi/inference-proofs.json`, `.engi/prompt-implementation-surface.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/eval-manifest.json`, `.engi/inference-synthesis-proof.json`
- replayStepIds: `inference-synthesis.coverage-reconciliation`, `inference-synthesis.evaluator-status-replay`, `inference-synthesis.evidence-basis-replay`

#### Members

| memberId | passedRuns | totalRuns | fieldShape | failingRuns |
| --- | --- | --- | --- | --- |
| `task` | 16 | 16 | `evaluatorStatusTruthful`, `evidenceBasisClosed`, `field`, `fieldProofPresent`, `momentContractPresent`, `parsedEnvelopePresent`, `passed`, `promptSurfacePresent` | `none` |
| `failureModes` | 16 | 16 | `evaluatorStatusTruthful`, `evidenceBasisClosed`, `field`, `fieldProofPresent`, `momentContractPresent`, `parsedEnvelopePresent`, `passed`, `promptSurfacePresent` | `none` |
| `constraints` | 16 | 16 | `evaluatorStatusTruthful`, `evidenceBasisClosed`, `field`, `fieldProofPresent`, `momentContractPresent`, `parsedEnvelopePresent`, `passed`, `promptSurfacePresent` | `none` |
| `targetArtifactKinds` | 16 | 16 | `evaluatorStatusTruthful`, `evidenceBasisClosed`, `field`, `fieldProofPresent`, `momentContractPresent`, `parsedEnvelopePresent`, `passed`, `promptSurfacePresent` | `none` |
| `closureCriteria` | 16 | 16 | `evaluatorStatusTruthful`, `evidenceBasisClosed`, `field`, `fieldProofPresent`, `momentContractPresent`, `parsedEnvelopePresent`, `passed`, `promptSurfacePresent` | `none` |

#### Theorems

| theoremId | passedRuns | totalRuns | replayStepIds | failureReasons | failingRuns |
| --- | --- | --- | --- | --- | --- |
| `inference_synthesis.coverage_totality` | 16 | 16 | `inference-synthesis.coverage-reconciliation` | `none` | `none` |
| `inference_synthesis.evaluator_status_truth` | 16 | 16 | `inference-synthesis.evaluator-status-replay` | `none` | `none` |
| `inference_synthesis.evidence_basis_closure` | 16 | 16 | `inference-synthesis.evidence-basis-replay` | `none` | `none` |
| `inference_synthesis.ownership_traceability_closure` | 16 | 16 | `inference-synthesis.evidence-basis-replay` | `none` | `none` |
| `inference_synthesis.witness_materialization_closure` | 16 | 16 | `inference-synthesis.coverage-reconciliation`, `inference-synthesis.evaluator-status-replay`, `inference-synthesis.evidence-basis-replay` | `none` | `none` |
| `inference_synthesis.replay_closure` | 16 | 16 | `inference-synthesis.coverage-reconciliation`, `inference-synthesis.evaluator-status-replay`, `inference-synthesis.evidence-basis-replay` | `none` | `none` |

#### Replay Steps

| stepId | theoremIds | requiredArtifactPaths |
| --- | --- | --- |
| `inference-synthesis.coverage-reconciliation` | `inference_synthesis.coverage_totality` | `.engi/inference-moment-contracts.json`, `.engi/inference-proofs.json`, `.engi/inference-synthesis-proof.json`, `.engi/prompt-surfaces.json` |
| `inference-synthesis.evaluator-status-replay` | `inference_synthesis.evaluator_status_truth` | `.engi/inference-moment-contracts.json`, `.engi/inference-proofs.json`, `.engi/prompt-surfaces.json`, `.engi/eval-manifest.json` |
| `inference-synthesis.evidence-basis-replay` | `inference_synthesis.evidence_basis_closure`, `inference_synthesis.ownership_traceability_closure` | `.engi/inference-moment-contracts.json`, `.engi/inference-proofs.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/inference-synthesis-proof.json` |

### prompt-completeness

- proofArtifactPath: `.engi/prompt-completeness-proof.json`
- witnessArtifactPaths: `.engi/prompt-family-registry.json`, `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/prompt-completeness-proof.json`
- replayArtifacts: `.engi/prompt-family-registry.json`, `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json`, `.engi/parsed-completion-envelopes.json`, `.engi/prompt-completeness-proof.json`
- replayStepIds: `prompt-completeness.member-set-reconciliation`, `prompt-completeness.parse-admissibility`, `prompt-completeness.consumer-closure`, `prompt-completeness.provenance-truth`

#### Members

| memberId | passedRuns | totalRuns | fieldShape | failingRuns |
| --- | --- | --- | --- | --- |
| `task` | 16 | 16 | `classified`, `contractComplete`, `downstreamConsumersClosed`, `explicitlyExcluded`, `field`, `inDeclaredFamilyRegistry`, `parsedEnvelopeAdmissible`, `passed`, `provenanceAnnotationsTruthful`, `registered` | `none` |
| `failureModes` | 16 | 16 | `classified`, `contractComplete`, `downstreamConsumersClosed`, `explicitlyExcluded`, `field`, `inDeclaredFamilyRegistry`, `parsedEnvelopeAdmissible`, `passed`, `provenanceAnnotationsTruthful`, `registered` | `none` |
| `constraints` | 16 | 16 | `classified`, `contractComplete`, `downstreamConsumersClosed`, `explicitlyExcluded`, `field`, `inDeclaredFamilyRegistry`, `parsedEnvelopeAdmissible`, `passed`, `provenanceAnnotationsTruthful`, `registered` | `none` |
| `targetArtifactKinds` | 16 | 16 | `classified`, `contractComplete`, `downstreamConsumersClosed`, `explicitlyExcluded`, `field`, `inDeclaredFamilyRegistry`, `parsedEnvelopeAdmissible`, `passed`, `provenanceAnnotationsTruthful`, `registered` | `none` |
| `closureCriteria` | 16 | 16 | `classified`, `contractComplete`, `downstreamConsumersClosed`, `explicitlyExcluded`, `field`, `inDeclaredFamilyRegistry`, `parsedEnvelopeAdmissible`, `passed`, `provenanceAnnotationsTruthful`, `registered` | `none` |

#### Theorems

| theoremId | passedRuns | totalRuns | replayStepIds | failureReasons | failingRuns |
| --- | --- | --- | --- | --- | --- |
| `prompt_completeness.coverage_totality` | 16 | 16 | `prompt-completeness.member-set-reconciliation` | `none` | `none` |
| `prompt_completeness.no_ghost_coverage` | 16 | 16 | `prompt-completeness.member-set-reconciliation` | `none` | `none` |
| `prompt_completeness.explicit_exclusion_closure` | 16 | 16 | `prompt-completeness.member-set-reconciliation` | `none` | `none` |
| `prompt_completeness.contract_closure` | 16 | 16 | `prompt-completeness.parse-admissibility` | `none` | `none` |
| `prompt_completeness.parsed_envelope_admissibility` | 16 | 16 | `prompt-completeness.parse-admissibility` | `none` | `none` |
| `prompt_completeness.downstream_consumer_closure` | 16 | 16 | `prompt-completeness.consumer-closure` | `none` | `none` |
| `prompt_completeness.provenance_truth` | 16 | 16 | `prompt-completeness.provenance-truth` | `none` | `none` |
| `prompt_completeness.witness_replay_closure` | 16 | 16 | `prompt-completeness.member-set-reconciliation`, `prompt-completeness.parse-admissibility`, `prompt-completeness.consumer-closure`, `prompt-completeness.provenance-truth` | `none` | `none` |

#### Replay Steps

| stepId | theoremIds | requiredArtifactPaths |
| --- | --- | --- |
| `prompt-completeness.member-set-reconciliation` | `prompt_completeness.coverage_totality`, `prompt_completeness.no_ghost_coverage`, `prompt_completeness.explicit_exclusion_closure` | `.engi/prompt-family-registry.json`, `.engi/prompt-contracts.json`, `.engi/prompt-surfaces.json` |
| `prompt-completeness.parse-admissibility` | `prompt_completeness.contract_closure`, `prompt_completeness.parsed_envelope_admissibility` | `.engi/prompt-contracts.json`, `.engi/parsed-completion-envelopes.json` |
| `prompt-completeness.consumer-closure` | `prompt_completeness.downstream_consumer_closure` | `.engi/prompt-surfaces.json` |
| `prompt-completeness.provenance-truth` | `prompt_completeness.provenance_truth` | `.engi/prompt-surfaces.json`, `.engi/prompt-contracts.json` |

### static-code-analysis

- proofArtifactPath: `.engi/static-measurement-proof.json`
- witnessArtifactPaths: `.engi/code-analysis-fact-registry.json`, `.engi/static-measurement-report.json`, `.engi/static-measurement-proof.json`
- replayArtifacts: `.engi/code-analysis-fact-registry.json`, `.engi/static-heuristics-registry.json`, `.engi/measurement-receipts.json`, `.engi/static-measurement-report.json`, `.engi/static-measurement-proof.json`
- replayStepIds: `static-code-analysis.stage-domain`, `static-code-analysis.stage-mapping`, `static-code-analysis.receipt-report-proof`

#### Members

| memberId | passedRuns | totalRuns | fieldShape | failingRuns |
| --- | --- | --- | --- | --- |
| `deterministic-parser` | 16 | 16 | `memberId`, `passed`, `stageIds` | `none` |
| `repo-context` | 16 | 16 | `memberId`, `passed`, `stageIds` | `none` |
| `content-unit` | 16 | 16 | `memberId`, `passed`, `stageIds` | `none` |
| `measurement-stages` | 16 | 16 | `memberId`, `passed`, `stageIds` | `none` |

#### Theorems

| theoremId | passedRuns | totalRuns | replayStepIds | failureReasons | failingRuns |
| --- | --- | --- | --- | --- | --- |
| `static_code_analysis.stage_domain_purity` | 16 | 16 | `static-code-analysis.stage-domain` | `none` | `none` |
| `static_code_analysis.abstract_to_concrete_stage_mapping` | 16 | 16 | `static-code-analysis.stage-mapping` | `none` | `none` |
| `static_code_analysis.registry_role_closure` | 16 | 16 | `static-code-analysis.stage-mapping` | `none` | `none` |
| `static_code_analysis.receipt_report_proof_agreement` | 16 | 16 | `static-code-analysis.receipt-report-proof` | `none` | `none` |
| `static_code_analysis.witness_replay_closure` | 16 | 16 | `static-code-analysis.stage-domain`, `static-code-analysis.stage-mapping`, `static-code-analysis.receipt-report-proof` | `none` | `none` |

#### Replay Steps

| stepId | theoremIds | requiredArtifactPaths |
| --- | --- | --- |
| `static-code-analysis.stage-domain` | `static_code_analysis.stage_domain_purity` | `.engi/measurement-receipts.json`, `.engi/static-measurement-proof.json` |
| `static-code-analysis.stage-mapping` | `static_code_analysis.abstract_to_concrete_stage_mapping`, `static_code_analysis.registry_role_closure` | `.engi/measurement-receipts.json`, `.engi/code-analysis-fact-registry.json`, `.engi/static-heuristics-registry.json` |
| `static-code-analysis.receipt-report-proof` | `static_code_analysis.receipt_report_proof_agreement`, `static_code_analysis.witness_replay_closure` | `.engi/measurement-receipts.json`, `.engi/static-measurement-report.json`, `.engi/static-measurement-proof.json` |

### verification-decisions

- proofArtifactPath: `.engi/verification-decisions-proof.json`
- witnessArtifactPaths: `.engi/verification-report.json`, `.engi/verification-receipts.json`, `.engi/verification-decisions-proof.json`
- replayArtifacts: `.engi/verification-report.json`, `.engi/verification-receipts.json`, `.engi/verification-decisions-proof.json`
- replayStepIds: `verification-decisions.stage-mapping`, `verification-decisions.use-tier-consequence`

#### Members

| memberId | passedRuns | totalRuns | fieldShape | failingRuns |
| --- | --- | --- | --- | --- |
| `issuance` | 16 | 16 | `memberId`, `passed`, `stageIds` | `none` |
| `provenance` | 16 | 16 | `memberId`, `passed`, `stageIds` | `none` |
| `sufficiency` | 16 | 16 | `memberId`, `passed`, `stageIds` | `none` |
| `issuer-policy` | 16 | 16 | `memberId`, `passed`, `stageIds` | `none` |
| `use-tier-consequence` | 16 | 16 | `memberId`, `passed`, `stageIds` | `none` |

#### Theorems

| theoremId | passedRuns | totalRuns | replayStepIds | failureReasons | failingRuns |
| --- | --- | --- | --- | --- | --- |
| `verification_decisions.issuance_closure` | 16 | 16 | `verification-decisions.stage-mapping` | `none` | `none` |
| `verification_decisions.provenance_closure` | 16 | 16 | `verification-decisions.stage-mapping` | `none` | `none` |
| `verification_decisions.sufficiency_closure` | 16 | 16 | `verification-decisions.stage-mapping` | `none` | `none` |
| `verification_decisions.issuer_policy_closure` | 16 | 16 | `verification-decisions.stage-mapping` | `none` | `none` |
| `verification_decisions.use_tier_consequence_closure` | 16 | 16 | `verification-decisions.use-tier-consequence` | `none` | `none` |
| `verification_decisions.receipt_report_role_closure` | 16 | 16 | `verification-decisions.use-tier-consequence` | `none` | `none` |
| `verification_decisions.witness_replay_closure` | 16 | 16 | `verification-decisions.stage-mapping`, `verification-decisions.use-tier-consequence` | `none` | `none` |

#### Replay Steps

| stepId | theoremIds | requiredArtifactPaths |
| --- | --- | --- |
| `verification-decisions.stage-mapping` | `verification_decisions.issuance_closure`, `verification_decisions.provenance_closure`, `verification_decisions.sufficiency_closure`, `verification_decisions.issuer_policy_closure` | `.engi/verification-receipts.json`, `.engi/verification-report.json` |
| `verification-decisions.use-tier-consequence` | `verification_decisions.use_tier_consequence_closure`, `verification_decisions.receipt_report_role_closure` | `.engi/verification-receipts.json`, `.engi/verification-report.json`, `.engi/verification-decisions-proof.json` |

### selection-and-materialization

- proofArtifactPath: `.engi/selection-and-materialization-proof.json`
- witnessArtifactPaths: `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/materialization-exclusions.json`, `.engi/materialization-visibility-proof.json`, `.engi/selection-consistency-proof.json`, `.engi/materialization-proof.json`, `.engi/selection-and-materialization-proof.json`
- replayArtifacts: `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/materialization-exclusions.json`, `.engi/materialization-visibility-proof.json`, `.engi/selection-consistency-proof.json`, `.engi/materialization-proof.json`, `.engi/selection-and-materialization-proof.json`
- replayStepIds: `selection-and-materialization.selected-set`, `selection-and-materialization.visibility`

#### Members

| memberId | passedRuns | totalRuns | fieldShape | failingRuns |
| --- | --- | --- | --- | --- |
| `selected-assets` | 16 | 16 | `memberId`, `passed` | `none` |
| `locked-units` | 16 | 16 | `memberId`, `passed` | `none` |
| `materialized-source` | 16 | 16 | `memberId`, `passed` | `none` |
| `exclusions` | 16 | 16 | `memberId`, `passed` | `none` |
| `visibility-rules` | 16 | 16 | `memberId`, `passed` | `none` |

#### Theorems

| theoremId | passedRuns | totalRuns | replayStepIds | failureReasons | failingRuns |
| --- | --- | --- | --- | --- | --- |
| `selection_and_materialization.selected_asset_closure` | 16 | 16 | `selection-and-materialization.selected-set` | `none` | `none` |
| `selection_and_materialization.lock_closure` | 16 | 16 | `selection-and-materialization.selected-set` | `none` | `none` |
| `selection_and_materialization.materialized_source_closure` | 16 | 16 | `selection-and-materialization.selected-set` | `none` | `none` |
| `selection_and_materialization.exclusion_closure` | 16 | 16 | `selection-and-materialization.visibility` | `none` | `none` |
| `selection_and_materialization.visibility_closure` | 16 | 16 | `selection-and-materialization.visibility` | `none` | `none` |
| `selection_and_materialization.selection_consistency_closure` | 16 | 16 | `selection-and-materialization.selected-set` | `none` | `none` |
| `selection_and_materialization.materialization_proof_closure` | 16 | 16 | `selection-and-materialization.selected-set`, `selection-and-materialization.visibility` | `none` | `none` |

#### Replay Steps

| stepId | theoremIds | requiredArtifactPaths |
| --- | --- | --- |
| `selection-and-materialization.selected-set` | `selection_and_materialization.selected_asset_closure`, `selection_and_materialization.lock_closure`, `selection_and_materialization.materialized_source_closure`, `selection_and_materialization.selection_consistency_closure` | `.engi/asset-pack.lock.json`, `.engi/selected-source-material.json`, `.engi/selection-consistency-proof.json`, `.engi/materialization-proof.json` |
| `selection-and-materialization.visibility` | `selection_and_materialization.visibility_closure`, `selection_and_materialization.exclusion_closure` | `.engi/materialization-exclusions.json`, `.engi/materialization-visibility-proof.json` |

### authorization-and-sensitive-flow

- proofArtifactPath: `.engi/authorization-and-sensitive-flow-proof.json`
- witnessArtifactPaths: `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, `.engi/identity-authorization-proof.json`, `.engi/sensitive-data-flow-proof.json`, `.engi/authorization-and-sensitive-flow-proof.json`
- replayArtifacts: `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, `.engi/sensitive-data-flow.json`, `.engi/identity-authorization-proof.json`, `.engi/sensitive-data-flow-proof.json`, `.engi/authorization-and-sensitive-flow-proof.json`
- replayStepIds: `authorization-sensitive-flow.identity`, `authorization-sensitive-flow.flows`

#### Members

| memberId | passedRuns | totalRuns | fieldShape | failingRuns |
| --- | --- | --- | --- | --- |
| `principals` | 16 | 16 | `memberId`, `passed` | `none` |
| `authorization-decisions` | 16 | 16 | `memberId`, `passed` | `none` |
| `confidentiality-classes` | 16 | 16 | `memberId`, `passed` | `none` |
| `retention-disclosure-rules` | 16 | 16 | `memberId`, `passed` | `none` |
| `sensitive-data-flows` | 16 | 16 | `memberId`, `passed` | `none` |

#### Theorems

| theoremId | passedRuns | totalRuns | replayStepIds | failureReasons | failingRuns |
| --- | --- | --- | --- | --- | --- |
| `authorization_and_sensitive_flow.principal_authority_totality` | 16 | 16 | `authorization-sensitive-flow.identity` | `none` | `none` |
| `authorization_and_sensitive_flow.authorization_decision_closure` | 16 | 16 | `authorization-sensitive-flow.identity` | `none` | `none` |
| `authorization_and_sensitive_flow.classification_closure` | 16 | 16 | `authorization-sensitive-flow.sensitive-flow-replay` | `none` | `none` |
| `authorization_and_sensitive_flow.policy_assignment_closure` | 16 | 16 | `authorization-sensitive-flow.sensitive-flow-replay` | `none` | `none` |
| `authorization_and_sensitive_flow.no_unauthorized_public_flow` | 16 | 16 | `authorization-sensitive-flow.sensitive-flow-replay` | `none` | `none` |
| `authorization_and_sensitive_flow.witness_replay_closure` | 16 | 16 | `authorization-sensitive-flow.identity`, `authorization-sensitive-flow.flows` | `none` | `none` |

#### Replay Steps

| stepId | theoremIds | requiredArtifactPaths |
| --- | --- | --- |
| `authorization-sensitive-flow.identity` | `authorization_and_sensitive_flow.principal_authority_totality`, `authorization_and_sensitive_flow.authorization_decision_closure` | `.engi/identity-bindings.json`, `.engi/authorization-decisions.json`, `.engi/identity-authorization-proof.json` |
| `authorization-sensitive-flow.flows` | `authorization_and_sensitive_flow.classification_closure`, `authorization_and_sensitive_flow.policy_assignment_closure`, `authorization_and_sensitive_flow.no_unauthorized_public_flow` | `.engi/sensitive-data-flow.json`, `.engi/sensitive-data-flow-proof.json` |

### settlement-source-to-shares

- proofArtifactPath: `.engi/settlement-source-to-shares-proof.json`
- witnessArtifactPaths: `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json`, `.engi/journal-diff.json`, `.engi/journal-completeness-proof.json`, `.engi/settlement-proof.json`, `.engi/settlement-source-to-shares-proof.json`
- replayArtifacts: `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json`, `.engi/journal-diff.json`, `.engi/journal-completeness-proof.json`, `.engi/settlement-proof.json`, `.engi/settlement-source-to-shares-proof.json`
- replayStepIds: `settlement-source-to-shares.contribution-allocation`, `settlement-source-to-shares.journal-theorem`

#### Members

| memberId | passedRuns | totalRuns | fieldShape | failingRuns |
| --- | --- | --- | --- | --- |
| `contribution` | 16 | 16 | `memberId`, `passed` | `none` |
| `clipping` | 16 | 16 | `memberId`, `passed` | `none` |
| `normalization` | 16 | 16 | `memberId`, `passed` | `none` |
| `participation` | 16 | 16 | `memberId`, `passed` | `none` |
| `allocation` | 16 | 16 | `memberId`, `passed` | `none` |
| `journal` | 16 | 16 | `memberId`, `passed` | `none` |
| `settlement-proof` | 16 | 16 | `memberId`, `passed` | `none` |

#### Theorems

| theoremId | passedRuns | totalRuns | replayStepIds | failureReasons | failingRuns |
| --- | --- | --- | --- | --- | --- |
| `settlement_source_to_shares.contribution_totality` | 16 | 16 | `settlement-source-to-shares.contribution-allocation` | `none` | `none` |
| `settlement_source_to_shares.clipping_determinism` | 16 | 16 | `settlement-source-to-shares.contribution-allocation` | `none` | `none` |
| `settlement_source_to_shares.normalization_exactness` | 16 | 16 | `settlement-source-to-shares.contribution-allocation` | `none` | `none` |
| `settlement_source_to_shares.participation_totality` | 16 | 16 | `settlement-source-to-shares.contribution-allocation` | `none` | `none` |
| `settlement_source_to_shares.allocation_conservation` | 16 | 16 | `settlement-source-to-shares.contribution-allocation` | `none` | `none` |
| `settlement_source_to_shares.journal_completeness` | 16 | 16 | `settlement-source-to-shares.journal-theorem` | `none` | `none` |
| `settlement_source_to_shares.settlement_theorem_integrity` | 16 | 16 | `settlement-source-to-shares.journal-theorem` | `none` | `none` |

#### Replay Steps

| stepId | theoremIds | requiredArtifactPaths |
| --- | --- | --- |
| `settlement-source-to-shares.contribution-allocation` | `settlement_source_to_shares.contribution_totality`, `settlement_source_to_shares.clipping_determinism`, `settlement_source_to_shares.normalization_exactness`, `settlement_source_to_shares.participation_totality`, `settlement_source_to_shares.allocation_conservation` | `.engi/source-to-shares.json`, `.engi/settlement-participation.json`, `.engi/accounting-precision-report.json` |
| `settlement-source-to-shares.journal-theorem` | `settlement_source_to_shares.journal_completeness`, `settlement_source_to_shares.settlement_theorem_integrity` | `.engi/journal-diff.json`, `.engi/journal-completeness-proof.json`, `.engi/settlement-proof.json` |

### disclosure-boundary

- proofArtifactPath: `.engi/disclosure-boundary-proof.json`
- witnessArtifactPaths: `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json`, `.engi/disclosure-boundary-proof.json`
- replayArtifacts: `.engi/projection-policy.json`, `.engi/bounded-public-proof.json`, `.engi/redaction-proof.json`, `.engi/disclosure-proof.json`, `.engi/disclosure-boundary-proof.json`
- replayStepIds: `disclosure-boundary.policy-bounded-public`, `disclosure-boundary.redaction-disclosure`

#### Members

| memberId | passedRuns | totalRuns | fieldShape | failingRuns |
| --- | --- | --- | --- | --- |
| `projection-policy` | 16 | 16 | `memberId`, `passed` | `none` |
| `bounded-public-proof` | 16 | 16 | `memberId`, `passed` | `none` |
| `redaction-proof` | 16 | 16 | `memberId`, `passed` | `none` |
| `disclosure-proof` | 16 | 16 | `memberId`, `passed` | `none` |

#### Theorems

| theoremId | passedRuns | totalRuns | replayStepIds | failureReasons | failingRuns |
| --- | --- | --- | --- | --- | --- |
| `disclosure_boundary.projection_policy_closure` | 16 | 16 | `disclosure-boundary.policy-bounded-public` | `none` | `none` |
| `disclosure_boundary.bounded_public_metadata_only` | 16 | 16 | `disclosure-boundary.policy-bounded-public` | `none` | `none` |
| `disclosure_boundary.redaction_alignment` | 16 | 16 | `disclosure-boundary.redaction-disclosure` | `none` | `none` |
| `disclosure_boundary.disclosure_verdict_alignment` | 16 | 16 | `disclosure-boundary.redaction-disclosure` | `none` | `none` |
| `disclosure_boundary.witness_replay_closure` | 16 | 16 | `disclosure-boundary.policy-bounded-public`, `disclosure-boundary.redaction-disclosure` | `none` | `none` |

#### Replay Steps

| stepId | theoremIds | requiredArtifactPaths |
| --- | --- | --- |
| `disclosure-boundary.policy-bounded-public` | `disclosure_boundary.projection_policy_closure`, `disclosure_boundary.bounded_public_metadata_only` | `.engi/projection-policy.json`, `.engi/bounded-public-proof.json` |
| `disclosure-boundary.redaction-disclosure` | `disclosure_boundary.redaction_alignment`, `disclosure_boundary.disclosure_verdict_alignment`, `disclosure_boundary.witness_replay_closure` | `.engi/redaction-proof.json`, `.engi/disclosure-proof.json`, `.engi/disclosure-boundary-proof.json` |

### proof-contract

- proofArtifactPath: `.engi/proof-contract.json`
- witnessArtifactPaths: `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json`
- replayArtifacts: `.engi/proof-contract.json`, `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json`
- replayStepIds: `proof-contract.contract-materialization`, `proof-contract.evidence-chain`, `proof-contract.bundle-witness`

#### Members

| memberId | passedRuns | totalRuns | fieldShape | failingRuns |
| --- | --- | --- | --- | --- |
| `proof-contract` | 16 | 16 | `memberId`, `passed` | `none` |
| `evidence-chain` | 16 | 16 | `memberId`, `passed` | `none` |
| `theorem-checks` | 16 | 16 | `memberId`, `passed` | `none` |
| `system-proof-bundle` | 16 | 16 | `memberId`, `passed` | `none` |
| `witness-manifest-closure` | 16 | 16 | `memberId`, `passed` | `none` |

#### Theorems

| theoremId | passedRuns | totalRuns | replayStepIds | failureReasons | failingRuns |
| --- | --- | --- | --- | --- | --- |
| `proof_contract.contract_materialization` | 16 | 16 | `proof-contract.contract-materialization` | `none` | `none` |
| `proof_contract.evidence_chain_closure` | 16 | 16 | `proof-contract.evidence-chain` | `none` | `none` |
| `proof_contract.theorem_check_binding` | 16 | 16 | `proof-contract.evidence-chain` | `none` | `none` |
| `proof_contract.bundle_coherence` | 16 | 16 | `proof-contract.bundle-witness` | `none` | `none` |
| `proof_contract.witness_manifest_coherence` | 16 | 16 | `proof-contract.bundle-witness` | `none` | `none` |
| `proof_contract.replay_closure` | 16 | 16 | `proof-contract.bundle-witness` | `none` | `none` |

#### Replay Steps

| stepId | theoremIds | requiredArtifactPaths |
| --- | --- | --- |
| `proof-contract.contract-materialization` | `proof_contract.contract_materialization` | `.engi/proof-contract.json` |
| `proof-contract.evidence-chain` | `proof_contract.evidence_chain_closure`, `proof_contract.theorem_check_binding` | `.engi/proof-contract.json`, `.engi/system-proof-bundle.json` |
| `proof-contract.bundle-witness` | `proof_contract.bundle_coherence`, `proof_contract.witness_manifest_coherence`, `proof_contract.replay_closure` | `.engi/system-proof-bundle.json`, `.engi/proof-witness-manifest.json`, `.engi/proof-contract.json` |

## Scenario and Run Matrix

| scenarioId | branchMode | needId | branchName | assetPackId | familyCount | allFamiliesPassed | proofContractPassed | requiredArtifactPathCount | artifactDigestCount | fullyProven |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `auth-issuer-rollback` | `patch` | `need_auth-issuer-rollback_81af66a362` | `engi/remediation-need_auth-issuer-rollback_81af66a362-auth-issuer-rollback` | `asset_pack_bd3a6720143b` | 9 | `true` | `true` | 41 | 43 | `true` |
| `auth-issuer-rollback` | `context` | `need_auth-issuer-rollback_81af66a362` | `engi/remediation-need_auth-issuer-rollback_81af66a362-auth-issuer-rollback` | `asset_pack_c8a7bec57603` | 9 | `true` | `true` | 41 | 43 | `true` |
| `rust-validator-proof-gap` | `patch` | `need_rust-validator-proof-gap_89935a9470` | `engi/remediation-need_rust-validator-proof-gap_89935a9470-rust-validator-proof-gap` | `asset_pack_9ee7ff9bb9bc` | 9 | `true` | `true` | 41 | 43 | `true` |
| `rust-validator-proof-gap` | `context` | `need_rust-validator-proof-gap_89935a9470` | `engi/remediation-need_rust-validator-proof-gap_89935a9470-rust-validator-proof-gap` | `asset_pack_9ee7ff9bb9bc` | 9 | `true` | `true` | 41 | 43 | `true` |
| `config-policy-precedence-incident` | `patch` | `need_config-policy-precedence-incident_fda9bc8068` | `engi/remediation-need_config-policy-precedence-incident_fda9bc8068-config-policy-precedence-incident` | `asset_pack_83536cbc4e2b` | 9 | `true` | `true` | 41 | 43 | `true` |
| `config-policy-precedence-incident` | `context` | `need_config-policy-precedence-incident_fda9bc8068` | `engi/remediation-need_config-policy-precedence-incident_fda9bc8068-config-policy-precedence-incident` | `asset_pack_83536cbc4e2b` | 9 | `true` | `true` | 41 | 43 | `true` |
| `unsafe-patch-review-recovery` | `patch` | `need_unsafe-patch-review-recovery_5e7450e3af` | `engi/remediation-need_unsafe-patch-review-recovery_5e7450e3af-unsafe-patch-review-recovery` | `asset_pack_f6985f8e0e79` | 9 | `true` | `true` | 41 | 43 | `true` |
| `unsafe-patch-review-recovery` | `context` | `need_unsafe-patch-review-recovery_5e7450e3af` | `engi/remediation-need_unsafe-patch-review-recovery_5e7450e3af-unsafe-patch-review-recovery` | `asset_pack_f6985f8e0e79` | 9 | `true` | `true` | 41 | 43 | `true` |
| `infra-deployment-mismatch` | `patch` | `need_infra-deployment-mismatch_fc5c599b31` | `engi/remediation-need_infra-deployment-mismatch_fc5c599b31-infra-deployment-mismatch` | `asset_pack_d72be312e67f` | 9 | `true` | `true` | 41 | 43 | `true` |
| `infra-deployment-mismatch` | `context` | `need_infra-deployment-mismatch_fc5c599b31` | `engi/remediation-need_infra-deployment-mismatch_fc5c599b31-infra-deployment-mismatch` | `asset_pack_d72be312e67f` | 9 | `true` | `true` | 41 | 43 | `true` |
| `privacy-boundary-proof-export` | `patch` | `need_privacy-boundary-proof-export_4b53f9e7b1` | `engi/remediation-need_privacy-boundary-proof-export_4b53f9e7b1-privacy-boundary-proof-export` | `asset_pack_13d8cd4543f8` | 9 | `true` | `true` | 41 | 43 | `true` |
| `privacy-boundary-proof-export` | `context` | `need_privacy-boundary-proof-export_4b53f9e7b1` | `engi/remediation-need_privacy-boundary-proof-export_4b53f9e7b1-privacy-boundary-proof-export` | `asset_pack_13d8cd4543f8` | 9 | `true` | `true` | 41 | 43 | `true` |
| `polyglot-gateway-benchmark-remediation` | `patch` | `need_polyglot-gateway-benchmark-remediation_c94ea2defd` | `engi/remediation-need_polyglot-gateway-benchmark-remediation_c94ea2defd-polyglot-gateway-benchmark-remediation` | `asset_pack_6c4cb819a469` | 9 | `true` | `true` | 41 | 43 | `true` |
| `polyglot-gateway-benchmark-remediation` | `context` | `need_polyglot-gateway-benchmark-remediation_c94ea2defd` | `engi/remediation-need_polyglot-gateway-benchmark-remediation_c94ea2defd-polyglot-gateway-benchmark-remediation` | `asset_pack_6c4cb819a469` | 9 | `true` | `true` | 41 | 43 | `true` |
| `auth-many-asset-normalization` | `patch` | `need_auth-many-asset-normalization_7721dc16cb` | `engi/remediation-need_auth-many-asset-normalization_7721dc16cb-auth-many-asset-normalization` | `asset_pack_55e928ab676b` | 9 | `true` | `true` | 41 | 43 | `true` |
| `auth-many-asset-normalization` | `context` | `need_auth-many-asset-normalization_7721dc16cb` | `engi/remediation-need_auth-many-asset-normalization_7721dc16cb-auth-many-asset-normalization` | `asset_pack_55e928ab676b` | 9 | `true` | `true` | 41 | 43 | `true` |

## Incomplete Verdicts

- none

## Run Details

### auth-issuer-rollback / patch

- branchName: `engi/remediation-need_auth-issuer-rollback_81af66a362-auth-issuer-rollback`
- needId: `need_auth-issuer-rollback_81af66a362`
- assetPackId: `asset_pack_bd3a6720143b`
- proofContractHash: `sha256:76f7e4377b433c165885697cfac93b28821ff0cd6031c1e85af6b4c1c89f15ee`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:650345d1d01e5110a147ae4f5f031008b5c5eac2233e7413449fb6d2a0b52f37` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:f1b0d66ff98a4304f4a8cc57b847d9c8d06bc536d65dba20af6b0856508476c3` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:0512c32f9af6e2406eca386b7501129d9ba57ce743d21f10f7267bb8d48369ce` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:82355c0ce0e7da1685bfff29c468fdc85be2e6076048a0329011f8807d77b42a` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:1ca75b883b3a437555c32b1c5a820b6ce1d758df0ecb47de240fd16ea070c4a9` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:3f33de62f0a40cee9cc377d84919a28f41d7b37f98f965f188c1a1518288f9e9` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:76f7e4377b433c165885697cfac93b28821ff0cd6031c1e85af6b4c1c89f15ee` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:b821c59a84463c38dc46d74d2e9cdddb9a53786f4ad9a75e9b77c1f17fa8dcbd` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:7c9818dc92fc9bbfedf3a29d7f6d0a066265ab4a29406c30ad4fd59947208031` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:7bc619ece4058d96f93154c234506ee2434637f8f93887e710c69b0a29f88510` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:961dcf4ed39f3d86fa9f1c798627e9927505ab6bee0d738ebd49bed29d6d9896` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:f71e2f9d4f23742a42bdbb354d7dc34bc839a81b5ca6c5808ce8adf408e6ef65` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:650345d1d01e5110a147ae4f5f031008b5c5eac2233e7413449fb6d2a0b52f37` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:f789b8054f61f6131a1ad697af4e8fa995769998f6d961a84f1a618e2ce26e3d` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:f0d5201cfab70f81f49556dd5c2092f4fde4d20b5f3577e8f33a4eabb32e7d26` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:375a4d6f28823d3ab9ee35dc550215c87305f9179e63d7376c8b79a195bdc68c` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:fbdeaeb07e9ae6b9ea11d7cff15044b3ee220bf7b50821c8af1c8025bcfb1eeb` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:3b13aa4c7796ffcc9039651acf629d91efd6cd3c9909e2dc72c80f516e6d0ddc` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:bee7cdefec21d4cde0d5827922da9151591a9d87857c36c70b78a8bd8439596d` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:f1b0d66ff98a4304f4a8cc57b847d9c8d06bc536d65dba20af6b0856508476c3` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:7c2700dd002d4899804aa5ced005ff6f4946d78881fef6a6bc648e9929493be1` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:1561ee8487b0a0dd0443b488d49677498947523496816491f38686ee4ddac155` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:d6f889f5ad39d0e288f4a3f6450886bfbcb91d760762b3a8e7d96739894de3fd` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:df92c9f65535a4032463a2d73a14debd3a32861d645c040b902fabeb340b4954` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:3031d90e1ac7d0344cc794b5b534df15d46dbb1da810cebfb97575a762fae0fb` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:29e81a4807fa79966b1788540e7e1f98f3b6afd7436cbad4ed0e66b3b82720bb` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:c8acb6a230e99a59709d6f2bc65a09e568d52139f7b2a2c6ff6594192ecc56c9` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:0512c32f9af6e2406eca386b7501129d9ba57ce743d21f10f7267bb8d48369ce` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:89525476663662a3e460851002bbfc03906f1d27e47af0fc9145e87c096afdd1` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:1bf777fc602298c9c5d316b2df62018fcb78d3c241c7e1264228a7de726952a8` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:7acbd76fe4533674f1667aee618ab682a81eafb593eabb6c198e1c94f06c2021` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:bbeaf4904429e16a85c4d47808299e9c49713fa8cbb987b14c39ca79295bc192` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:82355c0ce0e7da1685bfff29c468fdc85be2e6076048a0329011f8807d77b42a` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:545a001ba12f7cfc7445433cf315b05cc663e6276c69e394a2e7146958e13ba3` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:647de9ef0a4064dafc308545fab4a35614095434b68c3496241f2a9d7fe0c993` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:4f616066275f691eb3cb5da1a2e60e30ef234cb2d1326ef0db6430df363f982b` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:e22ce21e782cf245fd088f4b5355255affdebf154356b7a1e0dc8c09c2a426e8` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:9be7da8770062efdd663e203426e5aeac0422a1b451214c1e93010f9fed53a9b` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:d668ae5e2800fbd12c16e219af1df3ffe9ee765b6a9bffb4858a7456337f5910` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:1ca75b883b3a437555c32b1c5a820b6ce1d758df0ecb47de240fd16ea070c4a9` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:82025359f8a966ff54baad4d705ea958551d44e6f25af49a96384756896815cd` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:192ac06bc58f023efe8983f5d8b70b16034896ea66659aaeae77cbf98f0de258` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:192ac06bc58f023efe8983f5d8b70b16034896ea66659aaeae77cbf98f0de258` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:192ac06bc58f023efe8983f5d8b70b16034896ea66659aaeae77cbf98f0de258` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:3f33de62f0a40cee9cc377d84919a28f41d7b37f98f965f188c1a1518288f9e9` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:2795b22c7748500640edfe40b982ed92e69f646b2821739b9bd6cc3baac8e9d9` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:1087a7895fdbff5f6c6b277a2f689b9598303187a4963ea333dcf57c7a04f60e` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

### auth-issuer-rollback / context

- branchName: `engi/remediation-need_auth-issuer-rollback_81af66a362-auth-issuer-rollback`
- needId: `need_auth-issuer-rollback_81af66a362`
- assetPackId: `asset_pack_c8a7bec57603`
- proofContractHash: `sha256:7d516ce7bf7f13ffa703cd3dcaa24b408a33ce03d13141bdbf88c319b08fed57`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:650345d1d01e5110a147ae4f5f031008b5c5eac2233e7413449fb6d2a0b52f37` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:f1b0d66ff98a4304f4a8cc57b847d9c8d06bc536d65dba20af6b0856508476c3` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:7d1b4a78c93a97e8234b7306cb04978426bb6ff4407c2f1bd74b71a146b2a990` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:eb643f70ab970d2119392d73065a6b0fed5c1037ea2f2c0316058f496483afa1` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:b0916ad24bb87e6c9803e2a3aa3cae9aae164d1bdda215eec1fd43e8c4607182` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:b477304ae84e81b7eb20502f21cacbb0158a6883b8c066a565fdea9cbba8a9b7` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:7d516ce7bf7f13ffa703cd3dcaa24b408a33ce03d13141bdbf88c319b08fed57` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:b821c59a84463c38dc46d74d2e9cdddb9a53786f4ad9a75e9b77c1f17fa8dcbd` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:7c9818dc92fc9bbfedf3a29d7f6d0a066265ab4a29406c30ad4fd59947208031` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:7bc619ece4058d96f93154c234506ee2434637f8f93887e710c69b0a29f88510` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:961dcf4ed39f3d86fa9f1c798627e9927505ab6bee0d738ebd49bed29d6d9896` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:f71e2f9d4f23742a42bdbb354d7dc34bc839a81b5ca6c5808ce8adf408e6ef65` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:650345d1d01e5110a147ae4f5f031008b5c5eac2233e7413449fb6d2a0b52f37` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:f789b8054f61f6131a1ad697af4e8fa995769998f6d961a84f1a618e2ce26e3d` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:bd99e8041347800f7efe2044d2dc5905e14491b738082dc9a244d49a2cdca5e3` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:ad9599daabfebf87997ad80ac54e19916f0cf7119130e5940ed36ab73c152b1c` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:fbdeaeb07e9ae6b9ea11d7cff15044b3ee220bf7b50821c8af1c8025bcfb1eeb` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:3b13aa4c7796ffcc9039651acf629d91efd6cd3c9909e2dc72c80f516e6d0ddc` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:bee7cdefec21d4cde0d5827922da9151591a9d87857c36c70b78a8bd8439596d` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:f1b0d66ff98a4304f4a8cc57b847d9c8d06bc536d65dba20af6b0856508476c3` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:cd2e5c0e625f678c0892a414bcaebb12e5a97a0ac26a80828c6b21317ec72821` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:0650edb8774021f9fa3e159713839565059718b86d70a502c159dcdde025f172` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:24943ff0d9ec007a77c2c72f4d2ca08900f998e0297e2555c12e379464022239` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:63a5b01bd1313cebfdae5c00048ecd37fd70617850e42da42cce9f0ea4e576ee` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:3031d90e1ac7d0344cc794b5b534df15d46dbb1da810cebfb97575a762fae0fb` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:171ac9faf181b19bea172b0f021924c8da9c98524ebc9314ef093a76f1b90942` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:24aceded3069e0e449fbf606fac356279cba34dd7ae1e37db716f9108988ca02` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:7d1b4a78c93a97e8234b7306cb04978426bb6ff4407c2f1bd74b71a146b2a990` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:725858ffb97da0b415c48ceab743952a9fb7291d5f41f614b478fe31ffd4f9d6` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:68a8f7273ced501a1290b3229c562ec166b29642ebad2863a711859e3fcff6df` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:c67ea0ec5d31e1de47893c084feb51396e05c4da0a52e94c8f80ec50d33c5b05` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:bbeaf4904429e16a85c4d47808299e9c49713fa8cbb987b14c39ca79295bc192` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:eb643f70ab970d2119392d73065a6b0fed5c1037ea2f2c0316058f496483afa1` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:545a001ba12f7cfc7445433cf315b05cc663e6276c69e394a2e7146958e13ba3` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:4e26fbb37c811bb7040772fea492bfd5008878ce8d10828183f8a9315acb775b` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:e648877cabc55f297d754da88c7e00200b78ff1bdb6d6ef32daef2228a9211fe` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:ede40c33f88e9636332393d69dd518d3d34c48462771724e1270e0a606c014c6` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:2d5a5f68eb9d42dcf8f781731929a5abb7215595ac2f4a88a896269c069123cc` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:52c7263702364be49442d31461931242e58e55186cccdb77a0c6afd3f3e41f11` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:b0916ad24bb87e6c9803e2a3aa3cae9aae164d1bdda215eec1fd43e8c4607182` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:1f1eb116906bd2cf1be1be55dcd0cc8348fc7c2f9d4be794df16ee963e76245a` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:57cd2ddc12cd4d87a45b17ea40223848c0c8a9efa82f5e0f43552c84101a4567` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:57cd2ddc12cd4d87a45b17ea40223848c0c8a9efa82f5e0f43552c84101a4567` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:57cd2ddc12cd4d87a45b17ea40223848c0c8a9efa82f5e0f43552c84101a4567` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:b477304ae84e81b7eb20502f21cacbb0158a6883b8c066a565fdea9cbba8a9b7` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:7d1a3cae90610f209dafe34897f6bb95b1e0447e6f4f128a5aab54637b481a7b` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:1087a7895fdbff5f6c6b277a2f689b9598303187a4963ea333dcf57c7a04f60e` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

### rust-validator-proof-gap / patch

- branchName: `engi/remediation-need_rust-validator-proof-gap_89935a9470-rust-validator-proof-gap`
- needId: `need_rust-validator-proof-gap_89935a9470`
- assetPackId: `asset_pack_9ee7ff9bb9bc`
- proofContractHash: `sha256:ed2acedc97bee19fda3f7cbde00f3de580e8c9ffaef44d9d704d6a5c5e28f8a1`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:9751c7f05ced1b90ef893113059efdcdb11105a566c6a8c0a12626e9b9a5366c` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:f2f49e8bc4f4ffbf7dcc01ea10fc17d8a281591d959be70f3ae6e3a06a0183cc` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:3d248e3637cbcf59a8ed8d54cec3d1d5d89eb425b6b155507348e518fd15a739` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:6c9ea1d31c3984059e5a0ea0301b9338c54f787830223fa862c28eba9c80f9d5` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:a289da3ae567f3b8ec5f5b0096629288700c75c57a821c2a8387e0a44a4c7976` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:a56da3531ff6b7975303cc1b178cc0ce9ad469855587d58e5f4e1c0be4b105bf` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:ed2acedc97bee19fda3f7cbde00f3de580e8c9ffaef44d9d704d6a5c5e28f8a1` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:11594b0e2f95e4928a3b7d2209a8717ef3f4aaefa2a2e68418ed4db146d24764` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:22bac801f971b06a34d38508e8e76ac778a7ab0618dbc2e46f88c44e170a0698` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:3285fd1a31d43122ea7a16ce5b76015f877087095abf445cee62b942af55ea93` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:576487cf575ddc07ab79c42604c85396b17a36cf5eaaffda14c39017255f486d` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:785de85629591ad6766643b0a639040d37f793e4dc3e8be4df5b2ea55e900021` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:9751c7f05ced1b90ef893113059efdcdb11105a566c6a8c0a12626e9b9a5366c` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:4819c895cb9e6673f1ccedfcb36b62de136010b45fa004ffbdda657ab75c8185` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:c4eacf84157178239507cf378dc303616c521ecaa1ff3b22983167837badfc24` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:756527c89e153aa579142e4979ce2f1f65107d5b6c46acd6f7541bd9c0b72495` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:ceded24fc67be7c03ce57ef83c400262fde47fbd44775c6a6fa517c6499ce394` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:76e64eb94156ceabc38786e07a0529ddb7295ecba7a84623365c02e7a2fd6e0a` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:decf644319e8efb9e24c919507432f90ed532f4e9863d41ea0cd3af703b708fc` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:f2f49e8bc4f4ffbf7dcc01ea10fc17d8a281591d959be70f3ae6e3a06a0183cc` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:da7f64783fef9a7aaccde9bbc0f970c70ae62d03804e7a22fae5ac2e8d0558ff` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:a2513b5ed658bdcec8836bfc4be72718e16ac9638012284e40f32a6ac1cb3d2d` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:0cb363781b5e624ed1da4cb70cfe55fd9d73c86ace5f58ce67d7639ecb43380a` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:ecd60849d79fe410f56dbc6a25093bfd8e78f8f4e08a1d1a9e069e9c17ca4b5b` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:1c39d3b17f11d2879cc214d8173dc69c083dde88eff366a91bcf5491890407cb` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:3f7148afee2a0b067968500edbdc812560dbc5936fae54b6558474ac8a4687d9` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:e1fad3c5ad05146fbf6ce0606a2f3f3f541fd6b889f5a8997ff21ecb1c551e21` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:3d248e3637cbcf59a8ed8d54cec3d1d5d89eb425b6b155507348e518fd15a739` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:4887b22b8f63fcda865458f52681824f3263f0785436bb2e22665da6f9f75520` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:5d7e78a1c249b4531a1e34e039a4bb0676cee3fafa63b4beead779e7ccfa787a` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:b066035cd7049fcb8365042f0a9a715f27f8e69835c837a1bd23ea8c9ee1d5a8` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:5001a9c00eef99f0eb80e129f75c674f9e210a2c721c68949737429f8f6861b4` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:6c9ea1d31c3984059e5a0ea0301b9338c54f787830223fa862c28eba9c80f9d5` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:94432e403b77e107666301da8258ee7f36946afa84e142edae33116b69ce5fb5` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:3eeb4aba1603e6006c6d4aa1d6289117a23d643b9e1f838296a24ff57bc4ae61` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:d4e560eb7544bd1685ab68ddf20fa67e8547a25ee21c83c7fc0f632338bd953a` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:140be9d271de197436d85e06ae02eabed4fc469b1153de5d52f882d140b870d3` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:144ae35fdc864c90127dc306118060eb30a449b7152d0d819dad7e0a02ca1481` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:1465898f7b9863851049f147798856567c7ab1c27dca32c0f7f5c64e63bbd101` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:a289da3ae567f3b8ec5f5b0096629288700c75c57a821c2a8387e0a44a4c7976` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:4d989cb25911b399166d41efa9e78580e6fbef6fa0231cd74462be4a1760cb93` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:72c0c3d4e5dd027af83f7fc169718f391cbd4b8777f52e3d894fe0164b52f3e1` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:72c0c3d4e5dd027af83f7fc169718f391cbd4b8777f52e3d894fe0164b52f3e1` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:72c0c3d4e5dd027af83f7fc169718f391cbd4b8777f52e3d894fe0164b52f3e1` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:a56da3531ff6b7975303cc1b178cc0ce9ad469855587d58e5f4e1c0be4b105bf` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:07ec41e9d6bee6d2d1a16b1a6d2bd4ab1dea77871ded6945613bdedab4d9d10a` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:c69b1bd28e53ebe9c3221ab3071e8643f7ae75f5288fd9dba31d421accf8dad2` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

### rust-validator-proof-gap / context

- branchName: `engi/remediation-need_rust-validator-proof-gap_89935a9470-rust-validator-proof-gap`
- needId: `need_rust-validator-proof-gap_89935a9470`
- assetPackId: `asset_pack_9ee7ff9bb9bc`
- proofContractHash: `sha256:ed2acedc97bee19fda3f7cbde00f3de580e8c9ffaef44d9d704d6a5c5e28f8a1`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:9751c7f05ced1b90ef893113059efdcdb11105a566c6a8c0a12626e9b9a5366c` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:f2f49e8bc4f4ffbf7dcc01ea10fc17d8a281591d959be70f3ae6e3a06a0183cc` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:e3054361661b0691deca9027941abbaae2c942c9f8ab4282a98773ac3c3fbbb1` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:6c9ea1d31c3984059e5a0ea0301b9338c54f787830223fa862c28eba9c80f9d5` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:4fcc991b5cebf953744c2e6610164d3cd7e4bead5b27675b4ea9f65101e29ddb` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:bb5475590c65441639e11634cc7cde1483e6bdd171fc7dd681195345d84b34ec` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:ed2acedc97bee19fda3f7cbde00f3de580e8c9ffaef44d9d704d6a5c5e28f8a1` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:11594b0e2f95e4928a3b7d2209a8717ef3f4aaefa2a2e68418ed4db146d24764` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:22bac801f971b06a34d38508e8e76ac778a7ab0618dbc2e46f88c44e170a0698` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:3285fd1a31d43122ea7a16ce5b76015f877087095abf445cee62b942af55ea93` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:576487cf575ddc07ab79c42604c85396b17a36cf5eaaffda14c39017255f486d` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:785de85629591ad6766643b0a639040d37f793e4dc3e8be4df5b2ea55e900021` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:9751c7f05ced1b90ef893113059efdcdb11105a566c6a8c0a12626e9b9a5366c` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:4819c895cb9e6673f1ccedfcb36b62de136010b45fa004ffbdda657ab75c8185` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:3e7a9830e3749eba4b42fd64c6598c9d48a4d40b455e04aeee22ebd0d9d11f17` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:c037758ce6f7b3f8f493f9eecc98306ea5a45da1e20f7888ee205a0480efafd8` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:ceded24fc67be7c03ce57ef83c400262fde47fbd44775c6a6fa517c6499ce394` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:76e64eb94156ceabc38786e07a0529ddb7295ecba7a84623365c02e7a2fd6e0a` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:decf644319e8efb9e24c919507432f90ed532f4e9863d41ea0cd3af703b708fc` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:f2f49e8bc4f4ffbf7dcc01ea10fc17d8a281591d959be70f3ae6e3a06a0183cc` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:da7f64783fef9a7aaccde9bbc0f970c70ae62d03804e7a22fae5ac2e8d0558ff` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:a2513b5ed658bdcec8836bfc4be72718e16ac9638012284e40f32a6ac1cb3d2d` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:0cb363781b5e624ed1da4cb70cfe55fd9d73c86ace5f58ce67d7639ecb43380a` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:35e4326277dd922ac53dc6dfdaa35e7e6b3b98663f82ed6116b42742d0075b67` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:1c39d3b17f11d2879cc214d8173dc69c083dde88eff366a91bcf5491890407cb` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:3f7148afee2a0b067968500edbdc812560dbc5936fae54b6558474ac8a4687d9` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:44d83ad6651b186d853132d5c16691a5d5442cb9044bd8c60380820660a752d4` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:e3054361661b0691deca9027941abbaae2c942c9f8ab4282a98773ac3c3fbbb1` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:eabe7904f0a7dc606f555a7de69612c63d968fa5a0b8cae608aaae110686a96a` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:5d7e78a1c249b4531a1e34e039a4bb0676cee3fafa63b4beead779e7ccfa787a` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:b066035cd7049fcb8365042f0a9a715f27f8e69835c837a1bd23ea8c9ee1d5a8` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:5001a9c00eef99f0eb80e129f75c674f9e210a2c721c68949737429f8f6861b4` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:6c9ea1d31c3984059e5a0ea0301b9338c54f787830223fa862c28eba9c80f9d5` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:94432e403b77e107666301da8258ee7f36946afa84e142edae33116b69ce5fb5` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:f5e263eb02c186afd174ae508182a66348464bd3425ab69dc11686089df7b08a` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:ec3220123908a5c22dbfe4373ba5e1a94ce2d832dda695bf4543a09e86c52ba5` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:fbc4ad009e2b36fa06edf51ed825b50a152c5ee0f84b79ac982e9a28a4662857` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:1bf891ccd6290ac72e1de19c1698fc0d01faaee81b47c39bbf604b640cb00030` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:85479427d9163645b854d449d90fe4508bb34864b01db6ee3463e34d047671df` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:4fcc991b5cebf953744c2e6610164d3cd7e4bead5b27675b4ea9f65101e29ddb` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:4d989cb25911b399166d41efa9e78580e6fbef6fa0231cd74462be4a1760cb93` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:d1f4e1a35d8cf663505832c158de81a349290a9d20784af578c872e893d61ab6` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:d1f4e1a35d8cf663505832c158de81a349290a9d20784af578c872e893d61ab6` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:d1f4e1a35d8cf663505832c158de81a349290a9d20784af578c872e893d61ab6` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:bb5475590c65441639e11634cc7cde1483e6bdd171fc7dd681195345d84b34ec` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:07ec41e9d6bee6d2d1a16b1a6d2bd4ab1dea77871ded6945613bdedab4d9d10a` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:c69b1bd28e53ebe9c3221ab3071e8643f7ae75f5288fd9dba31d421accf8dad2` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

### config-policy-precedence-incident / patch

- branchName: `engi/remediation-need_config-policy-precedence-incident_fda9bc8068-config-policy-precedence-incident`
- needId: `need_config-policy-precedence-incident_fda9bc8068`
- assetPackId: `asset_pack_83536cbc4e2b`
- proofContractHash: `sha256:ee4951ad087df4a7c043205d7ba960a104da473c3fa0a4c4ac9e56d774e3bc01`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:64f068056438594ab0898143b078fed9376fe9b1953d1fc5720febe614b18649` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:9c0cbfadf5553b81a90cff6e21457a1acec8494bc787eb15f720bb3868bd9460` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:fb7276b2eb97be9dd741abf7a72881f601975606d54ed558e866e9861313f281` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:833ab776e48a835f06f16e67375172dcd0232fbb789a8ae17a0edc009693002c` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:cdd8af98228c31bbe646d5a3267ace35cba7196b0c72dee501590095114d2250` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:943c1d220d3ca69ef5d54969694444b510a1386b77e957194cc157d2fa8fad9a` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:ee4951ad087df4a7c043205d7ba960a104da473c3fa0a4c4ac9e56d774e3bc01` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:dc78b71b262b8446f39ed92e77504ee846cdd10df217b9d46fafbed2e94c29d0` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:40cba954c5b7f81506a65479ab7e20f6dfef1764331f6ccf624950cdacc74d07` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:4b6940291b1ea93f442e6db39b39d696396c5d17d45ab2161a7ce4879e77a2a7` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:5aa859b6524717aa404a1df2c920aad3c534c0abe38562268f9f338c61c3ce05` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:feeea25af33e049d2627f9f04f7555785e2de3109ad43740f4bbf3a966bdf8d3` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:64f068056438594ab0898143b078fed9376fe9b1953d1fc5720febe614b18649` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:069048d8d5ae61ad434b314ed0eaa189254d82ba55947900a9c1d21f83472313` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:b5ea5229bb488cddd225c9f246408ac492d61cb8c9aa5f7180140a17f56ae4d8` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:a8220e802282a23ca1db989a4e2b865d5c30e74d576c4496e30aff180114e44a` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:6ffc7539e53b4bf4aee6d40adb03f1c8e0036dea3fc9ee251090ea2995a26ee6` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:ff0abe845f127c3419bfe06ce94df739f4e350fd8ace855f49b363977d13d2e8` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:a0f3cb9761d4a77f0094399f3183af38b07d2df8339aa85f6a60a22dc4f9873e` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:9c0cbfadf5553b81a90cff6e21457a1acec8494bc787eb15f720bb3868bd9460` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:e7ff4fe23c0630aea7029ec4a5e4cf56390479ebfaf166b8a2c6bf0f64720a7c` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:f3876b9f2a08287db5eeaedd9dbd7f437d464cddb9e1205fb8879eed83c56f7d` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:87e757821d131fa2df34e7c0e0a5c76f5ea55ea17dfae329a367059262fbfe06` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:ed8a1d3c30301e8c94f409c1af141f48533d06e44a0f8abe2da333114b2bca5f` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:4bbb8072e53597f01b5137907e699135eb8daf779ba416d7f152b0ef55d853f5` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:501307fda8ba5ca845f985e7c2857595abc67ce54037f07ffa384080d45ca725` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:7f607b91202d78c3f2fab646218c1dfb4ea7ffe3608face188a0073fd4cebd5d` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:fb7276b2eb97be9dd741abf7a72881f601975606d54ed558e866e9861313f281` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:270b4e128b302d7612f1a2243fb6261028501b987ff089d3bf6199a657e3b222` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:c2afbdda1e1d29512f8d13967c9274350044590140b41fde09a26421330e26fe` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:4d74f2098be1060ea540b657a0e8948ed263f1bd908234d3edbfb673a1b2e155` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:251dbe8077527d7b001d9448417879400fa7676bccf34a33615366676e66fb73` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:833ab776e48a835f06f16e67375172dcd0232fbb789a8ae17a0edc009693002c` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:b727e318bed39f71209e542d8d8002b47b85f97301eaeb6b7f859391a760963a` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:28b04c918fab8caed28967ee3a26147a31f0274087417addd3cb91772f2cbd02` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:2c1c88f3a3d642339726b60e9dbedf735664c2a1ce3e7a257ad8897b952c0c29` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:5300521657232203336fb9718a6a0b057ed3d636adcbbec45f4a87e6f0e901fa` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:f51f5e6b1f0edcc94add63a0a915e336faf7aed036b506a1b028d44fee2e62fa` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:cfc62eaf5bd53618eb52d4a593b1ff49cd76aea84037ee7f6ea50dbbed1adf0c` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:cdd8af98228c31bbe646d5a3267ace35cba7196b0c72dee501590095114d2250` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:4d989cb25911b399166d41efa9e78580e6fbef6fa0231cd74462be4a1760cb93` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:12b7bdfafe5133a020745fbe631044bdce4eac4a94473a7f7971601ddf7d1526` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:12b7bdfafe5133a020745fbe631044bdce4eac4a94473a7f7971601ddf7d1526` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:12b7bdfafe5133a020745fbe631044bdce4eac4a94473a7f7971601ddf7d1526` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:943c1d220d3ca69ef5d54969694444b510a1386b77e957194cc157d2fa8fad9a` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:19765f30b6ab86d05cd5b9ecf894d29d281a33f5348441509bf0ae4d2fb9361c` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:e5b0fd4d95e9209fc67724bf20806d3040dd8432c0725cf3138554fcc08813f5` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

### config-policy-precedence-incident / context

- branchName: `engi/remediation-need_config-policy-precedence-incident_fda9bc8068-config-policy-precedence-incident`
- needId: `need_config-policy-precedence-incident_fda9bc8068`
- assetPackId: `asset_pack_83536cbc4e2b`
- proofContractHash: `sha256:ee4951ad087df4a7c043205d7ba960a104da473c3fa0a4c4ac9e56d774e3bc01`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:64f068056438594ab0898143b078fed9376fe9b1953d1fc5720febe614b18649` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:9c0cbfadf5553b81a90cff6e21457a1acec8494bc787eb15f720bb3868bd9460` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:d500ea8f3263bda6567cc58191435dcf8df550124aafcf8331444e9776f2cd9f` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:833ab776e48a835f06f16e67375172dcd0232fbb789a8ae17a0edc009693002c` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:9c158dd4812879248e669bac476c01fc3609becadeddad7eca67874cda683f5c` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:dcd7dc3c3ebb3bfe573c9902b5e2b040231780492fc49e7c7e8a307f9656a7a1` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:ee4951ad087df4a7c043205d7ba960a104da473c3fa0a4c4ac9e56d774e3bc01` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:dc78b71b262b8446f39ed92e77504ee846cdd10df217b9d46fafbed2e94c29d0` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:40cba954c5b7f81506a65479ab7e20f6dfef1764331f6ccf624950cdacc74d07` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:4b6940291b1ea93f442e6db39b39d696396c5d17d45ab2161a7ce4879e77a2a7` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:5aa859b6524717aa404a1df2c920aad3c534c0abe38562268f9f338c61c3ce05` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:feeea25af33e049d2627f9f04f7555785e2de3109ad43740f4bbf3a966bdf8d3` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:64f068056438594ab0898143b078fed9376fe9b1953d1fc5720febe614b18649` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:069048d8d5ae61ad434b314ed0eaa189254d82ba55947900a9c1d21f83472313` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:2c099b21ade3ab424c54f0f550f7d290366a218453d0008d042f81db5d52966b` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:819d98d18b9548e4c0dfae23e109821fc6c37235359be4b831c78e68ee511fcf` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:6ffc7539e53b4bf4aee6d40adb03f1c8e0036dea3fc9ee251090ea2995a26ee6` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:ff0abe845f127c3419bfe06ce94df739f4e350fd8ace855f49b363977d13d2e8` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:a0f3cb9761d4a77f0094399f3183af38b07d2df8339aa85f6a60a22dc4f9873e` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:9c0cbfadf5553b81a90cff6e21457a1acec8494bc787eb15f720bb3868bd9460` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:e7ff4fe23c0630aea7029ec4a5e4cf56390479ebfaf166b8a2c6bf0f64720a7c` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:f3876b9f2a08287db5eeaedd9dbd7f437d464cddb9e1205fb8879eed83c56f7d` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:87e757821d131fa2df34e7c0e0a5c76f5ea55ea17dfae329a367059262fbfe06` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:8c6e080cda15713a3041c35c6e9e891559a068b9bc4cd4cb9048e884c5c7d8bf` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:4bbb8072e53597f01b5137907e699135eb8daf779ba416d7f152b0ef55d853f5` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:501307fda8ba5ca845f985e7c2857595abc67ce54037f07ffa384080d45ca725` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:70194a33d4bf5685b29fa1ba2d4bf07e76f41e76261d0a23aced079c0af57c8c` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:d500ea8f3263bda6567cc58191435dcf8df550124aafcf8331444e9776f2cd9f` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:a237ec69c71c44c7e74235f77806ed73ad98d7b64821290da8de7d726fd827b8` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:c2afbdda1e1d29512f8d13967c9274350044590140b41fde09a26421330e26fe` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:4d74f2098be1060ea540b657a0e8948ed263f1bd908234d3edbfb673a1b2e155` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:251dbe8077527d7b001d9448417879400fa7676bccf34a33615366676e66fb73` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:833ab776e48a835f06f16e67375172dcd0232fbb789a8ae17a0edc009693002c` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:b727e318bed39f71209e542d8d8002b47b85f97301eaeb6b7f859391a760963a` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:498c267d069fb0d8b884af094432c297ef299d5ef7ec9d08ebb775a1eb1cb393` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:3810767c0b8e8a542aa8478c08c3d88033c698dd89452dea3b851b46d3c97f8c` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:0ac3b52e473348b07f2b48bd25ec393548a81f5bee294dc01859bddf9ece9fae` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:0a96b5b9f65d138f2f7c0887defce97f778b24578d3470a199a467c0d8695862` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:6f352a14dad0031d16c250a89bb49259208f631eecdcf9d5a639c4213775d0e4` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:9c158dd4812879248e669bac476c01fc3609becadeddad7eca67874cda683f5c` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:4d989cb25911b399166d41efa9e78580e6fbef6fa0231cd74462be4a1760cb93` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:acd346815389b2b321f6debb82a60a9de3e6314210c2ffdd605cb9dc6a96afc3` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:acd346815389b2b321f6debb82a60a9de3e6314210c2ffdd605cb9dc6a96afc3` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:acd346815389b2b321f6debb82a60a9de3e6314210c2ffdd605cb9dc6a96afc3` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:dcd7dc3c3ebb3bfe573c9902b5e2b040231780492fc49e7c7e8a307f9656a7a1` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:19765f30b6ab86d05cd5b9ecf894d29d281a33f5348441509bf0ae4d2fb9361c` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:e5b0fd4d95e9209fc67724bf20806d3040dd8432c0725cf3138554fcc08813f5` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

### unsafe-patch-review-recovery / patch

- branchName: `engi/remediation-need_unsafe-patch-review-recovery_5e7450e3af-unsafe-patch-review-recovery`
- needId: `need_unsafe-patch-review-recovery_5e7450e3af`
- assetPackId: `asset_pack_f6985f8e0e79`
- proofContractHash: `sha256:1843a8ca9474c81271cada2270d1da2a4c33e6048f4dd1347d1d037edabde3c0`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:4cc3d1b67dc2e9585b104b3ee3561f0df094199475cc2e82e49fa175d617c9c8` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:c9ee75cea3d61e34cd04009a84fd1559de9bf4990d2ffc7b12aa7ca0ad65c40a` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:79ad592faf6e2f6e4b68bcd477977a7bfb8ba69790a732e3869d541d207bf450` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:eaff8623f1d41dd787b3547799bc07101b2ed9685ff2b2fca67c557472dd142c` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:7c34f8ccd59a9b2bc0ff6e217b556d25cfe7352c21cc583e7f55ae7b3234aabc` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:b7160cb6b9ce35b6fb8acaefa1430b6833e2ce0da87bdaa620c1544ac6201583` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:1843a8ca9474c81271cada2270d1da2a4c33e6048f4dd1347d1d037edabde3c0` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:d327fca963228fa1045679e8b6356c56ffaf6bd3abc769c98b3ac732393fb0b5` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:8425e6dad5c0745b91fe2cf968aad75793ba2095db751ae6fd02aef6484f05e1` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:3f60fdb20286df308b2b1a16d5243b6e9e462dd2c0da8ae48107488ef78dbe4a` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:f44db2b2b18cf7566036b37b7dcd4524dea286cc5ae98dd7103a1d6eb52dfb0a` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:1a0077d2c76ab9e7925e770e0a9dbe831afa485c17035827ec5e3af2e93a39ba` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:4cc3d1b67dc2e9585b104b3ee3561f0df094199475cc2e82e49fa175d617c9c8` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:11cab5e8926ae4b3062957ef7394ffc3fdfe4ee2b1b7d6044a543f74f5ec9dfa` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:4a629e62925a065cd1e7ad2349b669b8ba74f22e827c7e49608a4248548b7624` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:78aec8ae003de63b3e39f0a5594c4997fa600de82c7c52cb41584dccc8a1341e` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:1c3f8d6ad1472aa9a5ad6c82467c88243b1a1604c1d4f64798bac55f480f1bd0` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:084a12d6c48107d0cef56a7c8a730360edca20906a297009dfda816070322688` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:76dc19ae5f2beda3a6f1835f2345368b5c79a4898dcf0f0e70a4714ff61754b8` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:c9ee75cea3d61e34cd04009a84fd1559de9bf4990d2ffc7b12aa7ca0ad65c40a` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:a2c966c967bcd246588ba5a382580a59b9d91ca489d1eb70b3bb83381b38c34e` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:33597421157b76db5cf8a03cbd19a5ef402fe38e871eb8286a34ccc689f7abe8` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:1db1a7f1aecf71f6906c597480339046e0eeec1bdf4f1ec149cc5afa969ecb81` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:5e787904ad0070828e08859de283cf632e9ba5e046136cefa4ef23325101fab8` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:5b4294670703e19376c9f2037c408549270353c745dfd46927757f5fad6e5941` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:6d85aaed7d0cf7270dc0b1a3f44b04df5487492cb02b8165e63c08e7efc38a7e` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:c85f5106252ff21e7f4e48a82f7364573580df4845621bdb1dc33743d5f812d2` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:79ad592faf6e2f6e4b68bcd477977a7bfb8ba69790a732e3869d541d207bf450` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:5ddc217a65e37f2f1af92e16f4b88868e4bd40d613272279236b40a894919c11` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:9727b7b272f6110c5b3af14dfddc45db33c5a171aa5784312503b22b6b42c5f2` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:52dc1d31b9183cea99344d8010067342547e64c6df9d51df23d3b2a7add5e154` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:8b0e1f48a14654a7544123454d7e188eb6243a76aafd1203cae10befcd1406f4` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:eaff8623f1d41dd787b3547799bc07101b2ed9685ff2b2fca67c557472dd142c` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:598137e015d7f91af3e394ff8915ee864caffa1e56a5eb16e7bbe40a4f4d1c74` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:a53710afd47c3cc26f6717d4cd67d6683d9f82a5c9ebc11622dfcf641ae15d3d` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:beba0d1ad2a1ba9989fd7597acba95c24c6983a700309cce4d6974c7e6836647` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:ea5122054a8809e445003a58177dae4c7e08597092e0539e02cadf6b55904b7a` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:9e90903a058973b6b9ab0ccc1c8a20364da83b0121a5173c703c2a8983922751` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:2addfae1cfa9beffd40d92df9d160c68f1e460abbb4bd3ede02bbd83f28bcb8d` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:7c34f8ccd59a9b2bc0ff6e217b556d25cfe7352c21cc583e7f55ae7b3234aabc` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:4d989cb25911b399166d41efa9e78580e6fbef6fa0231cd74462be4a1760cb93` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:a6db6be03cf226c97ab037110e56ceef2290db65413962fa4e2573662b36eaf8` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:a6db6be03cf226c97ab037110e56ceef2290db65413962fa4e2573662b36eaf8` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:a6db6be03cf226c97ab037110e56ceef2290db65413962fa4e2573662b36eaf8` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:b7160cb6b9ce35b6fb8acaefa1430b6833e2ce0da87bdaa620c1544ac6201583` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:f33baedda4d06a523ce1f5c2a3ee5d53f84cd4c80fcd20d0a748e5a6aca4a13e` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:dfc75df92beb259d2c38fe00694de9220f2c7d1a74a58498fa78df2c48d167d1` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

### unsafe-patch-review-recovery / context

- branchName: `engi/remediation-need_unsafe-patch-review-recovery_5e7450e3af-unsafe-patch-review-recovery`
- needId: `need_unsafe-patch-review-recovery_5e7450e3af`
- assetPackId: `asset_pack_f6985f8e0e79`
- proofContractHash: `sha256:1843a8ca9474c81271cada2270d1da2a4c33e6048f4dd1347d1d037edabde3c0`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:4cc3d1b67dc2e9585b104b3ee3561f0df094199475cc2e82e49fa175d617c9c8` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:c9ee75cea3d61e34cd04009a84fd1559de9bf4990d2ffc7b12aa7ca0ad65c40a` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:85f591ac47d1fe896548bc1da86f3ec3c972117e2b2dd73748f0855a11cd021c` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:eaff8623f1d41dd787b3547799bc07101b2ed9685ff2b2fca67c557472dd142c` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:d466a366d050c67106e01c72eb42f5e22cf1911216b0431c959cf53d1e7c6721` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:16d712608378023e94cc75ec0976231c36c1a87b081a14be2327fce83e708aa9` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:1843a8ca9474c81271cada2270d1da2a4c33e6048f4dd1347d1d037edabde3c0` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:d327fca963228fa1045679e8b6356c56ffaf6bd3abc769c98b3ac732393fb0b5` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:8425e6dad5c0745b91fe2cf968aad75793ba2095db751ae6fd02aef6484f05e1` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:3f60fdb20286df308b2b1a16d5243b6e9e462dd2c0da8ae48107488ef78dbe4a` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:f44db2b2b18cf7566036b37b7dcd4524dea286cc5ae98dd7103a1d6eb52dfb0a` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:1a0077d2c76ab9e7925e770e0a9dbe831afa485c17035827ec5e3af2e93a39ba` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:4cc3d1b67dc2e9585b104b3ee3561f0df094199475cc2e82e49fa175d617c9c8` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:11cab5e8926ae4b3062957ef7394ffc3fdfe4ee2b1b7d6044a543f74f5ec9dfa` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:35566a276401315c5fa8d04604063d704f19162d145ba16b2f358c4568570664` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:bd61e2d819f7a9db5a97de02ff9e04c7dcc1ac829d0beb0ad6077c8035861d6d` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:1c3f8d6ad1472aa9a5ad6c82467c88243b1a1604c1d4f64798bac55f480f1bd0` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:084a12d6c48107d0cef56a7c8a730360edca20906a297009dfda816070322688` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:76dc19ae5f2beda3a6f1835f2345368b5c79a4898dcf0f0e70a4714ff61754b8` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:c9ee75cea3d61e34cd04009a84fd1559de9bf4990d2ffc7b12aa7ca0ad65c40a` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:a2c966c967bcd246588ba5a382580a59b9d91ca489d1eb70b3bb83381b38c34e` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:33597421157b76db5cf8a03cbd19a5ef402fe38e871eb8286a34ccc689f7abe8` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:1db1a7f1aecf71f6906c597480339046e0eeec1bdf4f1ec149cc5afa969ecb81` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:ef8a2064b6657c9ed6036c2c72ea1f643d7a791a3558f2f92dd171d655fe34e0` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:5b4294670703e19376c9f2037c408549270353c745dfd46927757f5fad6e5941` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:6d85aaed7d0cf7270dc0b1a3f44b04df5487492cb02b8165e63c08e7efc38a7e` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:93f46cb31c5f1f03250cc82aa2c5b07436d4a969bddd63b40fbb42b3e97f526d` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:85f591ac47d1fe896548bc1da86f3ec3c972117e2b2dd73748f0855a11cd021c` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:b6ce41d25066464f34fbcc91c214c39dbee6bcc31c22bb12d76ba947c38851c6` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:9727b7b272f6110c5b3af14dfddc45db33c5a171aa5784312503b22b6b42c5f2` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:52dc1d31b9183cea99344d8010067342547e64c6df9d51df23d3b2a7add5e154` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:8b0e1f48a14654a7544123454d7e188eb6243a76aafd1203cae10befcd1406f4` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:eaff8623f1d41dd787b3547799bc07101b2ed9685ff2b2fca67c557472dd142c` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:598137e015d7f91af3e394ff8915ee864caffa1e56a5eb16e7bbe40a4f4d1c74` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:e823e2986ba3e3ddbdd33f15e8da59e021ec3fee526e227c3044f18ddc48dd77` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:73bea5a500b05382e3949cf16be54993c2e5ca2acef6dc63c03ce66cc7ee4995` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:1ebafb1c3a3d4be7e7ba399e3f29963e6236e10f2e02c463abbf75db89b86ea9` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:635f336752715f73b3d747d3e5645888b856561c652ed09d37ab75a3fe5964a2` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:d94e88005c07fe16edf6405bb7867249dbb76291b6b35aba678b546186ff29cd` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:d466a366d050c67106e01c72eb42f5e22cf1911216b0431c959cf53d1e7c6721` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:4d989cb25911b399166d41efa9e78580e6fbef6fa0231cd74462be4a1760cb93` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:33ae86a8e0760247696dc1f0d561d7f8d56d4090086ced7dd5cb5c649c4bf231` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:33ae86a8e0760247696dc1f0d561d7f8d56d4090086ced7dd5cb5c649c4bf231` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:33ae86a8e0760247696dc1f0d561d7f8d56d4090086ced7dd5cb5c649c4bf231` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:16d712608378023e94cc75ec0976231c36c1a87b081a14be2327fce83e708aa9` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:f33baedda4d06a523ce1f5c2a3ee5d53f84cd4c80fcd20d0a748e5a6aca4a13e` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:dfc75df92beb259d2c38fe00694de9220f2c7d1a74a58498fa78df2c48d167d1` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

### infra-deployment-mismatch / patch

- branchName: `engi/remediation-need_infra-deployment-mismatch_fc5c599b31-infra-deployment-mismatch`
- needId: `need_infra-deployment-mismatch_fc5c599b31`
- assetPackId: `asset_pack_d72be312e67f`
- proofContractHash: `sha256:7f457dda919d5817bbb52b1ffe3dec1c490f46f0c38f10a465fe81dc93767f83`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:960b79f66f20d33fcb0e553d0363f9e67d24f1a465f104b3d2d8b4a7219e2cce` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:77aec6036f1182ac4951325c2ddc06fe16ff76731eba9163a29187ffe0a5222d` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:d7b1499366db4c48d03745e31c4878b24eb8acc4a1ab2939fbff59ca58c632f9` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:4f5844fccf6cbf7030eb7f978f3b38d46d14cecfe4dfedd6f87ec6943a4d558d` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:1f0028f8025326184f331f9f2b620f2591ab6ad9a901c89558c58b36e6688637` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:3ccd70f5301b1746b693777264a2ee914674c77f6deb7aae42e48c35967d2ff7` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:7f457dda919d5817bbb52b1ffe3dec1c490f46f0c38f10a465fe81dc93767f83` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:cf37e621f7eb597306993b911e9e9a4626c51a3ed66a73ea72d9a15b45e536b5` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:f90e7d4fd6c9853da0843b4efcd31a786b8994acfbfff59e7fb27888952c7132` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:ce546aefe8c03b0274f5c724d2f90d0ca8856b30d00b71e09b7904c87d67e3e0` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:830415b16a40cf53d173687264da215e9555356aaadfd74d7f29fb09b37f845a` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:1d3ae220ae29291901262e0c7c3c468e562123b876b3c0f0766c6e554aa4fdc5` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:960b79f66f20d33fcb0e553d0363f9e67d24f1a465f104b3d2d8b4a7219e2cce` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:f5c7d7346dbb8354829473a165ddf21c757d8b5b557de6f93ec8c377a65b500a` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:bf512d3da7baf2c9a003c8793fd1b8edaf000edcc8c1a9426531e11067f06ab3` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:da940ff70de9f662d53e3cff40b3250274f5fbbdd27f804b680ea35aa33989cc` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:3d755cf72e023d7fc55381740c43382ef8d1b59b3864db8202c5253dadd97410` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:6313122d31d538785f5dea17e044bbb4f72accc212e81e9c5c4ffd52a7e43b39` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:7853efc8d14d7bb1312320776892dd12e06e8a856cf84aca51b81d797cf159c3` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:77aec6036f1182ac4951325c2ddc06fe16ff76731eba9163a29187ffe0a5222d` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:90daf332caec2fa408cc806a2d0809bc3d4a1e23bd993a990814a0978a4fa36e` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:51b53e076f2a659bdf8a0b27c15b61264eec37490a5ee3bcd2b0d82201340cfe` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:f955cda9d13450bf033285c09ee2fd9a24ee9d223c97ffcec70c3a871f94fa8a` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:9339bb9c076e7e0bb0f12ba7c932baca61b8d3f107379623dc55719798516e66` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:222d4b22a0193d857c32df7cb39ecb57cc9fd58af99701d0f613250e2dd9bcf1` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:b0acbf48dbd4c5a4202a8683fc011822c96f6d7c566fd287412d544f7de1b4be` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:0209495d80da84d8a964587f6c395c54c487c26ebd2eb655aad495de2c3f7155` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:d7b1499366db4c48d03745e31c4878b24eb8acc4a1ab2939fbff59ca58c632f9` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:0149682bb951e07fa3983b21be6228d4cb446d00866480ac188678eadef26b01` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:76d150b83559dd5e00dcf4bbe38189c6dc4452890bbd66c6f75882f9acf240a2` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:eab23f48598ce3655d7c72cbff1fef64f093d4c2030839bcdbad78b0d63f96d7` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:e4e5519fba2522cf53ede4fe68b909bebb8b8d6860e82c0c785b9f2b6f0e2c12` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:4f5844fccf6cbf7030eb7f978f3b38d46d14cecfe4dfedd6f87ec6943a4d558d` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:a48fdf7a8abaffd84dff3a1f9c9ec3f8c304385e1926b65391e6279c9cba9792` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:588be9f063a3354058c059ae8234232b558b1c8f86c0b195d6ca06a1215eeaf4` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:b36936fb7ec8cc256a8d68ee2a022356b57cd3e319326355c9b4269474385276` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:1c4e6b6198585d08ca0687b0ea6def0a3f24e1ee61f365dea740b23d893df0d7` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:657dac6484ced02483376dc0544dd184f167dcfe1b95f8f409efe1426b5a503a` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:2e7b31595b3a2f57468d3afd24dc3b4801a9de19961816600e13e0337dd9cf00` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:1f0028f8025326184f331f9f2b620f2591ab6ad9a901c89558c58b36e6688637` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:4d989cb25911b399166d41efa9e78580e6fbef6fa0231cd74462be4a1760cb93` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:662edac7ecedfb3200f6c3d5a8de4af6b7760ddbd2adf21d2f0e023550c8e698` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:662edac7ecedfb3200f6c3d5a8de4af6b7760ddbd2adf21d2f0e023550c8e698` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:662edac7ecedfb3200f6c3d5a8de4af6b7760ddbd2adf21d2f0e023550c8e698` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:3ccd70f5301b1746b693777264a2ee914674c77f6deb7aae42e48c35967d2ff7` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:e79f5134b5b22dbffb047c51cce2796ef82ca5d7f380db8ce6e1a5b313e1a5f8` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:03961a4a97b587b72b55a09d8e4bf3d27231d08057e1163d654bb6cf862b9baf` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

### infra-deployment-mismatch / context

- branchName: `engi/remediation-need_infra-deployment-mismatch_fc5c599b31-infra-deployment-mismatch`
- needId: `need_infra-deployment-mismatch_fc5c599b31`
- assetPackId: `asset_pack_d72be312e67f`
- proofContractHash: `sha256:7f457dda919d5817bbb52b1ffe3dec1c490f46f0c38f10a465fe81dc93767f83`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:960b79f66f20d33fcb0e553d0363f9e67d24f1a465f104b3d2d8b4a7219e2cce` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:77aec6036f1182ac4951325c2ddc06fe16ff76731eba9163a29187ffe0a5222d` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:f09f2d962690d984b11964887d2edf0d6390f3251a199559d64730ba711264ef` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:4f5844fccf6cbf7030eb7f978f3b38d46d14cecfe4dfedd6f87ec6943a4d558d` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:5236752a2d4beada853dfd65384526b5492bf579de316629a9d86eec25ffe3a1` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:71b53413ca39ab934d85f494c3608d0d989cb2ef736b51f5e052e2d1d1bc8004` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:7f457dda919d5817bbb52b1ffe3dec1c490f46f0c38f10a465fe81dc93767f83` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:cf37e621f7eb597306993b911e9e9a4626c51a3ed66a73ea72d9a15b45e536b5` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:f90e7d4fd6c9853da0843b4efcd31a786b8994acfbfff59e7fb27888952c7132` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:ce546aefe8c03b0274f5c724d2f90d0ca8856b30d00b71e09b7904c87d67e3e0` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:830415b16a40cf53d173687264da215e9555356aaadfd74d7f29fb09b37f845a` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:1d3ae220ae29291901262e0c7c3c468e562123b876b3c0f0766c6e554aa4fdc5` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:960b79f66f20d33fcb0e553d0363f9e67d24f1a465f104b3d2d8b4a7219e2cce` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:f5c7d7346dbb8354829473a165ddf21c757d8b5b557de6f93ec8c377a65b500a` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:99dfc6d3058ca01d76386d9cb854fa5d8014b57723ad0d0ceb1b300f3daad1e8` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:5473ff160825ad3cb3e9b2935eda402edaa8f3f50b75a02b3d4fcdfda6408994` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:3d755cf72e023d7fc55381740c43382ef8d1b59b3864db8202c5253dadd97410` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:6313122d31d538785f5dea17e044bbb4f72accc212e81e9c5c4ffd52a7e43b39` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:7853efc8d14d7bb1312320776892dd12e06e8a856cf84aca51b81d797cf159c3` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:77aec6036f1182ac4951325c2ddc06fe16ff76731eba9163a29187ffe0a5222d` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:90daf332caec2fa408cc806a2d0809bc3d4a1e23bd993a990814a0978a4fa36e` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:51b53e076f2a659bdf8a0b27c15b61264eec37490a5ee3bcd2b0d82201340cfe` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:f955cda9d13450bf033285c09ee2fd9a24ee9d223c97ffcec70c3a871f94fa8a` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:5522bfc3a6e9d8a63aa8b320c77ead10394af199630c4daa578d8ce157c1d94e` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:222d4b22a0193d857c32df7cb39ecb57cc9fd58af99701d0f613250e2dd9bcf1` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:b0acbf48dbd4c5a4202a8683fc011822c96f6d7c566fd287412d544f7de1b4be` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:81ee46080c8927cd1f6fa83aa9884b03733c8c9cf088d2115269476b702b9206` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:f09f2d962690d984b11964887d2edf0d6390f3251a199559d64730ba711264ef` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:d97bd98ece76c448ca762c84fd23123ef072887c16f14e64b97eaffc37612a18` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:76d150b83559dd5e00dcf4bbe38189c6dc4452890bbd66c6f75882f9acf240a2` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:eab23f48598ce3655d7c72cbff1fef64f093d4c2030839bcdbad78b0d63f96d7` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:e4e5519fba2522cf53ede4fe68b909bebb8b8d6860e82c0c785b9f2b6f0e2c12` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:4f5844fccf6cbf7030eb7f978f3b38d46d14cecfe4dfedd6f87ec6943a4d558d` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:a48fdf7a8abaffd84dff3a1f9c9ec3f8c304385e1926b65391e6279c9cba9792` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:5b64e75dec3096df4932dc50a32ec158dfcb0156a416316b5e4afc2fde4b0b74` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:36fd4691c45cda5495bb96fec86bfe8a205b651e80a9e152bdfb8bdc06bd12ac` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:d10e2b9144d9b586bc679768cb40fe3bbacacd4ec7914d1c8e017fd725d7b188` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:43d8ceb629929f7266911b81a2f20de440c3d40fd5e32a368cf3dd91f8060dd8` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:07e560c3fdb60d5d33c13b79d8ae3f2881101966695f23add5927c6d0bbd7a5e` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:5236752a2d4beada853dfd65384526b5492bf579de316629a9d86eec25ffe3a1` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:4d989cb25911b399166d41efa9e78580e6fbef6fa0231cd74462be4a1760cb93` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:408641ed556049d8a40f87bfb6b17162dabe65534da1a169b6f53473996664cf` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:408641ed556049d8a40f87bfb6b17162dabe65534da1a169b6f53473996664cf` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:408641ed556049d8a40f87bfb6b17162dabe65534da1a169b6f53473996664cf` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:71b53413ca39ab934d85f494c3608d0d989cb2ef736b51f5e052e2d1d1bc8004` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:e79f5134b5b22dbffb047c51cce2796ef82ca5d7f380db8ce6e1a5b313e1a5f8` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:03961a4a97b587b72b55a09d8e4bf3d27231d08057e1163d654bb6cf862b9baf` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

### privacy-boundary-proof-export / patch

- branchName: `engi/remediation-need_privacy-boundary-proof-export_4b53f9e7b1-privacy-boundary-proof-export`
- needId: `need_privacy-boundary-proof-export_4b53f9e7b1`
- assetPackId: `asset_pack_13d8cd4543f8`
- proofContractHash: `sha256:b7bc31e9fa42840bf60b64f7f28311120ce715bd9df6e77cdd719e94728cec0e`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:e88ad2f599dd54c59cc90883208face70a4c73a49b4eea98cdc1ebdc9ced159c` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:3f2b77e0841bf529d949a4eff9f3cd0eda0470a0f77fb142d7d4c59155b49e78` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:f77985e0d3f2c13d511ae7a1c17656773f8805b58283a45f721b2e77d0510611` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:9cde4b1274b40d04a032d6934168fbc9447b5a098c9ce34053ddbaa1652e589c` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:083bc45cf43700bb1e06691bceabeda055643d6ade502fe3f38e95654165c1b2` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:e1dd475e73a203d96511a07000b1d0390cab15fe0e15f0a56b3d2a46e6d86fae` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:b7bc31e9fa42840bf60b64f7f28311120ce715bd9df6e77cdd719e94728cec0e` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:fa16cdfbdef7812b8b3431c4519ce684b816a3133ca9c188cf8e8b52d56010a4` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:fc5a0366e9c9dacc0cc18527037cdd6535fbca1ca2107c7a2fff06f43fc6ba78` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:7531116a59bbfba724ddad7a4ed770fee3bb9690bd1b779541b367d210f30ac8` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:62ab1f9c93c9195fa3532a76f51f848202b9fe518abc6a7596c4cfd0be7a44b2` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:5b4be4aa930fccca0598702d652e1886e6fe37803b047861f6b238e134c5cf9b` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:e88ad2f599dd54c59cc90883208face70a4c73a49b4eea98cdc1ebdc9ced159c` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:e7904fa5d502c37800b407ea74f0989b5d7a60fd8a286297ebf3e3447828b628` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:b92ec6bdb8d58387c349d603ef4922710d7a4e1a120c43594bd9ee5c1cd78a72` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:1f5d460c29d4cfe2ab44e64a54014a95bd64a9a3746b217a7830cd1a128e320b` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:391848bc3a027dc5be08079eb90a1c83b0f1aca9840017506637178e9089279d` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:703e1f5512efe767945db1a3db8c39ae152aa66458e3847c8f903dc098f0924d` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:ec3c4321c38a0985fabee9f3d753ccc8732d5ecd0636f1638a1b0973ec4b8226` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:3f2b77e0841bf529d949a4eff9f3cd0eda0470a0f77fb142d7d4c59155b49e78` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:9f917f383ac40becbb1066e58624ab414558607ff4fabff8262666d1cc1f93f8` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:b8eda3bd18f3fe76d2338d1906c2530d7c97a9c2e8ffdf079d6ea1bdc4474252` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:01652d36bfbda53274d28595bf709d4006c2c5c359de2cd1ff7371d04878087a` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:4eb6733f2bf1b701c0069365d3dc0f301a18c20811354abccf0bd16f914feb80` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:737a8690c695236f403e2e6bd238e9b8b8fc4f2406a31dbcf83154c109efeeea` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:d2bb74466474b95020ef27ac13ab2978c4b4fe1d19cb41146414f38dfca8200b` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:7bb41f62625e0c95fccce15d4db3734564e9975eeb0b7ee2825f000995e458e3` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:f77985e0d3f2c13d511ae7a1c17656773f8805b58283a45f721b2e77d0510611` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:1e43b96aa27aadd7eaea290d3789ef0b78d45b2b679476e9bd491ce81b039de3` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:5acabde65270465269b354d09bd714de0bbf827446ed03872d0bcd7b1fe114b3` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:1e4b0c335474caa1db76212c88fa6c3e31b6fa804138678acd94d06d650ffe92` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:f571413acb2cada27ba06a41d5418c6a80ff10be539f326e83a053fac523a7f7` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:9cde4b1274b40d04a032d6934168fbc9447b5a098c9ce34053ddbaa1652e589c` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:d34ccd4a1775a847599e5ec5518c01ad8c9b74afc104d0b376a164b781a7916e` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:469cece5dda14eaaffff0bc7de680e4d694c5540dd14adca47fc069b2233cb48` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:0b1726efc73fb9f29b3455fde3d355ca4e3e4f81ccc595d149572b02bc9db4c3` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:327d467b44d67a2a3aa2e945b8cd6a2dbb87b7c4239384812b45308dc5ff2c0f` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:9d0d560aac53b9e8ecbf0d3fc8c75c8bc129c4e91e4366e440e6ca2239b787bf` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:5bb364fed99c2e4f7ebd210c68a835ea7b21c53c864ff80244092c2c368e1fb2` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:083bc45cf43700bb1e06691bceabeda055643d6ade502fe3f38e95654165c1b2` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:4d989cb25911b399166d41efa9e78580e6fbef6fa0231cd74462be4a1760cb93` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:7df71c664ec161541393ae282b2cfcbff085cb6ca0d7d88bacdcf4d1568ca17a` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:7df71c664ec161541393ae282b2cfcbff085cb6ca0d7d88bacdcf4d1568ca17a` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:7df71c664ec161541393ae282b2cfcbff085cb6ca0d7d88bacdcf4d1568ca17a` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:e1dd475e73a203d96511a07000b1d0390cab15fe0e15f0a56b3d2a46e6d86fae` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:e72ff1d677d0c5b48e7bdf2c69c04767153f0df1c2449c8415c0df8a645ccfcc` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:9b4e736c6d5e204fe73eb4363038c10d82b981041c29ae44a6e88ce77db02ac9` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

### privacy-boundary-proof-export / context

- branchName: `engi/remediation-need_privacy-boundary-proof-export_4b53f9e7b1-privacy-boundary-proof-export`
- needId: `need_privacy-boundary-proof-export_4b53f9e7b1`
- assetPackId: `asset_pack_13d8cd4543f8`
- proofContractHash: `sha256:b7bc31e9fa42840bf60b64f7f28311120ce715bd9df6e77cdd719e94728cec0e`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:e88ad2f599dd54c59cc90883208face70a4c73a49b4eea98cdc1ebdc9ced159c` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:3f2b77e0841bf529d949a4eff9f3cd0eda0470a0f77fb142d7d4c59155b49e78` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:446151034d8bb88035e40fb5cfc4731a3b152aad29b594adb666241b8d7dbb29` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:9cde4b1274b40d04a032d6934168fbc9447b5a098c9ce34053ddbaa1652e589c` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:e1893eb06b19663a7186fd47eec70f6bfb1175cf004c9ad93bafc3259bc77d0c` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:b2a0d044c4439b284dfacc5138707c0c7e6494f74b6610f8e54eea5842daec7e` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:b7bc31e9fa42840bf60b64f7f28311120ce715bd9df6e77cdd719e94728cec0e` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:fa16cdfbdef7812b8b3431c4519ce684b816a3133ca9c188cf8e8b52d56010a4` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:fc5a0366e9c9dacc0cc18527037cdd6535fbca1ca2107c7a2fff06f43fc6ba78` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:7531116a59bbfba724ddad7a4ed770fee3bb9690bd1b779541b367d210f30ac8` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:62ab1f9c93c9195fa3532a76f51f848202b9fe518abc6a7596c4cfd0be7a44b2` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:5b4be4aa930fccca0598702d652e1886e6fe37803b047861f6b238e134c5cf9b` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:e88ad2f599dd54c59cc90883208face70a4c73a49b4eea98cdc1ebdc9ced159c` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:e7904fa5d502c37800b407ea74f0989b5d7a60fd8a286297ebf3e3447828b628` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:ada68eb9067b03a49a506a8d3e62822ed39eeab52e4a37a0d1434fbaf15faf48` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:10d0a6e6252ccda210dc89f0f349629c79d172cc28d4051af1a939be7b148267` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:391848bc3a027dc5be08079eb90a1c83b0f1aca9840017506637178e9089279d` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:703e1f5512efe767945db1a3db8c39ae152aa66458e3847c8f903dc098f0924d` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:ec3c4321c38a0985fabee9f3d753ccc8732d5ecd0636f1638a1b0973ec4b8226` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:3f2b77e0841bf529d949a4eff9f3cd0eda0470a0f77fb142d7d4c59155b49e78` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:9f917f383ac40becbb1066e58624ab414558607ff4fabff8262666d1cc1f93f8` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:b8eda3bd18f3fe76d2338d1906c2530d7c97a9c2e8ffdf079d6ea1bdc4474252` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:01652d36bfbda53274d28595bf709d4006c2c5c359de2cd1ff7371d04878087a` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:c17714d3d75db63a91cc9ae686ad1bc53ca719bd14b5a8b3918bef1dd6227547` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:737a8690c695236f403e2e6bd238e9b8b8fc4f2406a31dbcf83154c109efeeea` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:d2bb74466474b95020ef27ac13ab2978c4b4fe1d19cb41146414f38dfca8200b` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:e8002f6eca1684922e9b586600a96da11d3bec797f49076b8d8d9841b79afcb8` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:446151034d8bb88035e40fb5cfc4731a3b152aad29b594adb666241b8d7dbb29` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:52bc34e72a133702d1b643956116e1d2426ab9068b18e32b2f6978d72a03eb30` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:5acabde65270465269b354d09bd714de0bbf827446ed03872d0bcd7b1fe114b3` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:1e4b0c335474caa1db76212c88fa6c3e31b6fa804138678acd94d06d650ffe92` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:f571413acb2cada27ba06a41d5418c6a80ff10be539f326e83a053fac523a7f7` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:9cde4b1274b40d04a032d6934168fbc9447b5a098c9ce34053ddbaa1652e589c` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:d34ccd4a1775a847599e5ec5518c01ad8c9b74afc104d0b376a164b781a7916e` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:b7c541c9d62bbbbe372c31d4c3ce665c1ba51259d3e6886205c55cde9b141bc9` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:c39ca20dac8381b93ee44394b6a31209ba3dd506f77ebbd7e3af386e3a838f51` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:6e99ba3c7efd9d699e3a44310c5c182e0f711528e9ae248a4beafbe033de7c66` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:e71f0762f873135856fc7209439e7f88bb850494af7153594c0aaadc94e7f0b1` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:29f274afa580da7689f34208d29d3e2761a80dc77565612d7dada1c307eb729d` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:e1893eb06b19663a7186fd47eec70f6bfb1175cf004c9ad93bafc3259bc77d0c` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:4d989cb25911b399166d41efa9e78580e6fbef6fa0231cd74462be4a1760cb93` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:eced0f5de8624d86bab09e85da6b44bff47e1ed16fff729e5c426469d2743cf1` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:eced0f5de8624d86bab09e85da6b44bff47e1ed16fff729e5c426469d2743cf1` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:eced0f5de8624d86bab09e85da6b44bff47e1ed16fff729e5c426469d2743cf1` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:b2a0d044c4439b284dfacc5138707c0c7e6494f74b6610f8e54eea5842daec7e` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:e72ff1d677d0c5b48e7bdf2c69c04767153f0df1c2449c8415c0df8a645ccfcc` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:9b4e736c6d5e204fe73eb4363038c10d82b981041c29ae44a6e88ce77db02ac9` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

### polyglot-gateway-benchmark-remediation / patch

- branchName: `engi/remediation-need_polyglot-gateway-benchmark-remediation_c94ea2defd-polyglot-gateway-benchmark-remediation`
- needId: `need_polyglot-gateway-benchmark-remediation_c94ea2defd`
- assetPackId: `asset_pack_6c4cb819a469`
- proofContractHash: `sha256:7bbb7d318aa00058a95e419fd6cf4bad0701cfeb9bbc4fd1bbc1bb215d85b3fa`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:9615311663ac64304af76df8ee5d1082786879dd0e23cf0f049be03f437a90ec` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:107aa2faaf86ba4077ddf20762c7349bbb7c92c62cd3e365c12b68a32722ab33` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:248d2984f747f4b61d26fd5dc7d3ac2719d7c007514f5734df7508f3a22b47e8` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:7f74858ff3b66bae2cd55a208af4b2b7f74f66c890b1a48a1200a75293b6ceec` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:1af65fe0adaf5ba7ffa932b4398fb6a031dfc33181ebfefa7fdf94e89c049598` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:f619b641cf346d246cfbd05016d87c38bb1702899493c924ec57246929b833fd` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:7bbb7d318aa00058a95e419fd6cf4bad0701cfeb9bbc4fd1bbc1bb215d85b3fa` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:7e5a7c4e8bdeee2cbc89efba0ccea3115599349778a8ee2175f03d13b17b8ebe` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:25131ae6a3b3279ca2c930abb85585cbf13cbcda2b825006b750462f175f2449` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:2d027b30e913eda3562eaf652b4ef6654fa6972b35443b3784776eceed43ecec` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:9fa2faa7d8b0dbcdbee3b6808156164004300404004870a13388db0994951530` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:066c7d088145d3ecd6165ca643f4bb3ab211c525d28b6a9236d4da0b496e5c24` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:9615311663ac64304af76df8ee5d1082786879dd0e23cf0f049be03f437a90ec` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:535c7f19abdf756d730c3115177239545eb3021e7108661da0a6e6b2ff3eb264` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:9ff723fb08884710aa574cade42b7298d10ca8a6d2f77186d2c14c85117c0c19` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:5be95e48b9b56cbeba326f7984c1e69efd0be6c75fdcf2bc61cc07167e67a343` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:75d41434efaf115b7cd6aa8fbee55e43bf81983e9be44b7c2d1dafab1a5ffbe0` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:418b73250144638f44118ca5410bcb7b8672d204f75ec5865ee62dd40b2b1c45` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:18201ad75590f20951735ad0dacf11a628fea810bd4f57e7e993089b6c8d74b7` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:107aa2faaf86ba4077ddf20762c7349bbb7c92c62cd3e365c12b68a32722ab33` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:7f55e8d7bfee33842a11225b77124ef925fe9eac4467b3c39de7bb43c9099358` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:02d3807591b33d62b02eb0c8ad008cda8dc5cc6d7114cc11d18f45ce0fad76f6` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:7a474755eb0dbc52fb109b293ee6d52b9095f1d18228bf3f2d58766d6b25171f` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:ecde252dd78c8a056ca7884128034348655982d1ee3fd4f28da8258a2b842f91` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:3f29b4d8324602242389b68ff7b8dc745fb422b1b5e44e2f5bf4a3bb7e2b0ffe` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:c1e577b132475f4b327b593f0ec0052f8bb6668c7efad0693bfdc79debd96f2c` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:a384e1fecde1ca06c032958c9b417c6f1a50e0ffdf80138875d8c5fe7c699db7` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:248d2984f747f4b61d26fd5dc7d3ac2719d7c007514f5734df7508f3a22b47e8` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:fe126d2bd74b3e11e17ffb5c82a03fcb2cf295cc9870f0f81228425a99785e06` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:218afb55c4d23e609449c56d75fcbc4d514badb7738c815001112c04b9aaf1ac` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:31d6cb2b0ef6de6ba8b31b0695437a77b6e01a8ec65d27078752824497647e87` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:922e00edfc36d11bc533aa829eefcf54f1335201850926b4c6b27b3c18d9069f` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:7f74858ff3b66bae2cd55a208af4b2b7f74f66c890b1a48a1200a75293b6ceec` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:fe54cd3eea7782d864efc2ba3f8ff93ab08650e0e7cef13fe4ac55e7a700f33d` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:0e163be8dcb2d43563bafb0b933643857bbb946474731846fbc1c64b406243c6` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:9b8455ebc0ae2c791fef6d35589542aa3ad0c5f4851f8e16fd4c0fe1e8bdf40e` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:f2bceb66daf6c2a704963da22a56a2b34c9b099f145247b530095a9491aba80b` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:2dce6bf6e4b4ccdade144fb82c77903f3e4100e65065229de6c9c0cb9f0a20ba` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:88cfcb0808c99d7a04f30c202b0fbe88c9ce00340a7e0ede4b23d4b98fdbdcb9` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:1af65fe0adaf5ba7ffa932b4398fb6a031dfc33181ebfefa7fdf94e89c049598` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:4d989cb25911b399166d41efa9e78580e6fbef6fa0231cd74462be4a1760cb93` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:04aa888292fa410be410ee26570350ebe03e34cfb36ff2b4e8e9ea81a0bea896` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:04aa888292fa410be410ee26570350ebe03e34cfb36ff2b4e8e9ea81a0bea896` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:04aa888292fa410be410ee26570350ebe03e34cfb36ff2b4e8e9ea81a0bea896` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:f619b641cf346d246cfbd05016d87c38bb1702899493c924ec57246929b833fd` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:018e847269bf941b8fbfba50e32467c00b1d68f733820520912c4a13bbef2c04` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:c314c0ccdb5074d9b972c7a2227e0d7234821c5295e4d0ae90a9e11e91056dfe` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

### polyglot-gateway-benchmark-remediation / context

- branchName: `engi/remediation-need_polyglot-gateway-benchmark-remediation_c94ea2defd-polyglot-gateway-benchmark-remediation`
- needId: `need_polyglot-gateway-benchmark-remediation_c94ea2defd`
- assetPackId: `asset_pack_6c4cb819a469`
- proofContractHash: `sha256:7bbb7d318aa00058a95e419fd6cf4bad0701cfeb9bbc4fd1bbc1bb215d85b3fa`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:9615311663ac64304af76df8ee5d1082786879dd0e23cf0f049be03f437a90ec` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:107aa2faaf86ba4077ddf20762c7349bbb7c92c62cd3e365c12b68a32722ab33` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:ee6aa83c78c6d65b385020071ad01dada25e3d63bd1505269eaf07e0e24406f6` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:7f74858ff3b66bae2cd55a208af4b2b7f74f66c890b1a48a1200a75293b6ceec` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:74c18eb274442a5f93dba3ac778c1b58ad2bee5546dc93056cfb008990ea6b61` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:a5c26bae3da62e62b8d55b71cfe88384dcd9ba5ca9504d9f351040598f3e1ebe` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:7bbb7d318aa00058a95e419fd6cf4bad0701cfeb9bbc4fd1bbc1bb215d85b3fa` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:7e5a7c4e8bdeee2cbc89efba0ccea3115599349778a8ee2175f03d13b17b8ebe` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:25131ae6a3b3279ca2c930abb85585cbf13cbcda2b825006b750462f175f2449` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:2d027b30e913eda3562eaf652b4ef6654fa6972b35443b3784776eceed43ecec` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:9fa2faa7d8b0dbcdbee3b6808156164004300404004870a13388db0994951530` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:066c7d088145d3ecd6165ca643f4bb3ab211c525d28b6a9236d4da0b496e5c24` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:9615311663ac64304af76df8ee5d1082786879dd0e23cf0f049be03f437a90ec` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:535c7f19abdf756d730c3115177239545eb3021e7108661da0a6e6b2ff3eb264` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:3ad73477c914e93171818b0a9d3df7d016536758af2a0f5ec11f7331087e99c5` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:cd2a510cda7af69fdbb7b1d21683d6944d9438c41c7ff8f42dfe2f16bb6f86e9` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:75d41434efaf115b7cd6aa8fbee55e43bf81983e9be44b7c2d1dafab1a5ffbe0` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:418b73250144638f44118ca5410bcb7b8672d204f75ec5865ee62dd40b2b1c45` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:18201ad75590f20951735ad0dacf11a628fea810bd4f57e7e993089b6c8d74b7` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:107aa2faaf86ba4077ddf20762c7349bbb7c92c62cd3e365c12b68a32722ab33` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:7f55e8d7bfee33842a11225b77124ef925fe9eac4467b3c39de7bb43c9099358` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:02d3807591b33d62b02eb0c8ad008cda8dc5cc6d7114cc11d18f45ce0fad76f6` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:7a474755eb0dbc52fb109b293ee6d52b9095f1d18228bf3f2d58766d6b25171f` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:7a3b59d45a76758c82a18b4e6dba17e7b23e91be36e276ff538a503cd9e97ca8` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:3f29b4d8324602242389b68ff7b8dc745fb422b1b5e44e2f5bf4a3bb7e2b0ffe` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:c1e577b132475f4b327b593f0ec0052f8bb6668c7efad0693bfdc79debd96f2c` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:b0611459f5a903a85900df3dd08537d5bf58ce821e34202fb3042c74e49872ad` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:ee6aa83c78c6d65b385020071ad01dada25e3d63bd1505269eaf07e0e24406f6` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:823e02e4a39b6f8dd1855227239ae28f49208bf70892379b7718846377aaa231` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:218afb55c4d23e609449c56d75fcbc4d514badb7738c815001112c04b9aaf1ac` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:31d6cb2b0ef6de6ba8b31b0695437a77b6e01a8ec65d27078752824497647e87` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:922e00edfc36d11bc533aa829eefcf54f1335201850926b4c6b27b3c18d9069f` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:7f74858ff3b66bae2cd55a208af4b2b7f74f66c890b1a48a1200a75293b6ceec` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:fe54cd3eea7782d864efc2ba3f8ff93ab08650e0e7cef13fe4ac55e7a700f33d` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:d0bd67fe31a4ee3cf5c19690cda6b6d8472816ddc0bed346dd4eeb2130b2ce1c` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:d8e37e883b17a24807bc8c5269661a600019a383be872ba08597e84219dadbac` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:5e3a2497230e1e49527e9ba19b8c08eacc38b0c4b29c6864f48b68d8242704d6` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:8b90f2a81b3a4549fca1def6ca81050dd377cc6ee5ee78aaac067e23c7208a14` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:5d333d8e18fd62e53eb328bea1dd8b09015e4b0c3f47b5f5476e5580dab4754f` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:74c18eb274442a5f93dba3ac778c1b58ad2bee5546dc93056cfb008990ea6b61` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:4d989cb25911b399166d41efa9e78580e6fbef6fa0231cd74462be4a1760cb93` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:4d7799ae63bbbddbae172bf23cf82ba1361c4766d777c982a4df3b7114676a62` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:4d7799ae63bbbddbae172bf23cf82ba1361c4766d777c982a4df3b7114676a62` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:4d7799ae63bbbddbae172bf23cf82ba1361c4766d777c982a4df3b7114676a62` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:a5c26bae3da62e62b8d55b71cfe88384dcd9ba5ca9504d9f351040598f3e1ebe` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:018e847269bf941b8fbfba50e32467c00b1d68f733820520912c4a13bbef2c04` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:c314c0ccdb5074d9b972c7a2227e0d7234821c5295e4d0ae90a9e11e91056dfe` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

### auth-many-asset-normalization / patch

- branchName: `engi/remediation-need_auth-many-asset-normalization_7721dc16cb-auth-many-asset-normalization`
- needId: `need_auth-many-asset-normalization_7721dc16cb`
- assetPackId: `asset_pack_55e928ab676b`
- proofContractHash: `sha256:02e2843a55c45c7d1783415b1ebc24c61c6fdc6f5db3c81ebc86944ece228c42`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:f8e1cc7e91f79487f19193aeb7f4b8835251fec390e4d5daade60e02d870565d` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:47375543a1d3c700d4fa8e3ad08783de54a98ae8fe85f92e2bb179c57347f876` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:26eae47c5e09617eb075ba418867cd3c8706d4fc8c2c018397ddf4613d3085f6` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:9c3e3b944a66bf33b01ed66ac5c5b8d7e3b772a331d3bc42e4ba771ab4eada5f` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:a62832ea96535412b95c23a781d674e54acd4ed23f269b144ebd6accba77e220` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:537596fba2271ccfad2f809f6bacd34f5c9c1fba88589085835c8e58f5a8e700` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:02e2843a55c45c7d1783415b1ebc24c61c6fdc6f5db3c81ebc86944ece228c42` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:339256c32cb35cf0cbf3f43183115998da2367d78c3b39e09a93f9698965fe03` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:9d366813f7058107478a04f9e939f8addebf08dd8e0509749da66c26a91c86e7` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:f49a88f882f655ba6eec9b837776e642117fdc0e106415dfb5fbe45787d23ae4` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:fb55cf94607d9d77093c17eb548411d1d2fef69d47621ba789a9756d2af06e7d` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:35ecac9909934de54d30472202962efef48b0dd5c761bd27cf8d2e3999086a4f` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:f8e1cc7e91f79487f19193aeb7f4b8835251fec390e4d5daade60e02d870565d` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:ef9233ac37f0ab2a010e83c780db629ee7bfe5447236910b8053cc63fd4e8b47` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:ef54757f5863cf424a2cf23f68d111da1d8a673c87856da0b9599a017eea0e14` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:7a6cc51c3311587686d89db3221d54169e61baf7cff3cdfbbda40656a6502370` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:b1f0ee98c3feb1c851197d6944a30023b5a21dc7776d89887556f7973364db46` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:7eaa3b62f9cbb277e3d9d95ae4b5dca552edb2caa93a0f13bf322bb3921e84d9` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:5e6eff96c9ee6ea58271e73ee2ecbd2477418c16013c18aca0a185677a51645c` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:47375543a1d3c700d4fa8e3ad08783de54a98ae8fe85f92e2bb179c57347f876` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:4aa6bf31a10c86a5175f7eb6cd03185413ab10a80540b1ae76c5bd1250f6fc1d` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:377ef5abce531e789b8fbb672e9d8b92a76b78b45cd59fc9b2d52ff4fa653aca` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:dacf825af0ab6614d39a2e119b4252cbc9cf6716f6c3c9e9befafc01a873c4a6` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:0e4bbbb1eb4e0c7d2309d9b800dbcaae11988389f970f18a72477a2569b5cf9d` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:13758fad684f248548cac2b4dafb1a27155cedefdcefd709f698d0f09cd76554` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:7d1734ea444ef0d7cabce99bb8b0d89cf48562eb1ee9886a7eea6882e4e4c9ba` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:d11d97d97702c18117099ace5be1e30697160d17980ff4fe1500947fc6e7328f` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:26eae47c5e09617eb075ba418867cd3c8706d4fc8c2c018397ddf4613d3085f6` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:c438d7cabed1ffc08e8c3edb2379e6883fea7784713ecd4b19ac6c11f9e47f99` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:1e605bb35314d61dd5a6a59359f8f3f5871c09cffe88873a975b1794dd01201b` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:9953b4cf36825f185aa70d43f966577dfa9c44581cb918bd0c8d9d90b89555c4` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:ffa39e3908b89b2b00bc793680f19f840f4ff9b786a61a43d786f4d5ab942078` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:9c3e3b944a66bf33b01ed66ac5c5b8d7e3b772a331d3bc42e4ba771ab4eada5f` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:9d6554c15d01f2a483fa7476e42cd568e7c94b1dfafe2be9e2d4085cd0cce1a4` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:0ed308c66f2bb1a14646fb273c25a1a120a1e56f689e97fc92e49714dcd8d43a` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:23cf22685ddf40a15f2b25754be494c105c6776dc7f141b2009ed06042d5e781` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:06d69936ab16deaa4b52a6847a8d9bda7c9eda0437832bccbded6da3523aed35` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:1b7f283d4c6a4377d695e8dd974e228d1ac7131bdc5ecd516873cb0cf7d58699` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:395aa3a43016ccc61a64761d26fd959b3ed7d746e3c3f292dd40f1939c284c51` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:a62832ea96535412b95c23a781d674e54acd4ed23f269b144ebd6accba77e220` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:82025359f8a966ff54baad4d705ea958551d44e6f25af49a96384756896815cd` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:42229fadf4715218c3d22b10bb04431bb5825b36b25a7c43af4aed96e0429b6f` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:42229fadf4715218c3d22b10bb04431bb5825b36b25a7c43af4aed96e0429b6f` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:42229fadf4715218c3d22b10bb04431bb5825b36b25a7c43af4aed96e0429b6f` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:537596fba2271ccfad2f809f6bacd34f5c9c1fba88589085835c8e58f5a8e700` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:dc5b8188f943a6b00e9d9be9b2057e964054e483e83150fef260245e54b1cc7c` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:b3a7d0a3fb0f558a329e3ccf69862edf4a3df38a646a6b2580ccfcf1591acbe6` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

### auth-many-asset-normalization / context

- branchName: `engi/remediation-need_auth-many-asset-normalization_7721dc16cb-auth-many-asset-normalization`
- needId: `need_auth-many-asset-normalization_7721dc16cb`
- assetPackId: `asset_pack_55e928ab676b`
- proofContractHash: `sha256:02e2843a55c45c7d1783415b1ebc24c61c6fdc6f5db3c81ebc86944ece228c42`
- allFamiliesPassed: `true`
- proofContractPassed: `true`

#### Family Proof Hashes

| proofFamily | proofHash | proofArtifactPath |
| --- | --- | --- |
| `inference-synthesis` | `sha256:f8e1cc7e91f79487f19193aeb7f4b8835251fec390e4d5daade60e02d870565d` | `.engi/inference-synthesis-proof.json` |
| `prompt-completeness` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `.engi/prompt-completeness-proof.json` |
| `static-code-analysis` | `sha256:47375543a1d3c700d4fa8e3ad08783de54a98ae8fe85f92e2bb179c57347f876` | `.engi/static-measurement-proof.json` |
| `verification-decisions` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `.engi/verification-decisions-proof.json` |
| `selection-and-materialization` | `sha256:3cd285a708556882d744988e1e2814a92677982b6137fcf4642466c7a6d9faef` | `.engi/selection-and-materialization-proof.json` |
| `authorization-and-sensitive-flow` | `sha256:9c3e3b944a66bf33b01ed66ac5c5b8d7e3b772a331d3bc42e4ba771ab4eada5f` | `.engi/authorization-and-sensitive-flow-proof.json` |
| `settlement-source-to-shares` | `sha256:193b2660c36b4ce463bed65179cca2f62142d7994008f3e859c5de7aa47895e6` | `.engi/settlement-source-to-shares-proof.json` |
| `disclosure-boundary` | `sha256:87537531ef80cbdd617efc2a909ea5b200d952c7b17ef1950284c96336366aa9` | `.engi/disclosure-boundary-proof.json` |
| `proof-contract` | `sha256:02e2843a55c45c7d1783415b1ebc24c61c6fdc6f5db3c81ebc86944ece228c42` | `.engi/proof-contract.json` |

#### Proof Artifact Disclosure Classification

| path | sensitiveDataClass | disclosable | deliverableConfidentiality | potentiallyDisclosable |
| --- | --- | --- | --- | --- |
| `.engi/inference-synthesis-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/parsed-completion-envelopes.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/prompt-family-registry.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/code-analysis-fact-registry.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-report.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/verification-decisions-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `verification-evidence` | `false` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selection-and-materialization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `licensed-source-material` | `false` | `licensed-source-material` | `false` |
| `.engi/materialization-exclusions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-consistency-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-bindings.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/identity-authorization-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `settlement-preview` | `false` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/disclosure-boundary-proof.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `bounded-public-proof-metadata` | `true` | `bounded-public-proof-metadata` | `true` |
| `.engi/proof-contract.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/system-proof-bundle.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |
| `.engi/proof-witness-manifest.json` | `private-proof-artifact` | `false` | `private-proof-artifact` | `false` |

#### Witness Artifact Digest Inventory

| path | digest | proofFamilies | sensitiveDataClass | disclosable |
| --- | --- | --- | --- | --- |
| `.engi/prompt-family-registry.json` | `sha256:cefc1ca8c0939f76342729ce48d7657dde8c73faa9e9e20f5233643709cf1695` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-moment-contracts.json` | `sha256:339256c32cb35cf0cbf3f43183115998da2367d78c3b39e09a93f9698965fe03` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/inference-proofs.json` | `sha256:9d366813f7058107478a04f9e939f8addebf08dd8e0509749da66c26a91c86e7` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-implementation-surface.json` | `sha256:f49a88f882f655ba6eec9b837776e642117fdc0e106415dfb5fbe45787d23ae4` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-surfaces.json` | `sha256:fb55cf94607d9d77093c17eb548411d1d2fef69d47621ba789a9756d2af06e7d` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-contracts.json` | `sha256:35ecac9909934de54d30472202962efef48b0dd5c761bd27cf8d2e3999086a4f` | `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/inference-synthesis-proof.json` | `sha256:f8e1cc7e91f79487f19193aeb7f4b8835251fec390e4d5daade60e02d870565d` | `inference-synthesis` | `private-proof-artifact` | `false` |
| `.engi/prompt-completeness-proof.json` | `sha256:53bc06c42e89f5a821b094a6a16edd2f73a44cc6ff75be73c76b132b4d18ddcc` | `prompt-completeness` | `bounded-public-proof-metadata` | `true` |
| `.engi/parsed-completion-envelopes.json` | `sha256:ef9233ac37f0ab2a010e83c780db629ee7bfe5447236910b8053cc63fd4e8b47` | `inference-synthesis`, `prompt-completeness` | `private-proof-artifact` | `false` |
| `.engi/asset-pack.lock.json` | `sha256:3ecadbb72f3673167c2f8099c671b826b0d471de5a49f817faa6ec186257178b` | `selection-and-materialization`, `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/selected-source-material.json` | `sha256:8584e558d5003b58cbdb2b8ed70c7d13f0072f51739f614d796e0c43c3a29109` | `selection-and-materialization` | `licensed-source-material` | `false` |
| `.engi/code-analysis-fact-registry.json` | `sha256:b1f0ee98c3feb1c851197d6944a30023b5a21dc7776d89887556f7973364db46` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/measurement-receipts.json` | `sha256:7eaa3b62f9cbb277e3d9d95ae4b5dca552edb2caa93a0f13bf322bb3921e84d9` | `static-code-analysis` | `private-proof-artifact` | `false` |
| `.engi/static-measurement-report.json` | `sha256:5e6eff96c9ee6ea58271e73ee2ecbd2477418c16013c18aca0a185677a51645c` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/static-measurement-proof.json` | `sha256:47375543a1d3c700d4fa8e3ad08783de54a98ae8fe85f92e2bb179c57347f876` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-bindings.json` | `sha256:4aa6bf31a10c86a5175f7eb6cd03185413ab10a80540b1ae76c5bd1250f6fc1d` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-decisions.json` | `sha256:377ef5abce531e789b8fbb672e9d8b92a76b78b45cd59fc9b2d52ff4fa653aca` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow.json` | `sha256:dacf825af0ab6614d39a2e119b4252cbc9cf6716f6c3c9e9befafc01a873c4a6` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/verification-report.json` | `sha256:c91a612dc13ccb6d555e8363f386cf9e0820e0c119a7f29ceb34b3c13b9e5e44` | `verification-decisions` | `verification-evidence` | `false` |
| `.engi/verification-receipts.json` | `sha256:13758fad684f248548cac2b4dafb1a27155cedefdcefd709f698d0f09cd76554` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/verification-decisions-proof.json` | `sha256:608f4210eb9b498b765f65b1d7a8c67edddf9bc3d5ff1fd6a0c7c3aeb7c5859f` | `verification-decisions` | `private-proof-artifact` | `false` |
| `.engi/selection-consistency-proof.json` | `sha256:7d1734ea444ef0d7cabce99bb8b0d89cf48562eb1ee9886a7eea6882e4e4c9ba` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-proof.json` | `sha256:9df0e0d98e946bb3f9e40075cf28d7479053a85a3feaae736af79dfa125989a5` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/selection-and-materialization-proof.json` | `sha256:3cd285a708556882d744988e1e2814a92677982b6137fcf4642466c7a6d9faef` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-exclusions.json` | `sha256:415a228a6b568037c7b6556e898bf2fab263693783d06f2079b63e3ac5152d8a` | `selection-and-materialization` | `private-proof-artifact` | `false` |
| `.engi/materialization-visibility-proof.json` | `sha256:1e605bb35314d61dd5a6a59359f8f3f5871c09cffe88873a975b1794dd01201b` | `selection-and-materialization` | `bounded-public-proof-metadata` | `true` |
| `.engi/identity-authorization-proof.json` | `sha256:9953b4cf36825f185aa70d43f966577dfa9c44581cb918bd0c8d9d90b89555c4` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/sensitive-data-flow-proof.json` | `sha256:ffa39e3908b89b2b00bc793680f19f840f4ff9b786a61a43d786f4d5ab942078` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/authorization-and-sensitive-flow-proof.json` | `sha256:9c3e3b944a66bf33b01ed66ac5c5b8d7e3b772a331d3bc42e4ba771ab4eada5f` | `authorization-and-sensitive-flow` | `private-proof-artifact` | `false` |
| `.engi/source-to-shares.json` | `sha256:9d6554c15d01f2a483fa7476e42cd568e7c94b1dfafe2be9e2d4085cd0cce1a4` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-participation.json` | `sha256:e81eea65a955111258c6526b11ded39f732c655bb18ae25d9bfdc079f2d84bcf` | `settlement-source-to-shares` | `settlement-preview` | `false` |
| `.engi/accounting-precision-report.json` | `sha256:c7980f24c477a2e60cffc9538ced4b1edfd6855c6ff7bbf3cf35bfb51e278337` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-diff.json` | `sha256:99f4650c7106dc0ff3116f01c65986eaa345aa29a177556f6ef1cfd6b2b02eba` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/journal-completeness-proof.json` | `sha256:d74b61231e52ad2ff7a806f1a2c73ba015be5f4d062c5c86b399b0e738afe8f5` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-proof.json` | `sha256:0353d13ef137a2ba4aaa102ccc591e77ef1011b434102f41ab6b91b4111c1a74` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/settlement-source-to-shares-proof.json` | `sha256:193b2660c36b4ce463bed65179cca2f62142d7994008f3e859c5de7aa47895e6` | `settlement-source-to-shares` | `private-proof-artifact` | `false` |
| `.engi/projection-policy.json` | `sha256:82025359f8a966ff54baad4d705ea958551d44e6f25af49a96384756896815cd` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/bounded-public-proof.json` | `sha256:0a04c44ea10a2172711a43b9382ad3b96a49d82031e36b6b64e3dad70ee9ca81` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/redaction-proof.json` | `sha256:0a04c44ea10a2172711a43b9382ad3b96a49d82031e36b6b64e3dad70ee9ca81` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-proof.json` | `sha256:0a04c44ea10a2172711a43b9382ad3b96a49d82031e36b6b64e3dad70ee9ca81` | `disclosure-boundary` | `bounded-public-proof-metadata` | `true` |
| `.engi/disclosure-boundary-proof.json` | `sha256:87537531ef80cbdd617efc2a909ea5b200d952c7b17ef1950284c96336366aa9` | `disclosure-boundary` | `private-proof-artifact` | `false` |
| `.engi/proof-contract.json` | `sha256:dc5b8188f943a6b00e9d9be9b2057e964054e483e83150fef260245e54b1cc7c` | `proof-contract` | `private-proof-artifact` | `false` |
| `.engi/static-heuristics-registry.json` | `sha256:b3a7d0a3fb0f558a329e3ccf69862edf4a3df38a646a6b2580ccfcf1591acbe6` | `static-code-analysis` | `bounded-public-proof-metadata` | `true` |

