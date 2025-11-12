import { permanentRedirect } from 'next/navigation';

export default function LegacyLoginCallback({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  const qs = new URLSearchParams(searchParams as any).toString();
  const target = `/tps/supabase/callback${qs ? `?${qs}` : ''}`;
  permanentRedirect(target);
}

