import { permanentRedirect } from 'next/navigation';

export default function LegacySMSViewer({ params, searchParams }: { params: { runId: string }; searchParams: Record<string, string | string[]> }) {
  const qs = new URLSearchParams(searchParams as any).toString();
  const target = `/tps/twilio/sms/${params.runId}${qs ? `?${qs}` : ''}`;
  permanentRedirect(target);
}

