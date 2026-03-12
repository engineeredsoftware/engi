import { permanentRedirect } from 'next/navigation';

export default function LegacyGitHubCallback({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  const qs = new URLSearchParams(searchParams as any).toString();
  const target = `/tps/github/app-install${qs ? `?${qs}` : ''}`;
  permanentRedirect(target);
}
