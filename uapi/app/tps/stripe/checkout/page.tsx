import dynamic from 'next/dynamic';

// Reuse existing client UI for Stripe checkout callback
const CheckoutCallbackClient = dynamic(
  () => import('@/app/checkout/callback/CheckoutCallbackClient'),
  {
    ssr: false,
    loading: () => (
      <div
        className="callback-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          backgroundColor: 'black',
          pointerEvents: 'auto',
        }}
      />
    ),
  }
);

interface CheckoutCallbackPageProps {
  searchParams: {
    success?: string | string[];
    credits?: string | string[];
    session_id?: string | string[];
  };
}

export default function CheckoutCallbackPage({ searchParams }: CheckoutCallbackPageProps) {
  const rawSuccess = searchParams.success;
  const success = Array.isArray(rawSuccess) ? rawSuccess[0] === 'true' : rawSuccess === 'true';

  const rawCredits = searchParams.credits;
  const creditsString = Array.isArray(rawCredits) ? rawCredits[0] : rawCredits;
  const credits = creditsString ? parseInt(creditsString, 10) : undefined;

  const rawSessionId = searchParams.session_id;
  const sessionId = Array.isArray(rawSessionId) ? rawSessionId[0] : rawSessionId;

  return (
    <div
      className="callback-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'black',
        pointerEvents: 'auto',
      }}
    >
      <CheckoutCallbackClient success={success} credits={credits} sessionId={sessionId} />
    </div>
  );
}

