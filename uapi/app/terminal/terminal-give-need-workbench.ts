import type { KeyValueRow, Metric } from './terminal-shell-reading';
import type { TerminalRepositoryContextState } from './terminal-repository-context';

type InventoryEntrySnapshot = {
  inventoryEntryId?: string | null;
  title?: string | null;
  artifactKind?: string | null;
  originKind?: string | null;
  sourcePath?: string | null;
  workflowPath?: string | null;
  tags?: string[] | null;
};

type ShellSnapshot = {
  canonLabel?: string | null;
  selection?: {
    projectionPrincipal?: string | null;
    branchMode?: string | null;
    scenarioId?: string | null;
    authSessionId?: string | null;
    selectedInventoryEntryIds?: string[] | null;
  } | null;
  repoSupplySummary?: {
    repoCount?: number | null;
    inventoryEntryCount?: number | null;
    scenarioCount?: number | null;
    candidateAssetCount?: number | null;
  } | null;
  scenario?: {
    scenarioId?: string | null;
    scenarioFamily?: string | null;
    repo?: string | null;
    task?: string | null;
    profileId?: string | null;
    profileLabel?: string | null;
    profileShortLabel?: string | null;
  } | null;
  authSession?: {
    authSessionId?: string | null;
    repo?: string | null;
    installationId?: string | number | null;
    installationAccountLogin?: string | null;
    defaultRef?: string | null;
    defaultSignerAddress?: string | null;
    appSlug?: string | null;
    permissionsRoot?: string | null;
  } | null;
  inventory?: {
    activeCount?: number | null;
    filteredCount?: number | null;
    selectedCount?: number | null;
    selectedEntries?: InventoryEntrySnapshot[] | null;
  } | null;
  depositingSurface?: {
    depositIntentSummary?: string | null;
    depositProfile?: string | null;
    repoSupplyRef?: string | null;
    selectedInventoryRefs?: string[] | null;
    selectedArtifactKindCounts?: Record<string, number> | null;
    selectedOriginKindCounts?: Record<string, number> | null;
    addressingRoot?: string | null;
    authRoot?: string | null;
  } | null;
  needingSurface?: {
    parserKind?: string | null;
    needId?: string | null;
    needSummary?: string | null;
    taskSummary?: string | null;
    closureCriteria?: string[] | null;
    failureModes?: string[] | null;
    targetArtifactKinds?: string[] | null;
  } | null;
  fitSurface?: {
    fitSummary?: string | null;
    normalizationPressure?: string | null;
    decisiveKinds?: string[] | null;
    overlapKinds?: string[] | null;
    branchIntentSummary?: string | null;
    proofIntentSummary?: string | null;
    settlementIntentSummary?: string | null;
  } | null;
} | null;

export type TerminalGiveNeedWorkbench = {
  canonLabel: string;
  projectionPrincipal: string;
  branchMode: string;
  scenarioLabel: string;
  profileLabel: string;
  give: {
    summary: string;
    metrics: Metric[];
    rows: KeyValueRow[];
    selectedEntries: { id: string; label: string }[];
    artifactKinds: string[];
  };
  need: {
    summary: string;
    metrics: Metric[];
    rows: KeyValueRow[];
    closureCriteria: string[];
    targetKinds: string[];
  };
  fit: {
    summary: string;
    metrics: Metric[];
    rows: KeyValueRow[];
  };
};

function numberValue(value: number | null | undefined) {
  return typeof value === 'number' ? String(value) : '0';
}

function listValue(values: (string | null | undefined)[] | null | undefined, fallback = '—') {
  const resolved = (values || []).map((value) => String(value || '').trim()).filter(Boolean);
  return resolved.length ? resolved.join(', ') : fallback;
}

function countLabels(counts: Record<string, number> | null | undefined) {
  return Object.entries(counts || {})
    .filter(([, count]) => typeof count === 'number' && count > 0)
    .sort((left, right) => right[1] - left[1])
    .map(([label, count]) => `${label} (${count})`);
}

