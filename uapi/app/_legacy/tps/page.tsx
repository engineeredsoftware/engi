export default function ThirdPartyServicesIndex() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-4">
        <h1 className="text-3xl font-semibold">Third-Party Services</h1>
        <p className="text-neutral-400">
          Unified integration routes for OAuth, payments, and provider callbacks.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-2 text-sm text-neutral-300">
          <div>
            <code className="px-2 py-1 rounded bg-neutral-900/60 border border-neutral-800">/tps/supabase/callback</code>
            <span className="ml-2">Supabase auth OTP / OAuth callback</span>
          </div>
          <div>
            <code className="px-2 py-1 rounded bg-neutral-900/60 border border-neutral-800">/tps/github/app-install</code>
            <span className="ml-2">GitHub app installation/code copy overlay</span>
          </div>
          <div>
            <code className="px-2 py-1 rounded bg-neutral-900/60 border border-neutral-800">/tps/stripe/checkout</code>
            <span className="ml-2">Stripe Checkout success/cancel overlay</span>
          </div>
          <div>
            <code className="px-2 py-1 rounded bg-neutral-900/60 border border-neutral-800">/tps/twilio/sms/[runId]</code>
            <span className="ml-2">Read-only SMS run viewer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
