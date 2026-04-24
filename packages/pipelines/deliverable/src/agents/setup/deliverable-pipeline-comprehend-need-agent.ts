/**
 * Deliverable Pipeline - Comprehend Need Agent (Setup compatibility adapter)
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
    input?.definitionOfDone ??
    input?.task_description ??
    execution?.get?.('setup/need', 'expressed') ??
    execution?.get?.('setup/dod', 'definition') ??
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
    const types = Array.isArray(out?.written_asset_types) && out?.written_asset_types.length
      ? out?.written_asset_types
      : Array.isArray(out?.deliverable_types)
      ? out?.deliverable_types
      : (Array.isArray(out?.deliverableType) ? out?.deliverableType : (out?.deliverableType ? [out?.deliverableType] : []));
    if (types && types.length) {
      execution.store('setup', 'deliverableType', types);
      execution.store('setup', 'writtenAssetType', types);
      execution.store('setup/deliverable-type', 'type', types);
      execution.store('setup/written-asset-type', 'type', types);
    }

    const needSatisfactionCriteria = out?.need_satisfaction_criteria || out?.dod_analysis;
    if (needSatisfactionCriteria) {
      execution.store('setup/need', 'satisfactionCriteria', needSatisfactionCriteria);
      execution.store('setup/dod', 'analysis', needSatisfactionCriteria);
    }
    if (out?.need) {
      execution.store('setup/need', 'model', out.need);
      execution.store('setup/need-comprehension', 'model', out.need);
    }
    if (out?.comprehension) {
      execution.store('setup/dod', 'comprehension', out.comprehension);
      execution.store('setup/task', 'comprehension', out.comprehension);
      execution.store('setup/need', 'comprehension', out.comprehension);
      execution.store('setup/need-comprehension', 'comprehension', out.comprehension);
    }
    if (out?.entities) {
      execution.store('setup/task', 'entities', out.entities);
      execution.store('setup/need', 'entities', out.entities);
    }
    if (out?.toolEvidence) execution.store('setup/need-comprehension', 'toolEvidence', out.toolEvidence);
    if (out?.riskAdmissionInput) execution.store('setup/need-comprehension', 'riskAdmissionInput', out.riskAdmissionInput);
    if (out?.attachmentsComprehension) execution.store('setup/dod', 'attachmentsComprehension', out.attachmentsComprehension);
    if (out?.comprehended_multimodal_attachments)
      execution.store('setup/dod', 'attachmentsComprehension', out.comprehended_multimodal_attachments);
  } catch {}
  return out;
}

export const DeliverablePipelineComprehendDoDAgent = DeliverablePipelineComprehendNeedAgent;
export default runComprehendNeedAgent;
