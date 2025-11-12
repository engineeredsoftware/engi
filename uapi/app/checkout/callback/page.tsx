import { permanentRedirect } from 'next/navigation';

export default function LegacyStripeCallback({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  const qs = new URLSearchParams(searchParams as any).toString();
  const target = `/tps/stripe/checkout${qs ? `?${qs}` : ''}`;
  permanentRedirect(target);
}