export function normalizeTerminalGiveNeedWorkbench(
  snapshot: ShellSnapshot,
  repositoryContext?: TerminalRepositoryContextState | null,
): TerminalGiveNeedWorkbench | null {
  if (!snapshot) return null;

  const selectedRepository = repositoryContext?.selectedRepository || null;
  const connectionStatus = repositoryContext?.connectionStatus || null;
  const selectedEntries = (snapshot.inventory?.selectedEntries || [])
    .map((entry) => ({
      id: String(entry.inventoryEntryId || '').trim(),
      label:
        String(entry.title || '').trim() ||
        String(entry.sourcePath || '').trim() ||
        String(entry.workflowPath || '').trim() ||
        String(entry.inventoryEntryId || '').trim(),
    }))
    .filter((entry) => entry.id && entry.label);
  const artifactKinds = countLabels(snapshot.depositingSurface?.selectedArtifactKindCounts);
  const originKinds = countLabels(snapshot.depositingSurface?.selectedOriginKindCounts);
  const closureCriteria = (snapshot.needingSurface?.closureCriteria || [])
    .map((entry) => String(entry || '').trim())
    .filter(Boolean);
  const targetKinds = (snapshot.needingSurface?.targetArtifactKinds || [])
    .map((entry) => String(entry || '').trim())
    .filter(Boolean);
  const decisiveKinds = (snapshot.fitSurface?.decisiveKinds || [])
    .map((entry) => String(entry || '').trim())
    .filter(Boolean);
  const overlapKinds = (snapshot.fitSurface?.overlapKinds || [])
    .map((entry) => String(entry || '').trim())
    .filter(Boolean);

  return {
    canonLabel: String(snapshot.canonLabel || 'Bitcode active posture').trim(),
    projectionPrincipal: String(snapshot.selection?.projectionPrincipal || 'buyer').trim() || 'buyer',
    branchMode: String(snapshot.selection?.branchMode || 'patch').trim() || 'patch',
    scenarioLabel:
      String(snapshot.scenario?.scenarioFamily || snapshot.scenario?.scenarioId || 'No active scenario').trim() ||
      'No active scenario',
    profileLabel:
      String(
        snapshot.scenario?.profileShortLabel ||
          snapshot.scenario?.profileLabel ||
          snapshot.depositingSurface?.depositProfile ||
          'Pending profile',
      ).trim() || 'Pending profile',
    give: {
      summary:
        String(snapshot.depositingSurface?.depositIntentSummary || '').trim() ||
        'Supply authenticated repository material into the Bitcode give-side before branch and proof closure.',
      metrics: [
        { label: 'Selected refs', value: numberValue(snapshot.inventory?.selectedCount) },
        { label: 'Active inventory', value: numberValue(snapshot.inventory?.activeCount) },
        { label: 'Repo supply entries', value: numberValue(snapshot.repoSupplySummary?.inventoryEntryCount) },
        { label: 'Authenticated repos', value: numberValue(snapshot.repoSupplySummary?.repoCount) },
      ],
      rows: [
        {
          label: 'Repository',
          value:
            selectedRepository?.fullName ||
            String(snapshot.authSession?.repo || snapshot.scenario?.repo || snapshot.depositingSurface?.repoSupplyRef || '—'),
        },
        {
          label: 'Auth session',
          value: String(snapshot.authSession?.authSessionId || snapshot.selection?.authSessionId || '—') || '—',
        },
        {
          label: 'Provider account',
          value:
            String(
              connectionStatus?.username ||
                connectionStatus?.metadata?.account ||
                snapshot.authSession?.installationAccountLogin ||
                '—',
            ) || '—',
        },
        {
          label: 'Artifact kinds',
          value: listValue(artifactKinds),
        },
        {
          label: 'Origin kinds',
          value: listValue(originKinds),
        },
        {
          label: 'Addressing root',
          value: String(snapshot.depositingSurface?.addressingRoot || '—'),
        },
        {
          label: 'Auth root',
          value: String(snapshot.depositingSurface?.authRoot || '—'),
        },
      ],
      selectedEntries,
      artifactKinds,
    },
    need: {
      summary:
        String(snapshot.needingSurface?.needSummary || snapshot.needingSurface?.taskSummary || snapshot.scenario?.task || '').trim() ||
        'Measured need is the active demand surface Bitcode must close before verification, settlement, and proof become meaningful.',
      metrics: [
        { label: 'Target kinds', value: numberValue(targetKinds.length) },
        { label: 'Closure criteria', value: numberValue(closureCriteria.length) },
        { label: 'Need scenarios', value: numberValue(snapshot.repoSupplySummary?.scenarioCount) },
        { label: 'Candidate assets', value: numberValue(snapshot.repoSupplySummary?.candidateAssetCount) },
      ],
      rows: [
        {
          label: 'Scenario',
          value: String(snapshot.scenario?.scenarioFamily || snapshot.scenario?.scenarioId || '—'),
        },
        {
          label: 'Repository',
          value: String(snapshot.scenario?.repo || selectedRepository?.fullName || '—'),
        },
        {
          label: 'Profile',
          value:
            String(
              snapshot.scenario?.profileShortLabel ||
                snapshot.scenario?.profileLabel ||
                snapshot.depositingSurface?.depositProfile ||
                '—',
            ) || '—',
        },
        {
          label: 'Parser',
          value: String(snapshot.needingSurface?.parserKind || '—'),
        },
        {
          label: 'Failure modes',
          value: listValue(snapshot.needingSurface?.failureModes),
        },
        {
          label: 'Target artifact kinds',
          value: listValue(targetKinds),
        },
      ],
      closureCriteria,
      targetKinds,
    },
    fit: {
      summary:
        String(snapshot.fitSurface?.fitSummary || '').trim() ||
        'Depositing-to-needing fit stays the decisive Bitcode relation before branch, proof, and settlement are justified.',
      metrics: [
        {
          label: 'Pressure',
          value: String(snapshot.fitSurface?.normalizationPressure || 'pending'),
        },
        {
          label: 'Decisive kinds',
          value: numberValue(decisiveKinds.length),
        },
        {
          label: 'Overlap kinds',
          value: numberValue(overlapKinds.length),
        },
        {
          label: 'Branch mode',
          value: String(snapshot.selection?.branchMode || 'patch'),
        },
      ],
      rows: [
        {
          label: 'Projection',
          value: String(snapshot.selection?.projectionPrincipal || 'buyer'),
        },
        {
          label: 'Decisive kinds',
          value: listValue(decisiveKinds),
        },
        {
          label: 'Overlap kinds',
          value: listValue(overlapKinds),
        },
        {
          label: 'Branch intent',
          value: String(snapshot.fitSurface?.branchIntentSummary || '—'),
        },
        {
          label: 'Proof intent',
          value: String(snapshot.fitSurface?.proofIntentSummary || '—'),
        },
        {
          label: 'Settlement intent',
          value: String(snapshot.fitSurface?.settlementIntentSummary || '—'),
        },
      ],
    },
  };
}
