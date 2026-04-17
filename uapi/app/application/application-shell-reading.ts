'use client';

export type KeyValueRow = {
  label: string;
  value: string;
};

export type Metric = {
  label: string;
  value: string;
};

export type NativeCard = {
  title: string;
  eyebrow: string;
  subtitle: string;
  help: string;
  badge: string;
  metrics: Metric[];
  rows: KeyValueRow[];
};

export type NativePanel = {
  id: string;
  label: string;
  badge: string;
  cards: NativeCard[];
};

export function readDirectText(element: Element | null): string {
  if (!element) return '';
  const directText = Array.from(element.childNodes)
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent?.trim() || '')
    .filter(Boolean)
    .join(' ')
    .trim();
  return directText || element.textContent?.trim() || '';
}

export function readPrimaryText(element: Element | null): string {
  if (!element) return '';
  const infoLabel = element.querySelector(':scope > .label-with-info > span:first-child');
  return infoLabel?.textContent?.trim() || readDirectText(element);
}

export function isVisibleShellNode(element: Element) {
  return !element.closest('.explainer-panel');
}

export function readMetrics(root: Element, limit = 4): Metric[] {
  return Array.from(root.querySelectorAll('.mini-grid .mini-card'))
    .filter((element) => isVisibleShellNode(element))
    .map((element) => ({
      label: readPrimaryText(element.querySelector('.meta')),
      value: readDirectText(element.querySelector(':scope > strong')),
    }))
    .filter((entry) => entry.label && entry.value)
    .slice(0, limit);
}

export function readRows(root: Element, limit = 4): KeyValueRow[] {
  return Array.from(root.querySelectorAll('.kv-row'))
    .filter((element) => isVisibleShellNode(element))
    .map((element) => {
      const children = Array.from(element.children);
      const label = readPrimaryText(children[0] || null);
      const value = readDirectText(children[1] || null);
      return { label, value };
    })
    .filter((entry) => entry.label && entry.value)
    .slice(0, limit);
}

export function readSurfaceArticle(element: Element): NativeCard {
  const help = readDirectText(element.querySelector('.surface-help'));
  const badge = readPrimaryText(element.querySelector('.surface-panel-visual .badge'));

  return {
    title: readPrimaryText(element.querySelector('.json-surface-head h3')) || 'Bitcode surface',
    eyebrow: readPrimaryText(element.querySelector('.json-surface-head .eyebrow')),
    subtitle: readDirectText(element.querySelector('.json-surface-head .meta')),
    help,
    badge,
    metrics: readMetrics(element),
    rows: readRows(element),
  };
}

export function readDepositSectionCard(element: Element): NativeCard {
  const summaryLines = Array.from(element.querySelectorAll('.callout .meta, :scope > .meta'))
    .filter((node) => isVisibleShellNode(node))
    .map((node) => node.textContent?.trim() || '')
    .filter(Boolean);

  return {
    title: readPrimaryText(element.querySelector('.section-head h4')) || 'Deposit block',
    eyebrow: 'Depositing block',
    subtitle: summaryLines[0] || 'Repo-authenticated deposit surface',
    help: summaryLines.slice(1, 3).join(' ') || '',
    badge: readPrimaryText(element.querySelector('.section-head .badge')),
    metrics: [],
    rows: readRows(element, 5),
  };
}

export function readGenericCard(
  element: Element,
  fallbackTitle: string,
  fallbackEyebrow = '',
  rowLimit = 5,
): NativeCard {
  const paragraphs = Array.from(element.querySelectorAll('p, .meta'))
    .filter((node) => isVisibleShellNode(node))
    .map((node) => node.textContent?.trim() || '')
    .filter(Boolean);

  return {
    title:
      readPrimaryText(element.querySelector('.section-head h3, .section-head h4, h3, h4, summary, strong')) || fallbackTitle,
    eyebrow: fallbackEyebrow,
    subtitle: paragraphs[0] || '',
    help: paragraphs.slice(1, 3).join(' '),
    badge: readPrimaryText(element.querySelector('.badge')),
    metrics: readMetrics(element),
    rows: readRows(element, rowLimit),
  };
}

export function jumpToShellSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
}

export function toneForPanel(id: string) {
  if (id === 'panelOperatingPicture') return 'border-cyan-400/20 bg-cyan-400/5';
  if (id === 'panelDepositing') return 'border-emerald-400/20 bg-emerald-400/5';
  if (id === 'panelNeeding') return 'border-sky-400/20 bg-sky-400/5';
  if (id === 'panelFit') return 'border-amber-400/20 bg-amber-400/5';
  if (id === 'panelEvaluations') return 'border-lime-400/20 bg-lime-400/5';
  if (id === 'panelBranchArtifacts') return 'border-violet-400/20 bg-violet-400/5';
  if (id === 'panelSettlement') return 'border-emerald-300/20 bg-emerald-300/5';
  if (id === 'panelLedger') return 'border-slate-300/20 bg-slate-300/5';
  return 'border-white/8 bg-white/5';
}
