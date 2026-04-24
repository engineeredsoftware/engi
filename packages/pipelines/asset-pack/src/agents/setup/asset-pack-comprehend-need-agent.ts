/**
 * AssetPack Pipeline - Comprehend Need Agent
 *
 * Pipeline-local adapter for the generic Bitcode setup Need-comprehension
 * PTRR agent. Generic tools own callable analysis capabilities; the generic
 * agent composes those tools; this adapter stores setup-phase Need evidence
 * for downstream AssetPack synthesis phases.
 */

import { bitcodeSetupNeedComprehensionAgent } from '@bitcode/generic-agents-need-comprehension';

export const AssetPackComprehendNeedAgent = bitcodeSetupNeedComprehensionAgent;

// Wrapper export that stores classification into execution state
export async function runComprehendNeedAgent(input: any, execution: any) {
  const expressedNeed =
    input?.need ??
    input?.expressedNeed ??
    input?.definitionOfNeed ??
    execution?.get?.('setup/need', 'expressed') ??
    execution?.get?.('setup/need-definition', 'definition') ??
    '';
  const out = await AssetPackComprehendNeedAgent({
    ...input,
    need: expressedNeed,
    expressedNeed,
    phase: 'setup',
    beforeAgent: 'danger-wall'
  }, execution);
  try {
    const result = out as any;
    const types = Array.isArray(result?.written_asset_types) && result?.written_asset_types.length
      ? result?.written_asset_types
      : Array.isArray(result?.deliverable_types)
      ? result?.deliverable_types
      : (Array.isArray(result?.deliverableType) ? result?.deliverableType : (result?.deliverableType ? [result?.deliverableType] : []));
    if (types && types.length) {
      execution.store('setup', 'writtenAssetType', types);
      execution.store('setup', 'deliverableType', types);
      execution.store('setup', 'writtenAssetRequest', types);
      execution.store('setup/written-asset-type', 'type', types);
      execution.store('setup/deliverable-type', 'type', types);
      execution.store('setup/written-asset-request', 'type', types);
    }

    const needSatisfactionCriteria =
      result?.need_satisfaction_criteria ||
      result?.need_definition_analysis;
    if (needSatisfactionCriteria) {
      execution.store('setup/need', 'satisfactionCriteria', needSatisfactionCriteria);
      execution.store('setup/need-definition', 'analysis', needSatisfactionCriteria);
    }
    if (result?.need) {
      execution.store('setup/need', 'model', result.need);
      execution.store('setup/need-comprehension', 'model', result.need);
    }
    if (result?.comprehension) {
      execution.store('setup/need', 'comprehension', result.comprehension);
      execution.store('setup/need-comprehension', 'comprehension', result.comprehension);
      execution.store('setup/need-definition', 'comprehension', result.comprehension);
    }
    if (result?.entities) {
      execution.store('setup/need', 'entities', result.entities);
    }
    if (result?.toolEvidence) execution.store('setup/need-comprehension', 'toolEvidence', result.toolEvidence);
    if (result?.riskAdmissionInput) execution.store('setup/need-comprehension', 'riskAdmissionInput', result.riskAdmissionInput);
    if (result?.attachmentsComprehension) execution.store('setup/need-definition', 'attachmentsComprehension', result.attachmentsComprehension);
    if (result?.comprehended_multimodal_attachments)
      execution.store('setup/need-definition', 'attachmentsComprehension', result.comprehended_multimodal_attachments);
  } catch {}
  return out;
}

export const AssetPackComprehendNeedDefinitionAgent = AssetPackComprehendNeedAgent;
export default runComprehendNeedAgent;
