export type ApplicationLiveSummaryItem = {
  label: string;
  value: string;
};

type SummarySurfaceItem = {
  label?: string | null;
  value?: string | null;
};

type ShellSnapshot = {
  summarySurface?: SummarySurfaceItem[] | null;
} | null;

export function normalizeApplicationLiveSummary(snapshot: ShellSnapshot): ApplicationLiveSummaryItem[] {
  return (snapshot?.summarySurface || [])
    .map((item) => {
      const label = String(item?.label || '').trim();
      const value = String(item?.value || '').trim();
      if (!label) return null;
      return {
        label,
        value: value || '—',
      };
    })
    .filter((item): item is ApplicationLiveSummaryItem => Boolean(item));
}
