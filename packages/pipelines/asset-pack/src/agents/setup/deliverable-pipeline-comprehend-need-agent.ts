/**
 * AssetPack Pipeline - Comprehend Need Agent (setup compatibility adapter)
 *
 * Pipeline-local adapter for the generic Bitcode setup Need-comprehension
 * PTRR agent. Generic tools own callable analysis capabilities; the generic
 * agent composes those tools; this adapter only preserves retained pipeline
 * registration names and stores setup-phase mirrors for downstream phases.
 */

import { bitcodeSetupNeedComprehensionAgent } from '@bitcode/generic-agents-need-comprehension';

export const DeliverablePipelineComprehendNeedAgent = bitcodeSetupNeedComprehensionAgent;

// Wrapper export that stores classification into execution state
export async function runComprehendNeedAgent(input: any, execution: any) {
  const expressedNeed =
    input?.need ??
    input?.expressedNeed ??
    input?.definitionOfNeed ??
    input?.definitionOfDone ??
    input?.task_description ??
    execution?.get?.('setup/need', 'expressed') ??
    execution?.get?.('setup/need-definition', 'definition') ??
    '';
  const out = await DeliverablePipelineComprehendNeedAgent({
    ...input,
    need: expressedNeed,
    expressedNeed,
    task_description: input?.task_description ?? expressedNeed,
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
      execution.store('setup', 'deliverableType', types);
      execution.store('setup', 'writtenAssetType', types);
      execution.store('setup/deliverable-type', 'type', types);
      execution.store('setup/written-asset-type', 'type', types);
    }

    const needSatisfactionCriteria =
      result?.need_satisfaction_criteria ||
      result?.need_definition_analysis ||
      result?.dod_analysis;
    if (needSatisfactionCriteria) {
      execution.store('setup/need', 'satisfactionCriteria', needSatisfactionCriteria);
      execution.store('setup/need-definition', 'analysis', needSatisfactionCriteria);
    }
    if (result?.need) {
      execution.store('setup/need', 'model', result.need);
      execution.store('setup/need-comprehension', 'model', result.need);
    }
    if (result?.comprehension) {
      execution.store('setup/task', 'comprehension', result.comprehension);
      execution.store('setup/need', 'comprehension', result.comprehension);
      execution.store('setup/need-comprehension', 'comprehension', result.comprehension);
      execution.store('setup/need-definition', 'comprehension', result.comprehension);
    }
    if (result?.entities) {
      execution.store('setup/task', 'entities', result.entities);
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

export const DeliverablePipelineComprehendNeedDefinitionAgent = DeliverablePipelineComprehendNeedAgent;
export default runComprehendNeedAgent;
