type ShellSnapshot = {
  selection?: {
    scenarioId?: string | null;
  } | null;
  scenarios?: Array<{
    scenarioId?: string | null;
    scenarioFamily?: string | null;
    repo?: string | null;
    profileShortLabel?: string | null;
    selected?: boolean | null;
  }> | null;
  needingSurface?: {
    parserKind?: string | null;
    closureCriteria?: string[] | null;
    targetArtifactKinds?: string[] | null;
  } | null;
} | null;

export type TerminalNeedScenariosState = {
  selectedScenarioId: string;
  parserKind: string;
  closureCriteriaCount: number;
  targetKindCount: number;
  scenarios: Array<{
    id: string;
    label: string;
    repo: string;
    profile: string;
    selected: boolean;
  }>;
};

export type TerminalNeedFittingReviewState = {
  scenarioId: string;
  needId: string;
  task: string;
  reviewStage: string;
  requiredBefore: string;
  status: string;
  action: string;
  fitSearchAdmitted: boolean;
  admissionReason: string;
  blockedStages: string[];
  admittedStages: string[];
  allowedActions: string[];
  reviewQuestions: string[];
  measurementHash: string;
  reviewableNeedRef: string;
  settlementReviewStage: string;
  objectiveContractId: string;
  receiptCarryThrough: string[];
  requiredFitStages: string[];
  blockedUntil: string;
};

export function normalizeTerminalNeedScenarios(snapshot: ShellSnapshot): TerminalNeedScenariosState | null {
  if (!snapshot) return null;

  const scenarios = (snapshot.scenarios || [])
    .map((scenario) => {
      const id = String(scenario.scenarioId || '').trim();
      if (!id) return null;
      return {
        id,
        label: String(scenario.scenarioFamily || id).trim() || id,
        repo: String(scenario.repo || '—').trim() || '—',
        profile: String(scenario.profileShortLabel || 'profile pending').trim() || 'profile pending',
        selected: Boolean(scenario.selected) || id === String(snapshot.selection?.scenarioId || '').trim(),
      };
    })
    .filter(
      (
        scenario,
      ): scenario is {
        id: string;
        label: string;
        repo: string;
        profile: string;
        selected: boolean;
      } => Boolean(scenario),
    );

  return {
    selectedScenarioId: scenarios.find((scenario) => scenario.selected)?.id || scenarios[0]?.id || '',
    parserKind: String(snapshot.needingSurface?.parserKind || '—').trim() || '—',
    closureCriteriaCount: Array.isArray(snapshot.needingSurface?.closureCriteria)
      ? snapshot.needingSurface?.closureCriteria.length
      : 0,
    targetKindCount: Array.isArray(snapshot.needingSurface?.targetArtifactKinds)
      ? snapshot.needingSurface?.targetArtifactKinds.length
      : 0,
    scenarios,
  };
}

function stringValue(value: unknown, fallback = '—') {
  const normalized = typeof value === 'string' ? value.trim() : '';
  return normalized || fallback;
}

function recordValue(value: unknown): Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, any>)
    : {};
}

function stringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map((entry) => String(entry || '').trim()).filter(Boolean)
    : [];
}

export function normalizeTerminalNeedFittingReview(payload: unknown): TerminalNeedFittingReviewState | null {
  const root = recordValue(payload);
  const review = recordValue(root.needFittingReview);
  if (!review.artifactKind && !root.reviewableNeed) return null;

  const reviewableNeed = recordValue(root.reviewableNeed);
  const measurement = recordValue(root.measurement);
  const fitSearchAdmission = recordValue(review.fitSearchAdmission || root.fitSearchAdmission || reviewableNeed.fitSearchAdmission);
  const settlementReview = recordValue(review.settlementReview);
  const candidateFitRequirements = recordValue(review.candidateFitRequirements);

  return {
    scenarioId: stringValue(review.scenarioId || recordValue(root.scenario).scenarioId, '—'),
    needId: stringValue(review.needId || reviewableNeed.needId || measurement.needId, '—'),
    task: stringValue(review.task || measurement.task || recordValue(reviewableNeed.measuredNeedSnapshot).task, '—'),
    reviewStage: stringValue(review.reviewStage || root.reviewStage || reviewableNeed.reviewStage, 'post-measurement-pre-fit'),
    requiredBefore: stringValue(review.requiredBefore || reviewableNeed.requiredBefore, 'find-fitting-settlement'),
    status: stringValue(review.status || reviewableNeed.status, 'ready-for-review'),
    action: stringValue(review.action || recordValue(root.reviewDecision).action, 'pending operator review'),
    fitSearchAdmitted: fitSearchAdmission.admitted === true,
    admissionReason: stringValue(fitSearchAdmission.admissionReason, 'Need must be accepted before fit search begins.'),
    blockedStages: stringList(fitSearchAdmission.blockedStages || candidateFitRequirements.blockedStages),
    admittedStages: stringList(fitSearchAdmission.admittedStages || candidateFitRequirements.admittedStages),
    allowedActions: stringList(review.allowedActions || root.allowedActions || reviewableNeed.allowedActions),
    reviewQuestions: stringList(review.reviewQuestions || reviewableNeed.reviewQuestions),
    measurementHash: stringValue(review.measurementHash || measurement.measurementHash, '—'),
    reviewableNeedRef: stringValue(review.reviewableNeedRef || measurement.reviewableNeedRef, '—'),
    settlementReviewStage: stringValue(settlementReview.reviewStage, 'present-fit-for-settlement-review'),
    objectiveContractId: stringValue(
      settlementReview.quantizedObjectiveContractId,
      'bitcode.source-to-shares.quantized-fit-quality-oc.v26',
    ),
    receiptCarryThrough: stringList(settlementReview.receiptCarryThrough),
    requiredFitStages: stringList(candidateFitRequirements.requiredStages),
    blockedUntil: stringValue(candidateFitRequirements.blockedUntil, 'Need review action=accept'),
  };
}
