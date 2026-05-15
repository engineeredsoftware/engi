import type { NativeCard, NativePanel } from './terminal-shell-reading';

type SurfaceMetricSnapshot = {
  label?: string | null;
  value?: string | number | null;
};

type SurfaceRowSnapshot = {
  label?: string | null;
  value?: string | number | null;
};

type SurfaceCardSnapshot = {
  title?: string | null;
  eyebrow?: string | null;
  subtitle?: string | null;
  help?: string | null;
  badge?: string | null;
  metrics?: SurfaceMetricSnapshot[] | null;
  rows?: SurfaceRowSnapshot[] | null;
};

type SurfacePanelSnapshot = {
  label?: string | null;
  badge?: string | null;
  cards?: SurfaceCardSnapshot[] | null;
};

type ShellSnapshot = {
  coreSurface?: {
    operatingPicture?: SurfacePanelSnapshot | null;
    depositing?: SurfacePanelSnapshot | null;
    reading?: SurfacePanelSnapshot | null;
    fit?: SurfacePanelSnapshot | null;
  } | null;
} | null;

const CORE_PANEL_CONFIG = [
  { id: 'panelOperatingPicture', key: 'operatingPicture', fallbackLabel: 'Operating picture' },
  { id: 'panelDepositing', key: 'depositing', fallbackLabel: 'Depositing' },
  { id: 'panelReading', key: 'reading', fallbackLabel: 'Reading + measured demand' },
  { id: 'panelFit', key: 'fit', fallbackLabel: 'Deposit-to-Read fit' },
] as const;

function stringValue(value: string | number | null | undefined, fallback = '') {
  return String(value ?? '').trim() || fallback;
}

function normalizeCard(card: SurfaceCardSnapshot | null | undefined): NativeCard | null {
  if (!card) return null;
  return {
    title: stringValue(card.title, 'Bitcode surface'),
    eyebrow: stringValue(card.eyebrow),
    subtitle: stringValue(card.subtitle),
    help: stringValue(card.help),
    badge: stringValue(card.badge),
    metrics: (card.metrics || [])
      .map((entry) => {
        const label = stringValue(entry?.label);
        const value = stringValue(entry?.value);
        return label && value ? { label, value } : null;
      })
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)),
    rows: (card.rows || [])
      .map((entry) => {
        const label = stringValue(entry?.label);
        const value = stringValue(entry?.value);
        return label && value ? { label, value } : null;
      })
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)),
  };
}

export function normalizeTerminalCorePanels(snapshot: ShellSnapshot): NativePanel[] {
  const coreSurface = snapshot?.coreSurface;
  if (!coreSurface) return [];

  return CORE_PANEL_CONFIG.map((panel) => {
    const surface = coreSurface[panel.key];
    return {
      id: panel.id,
      label: stringValue(surface?.label, panel.fallbackLabel),
      badge: stringValue(surface?.badge),
      cards: (surface?.cards || [])
        .map((card) => normalizeCard(card))
        .filter((card): card is NativeCard => Boolean(card)),
    };
  });
}
