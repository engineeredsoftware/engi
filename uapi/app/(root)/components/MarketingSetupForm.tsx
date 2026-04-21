import React from 'react';

const MarketingSetupForm = () => {
  return (
    <div className="space-y-4 rounded-2xl border border-emerald-400/20 bg-black/20 p-5">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">
          Treasury Readiness
        </h3>
        <p className="mt-2 text-sm text-slate-200">
          Bitcode acquisition is wallet-native. Connect a wallet, connect GitHub, and finalize access policy in
          auxillaries before you transact.
        </p>
      </div>
      <div className="space-y-2 text-sm text-slate-300">
        <p>1. Connect wallet posture in /auxillaries/profile or /auxillaries/btd.</p>
        <p>2. Connect GitHub and SSO policy in /auxillaries/connects.</p>
        <p>3. Issue and manage $BTD from the in-product treasury surface.</p>
      </div>
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/8 px-4 py-3 text-sm text-emerald-100">
        BTC settles. $BTD is issued and managed inside Bitcode. There is no checkout intermediary.
      </div>
    </div>
  );
};

export default MarketingSetupForm;
