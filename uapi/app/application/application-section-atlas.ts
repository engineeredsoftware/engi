import { normalizeApplicationClosureState } from './application-closure-state';
import { normalizeApplicationCorePanels } from './application-core-surface';
import { APPLICATION_SHELL_SECTIONS } from './application-shell-sections';

type SectionPreview = {
  id: string;
  label: string;
  badge: string;
  preview: string;
  subheads: string[];
  itemCount: number;
};

type ShellSnapshot = {
  coreSurface?: unknown;
  closureSurface?: unknown;
} | null;

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

export function normalizeApplicationSectionAtlas(snapshot: ShellSnapshot): SectionPreview[] {
  const corePanels = normalizeApplicationCorePanels(snapshot as Parameters<typeof normalizeApplicationCorePanels>[0]);
  const closureState = normalizeApplicationClosureState(snapshot as Parameters<typeof normalizeApplicationClosureState>[0]);

  const previews = new Map<string, SectionPreview>();

  corePanels.forEach((panel) => {
    previews.set(panel.id, {
      id: panel.id,
      label: panel.label,
      badge: panel.badge,
      preview:
        panel.cards[0]?.help ||
        panel.cards[0]?.subtitle ||
        'This transaction stage is ready to read.',
      subheads: unique(
        panel.cards
          .map((card) => card.title)
          .filter((title) => title && title !== panel.label),
      ).slice(0, 4),
      itemCount: panel.cards.length,
    });
  });

  if (closureState) {
    const closurePanels = [
      { id: 'panelNeeding', panel: closureState.needReview },
      { id: 'panelEvaluations', panel: closureState.verification },
      { id: 'panelBranchArtifacts', panel: closureState.branch },
      { id: 'panelSettlement', panel: closureState.settlement },
      { id: 'panelLedger', panel: closureState.ledger },
    ] as const;

    closurePanels.forEach(({ id, panel }) => {
      previews.set(id, {
        id,
        label: panel.label,
        badge: panel.chips[0] || panel.metrics[0]?.value || '',
        preview: panel.summary || 'This closure stage is ready to read.',
        subheads: unique([
          ...panel.metrics.map((metric) => metric.label),
          ...(panel.candidates || []).map((candidate) => candidate.title),
          ...(panel.proofFamilies || []).map((family) => family.label),
          ...(panel.fitQualities || []).map((quality) => quality.label),
          ...(panel.recentRuns || []).map((run) => run.label),
        ]).slice(0, 4),
        itemCount:
          panel.metrics.length +
          panel.rows.length +
          panel.chips.length +
          (panel.candidates?.length || 0) +
          (panel.proofFamilies?.length || 0) +
          (panel.fitQualities?.length || 0) +
          (panel.recentRuns?.length || 0),
      });
    });
  }

  return APPLICATION_SHELL_SECTIONS.map((section) => (
    previews.get(section.id) || {
      id: section.id,
      label: section.label,
      badge: '',
      preview: 'Waiting for this transaction stage to populate.',
      subheads: [],
      itemCount: 0,
    }
  ));
}
