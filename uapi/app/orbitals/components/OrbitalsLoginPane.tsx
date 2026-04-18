"use client";

import React from 'react';

import LoginForm from '@/components/base/engi/auth/LoginForm';

interface OrbitalsLoginPaneProps {
  onClose?: () => void;
  onToggle?: () => void;
}

export default function OrbitalsLoginPane({
  onClose,
  onToggle,
}: OrbitalsLoginPaneProps) {
  return (
    <div className="orbital-auth-shell">
      <div className="orbital-auth-grid">
        <aside className="orbital-auth-aside">
          <div className="rounded-[1.6rem] border border-emerald-400/16 bg-emerald-400/8 px-5 py-5">
            <p className="text-[0.66rem] uppercase tracking-[0.22em] text-emerald-200/78">
              Workspace access
            </p>
            <h2 className="mt-3 text-[1.65rem] font-semibold tracking-[-0.04em] text-white">
              Return to Bitcode
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/74">
              Sign in to return to transactions, conversations, and orbitals without losing the
              current working context.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-emerald-200/74">
                Primary access
              </p>
              <p className="mt-2 text-sm leading-7 text-white/74">
                Email code remains the most direct way to continue working from the application.
              </p>
            </div>

            <div className="rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-white/72">
                Active providers
              </p>
              <p className="mt-2 text-sm leading-7 text-white/74">
                GitHub and Google stay available here. Wallet binding continues inside Profile and
                $BTD after access opens.
              </p>
            </div>

            <div className="rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-white/72">
                What opens next
              </p>
              <ul className="mt-2 space-y-2 text-sm leading-7 text-white/74">
                <li>Transactions and selected detail stay where you left them.</li>
                <li>Conversations reopen as a fullscreen writing surface when needed.</li>
                <li>Profile, Connects, Interfaces, and $BTD stay available as fullscreen orbitals.</li>
              </ul>
            </div>
          </div>
        </aside>

        <section className="orbital-auth-form">
          <LoginForm onClose={onClose} onToggle={onToggle} />
        </section>
      </div>
    </div>
  );
}
